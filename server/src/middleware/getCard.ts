import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as Scry from 'scryfall-sdk';
import { SearchError } from './SearchError.js';
import { isScryCard } from './typeguards.js';

import { readFile, writeFile } from 'fs/promises';

interface IQueueItem {
	cardName: string,
	resolve: (value: Scry.Card | SearchError) => void,
}

const cachePath = './cache.json';
function isCacheSource(data: unknown): data is [string, Scry.Card][] {
	const dataTest = data as [string, Scry.Card][];

	if (
		dataTest &&
		Array.isArray(dataTest) &&
		dataTest.every((el) => {
			return Array.isArray(el) &&
			typeof el[0] === 'string' &&
			isScryCard(el[1])
		})
	) {
		return true;
	} else {
		return false;
	}
}

const queue: IQueueItem[] = [];
const queueThrottle = 100; // ms - Scryfall API rate limits throttled to 10 requests per second
const queueClock = global.setInterval(executeQueue, queueThrottle);

const cache = await readCache();

async function readCache(): Promise<Map<string, Scry.Card>> {
	try {
		const source = await readFile(cachePath, { encoding: 'utf8' });
		if (isCacheSource(source)) {
			const map = new Map(source);	
			return map;
		} else {
			console.error('Unrecognised cache format');
			return new Map();
		}
	} catch (e) {
		console.error(e);
		return new Map();
	}
}

async function writeCache() {
	const cacheArray = Array.from(cache.entries())
	const cacheJson = JSON.stringify(cacheArray);

	await writeFile(cachePath, cacheJson);
}

function queueGetCard(cardName: string) {
	return new Promise<Scry.Card | SearchError>((resolve, reject) => {
		queue.push({
			cardName,
			resolve,
		});
	});
}

function executeQueue() {
	const queueItem = queue.shift();

	if (queueItem) {
		const cardPromise = Scry.Cards.byName(queueItem.cardName);

		cardPromise.then((card) => {
			queueItem.resolve(Scry.error() || card);
		});
	}
}

async function getCard(req: Request, res: Response): Promise<void> {
	const cardNamesQuery = req.query.names;

	if (typeof cardNamesQuery === 'string') {
		const cardNames = cardNamesQuery.split('|').map(decodeURIComponent);

		const cardPromises = cardNames.map((cardName) => {
			return cache.get(cardName) || queueGetCard(cardName);
		});
		
		const cards = await Promise.all(cardPromises);

		cards.forEach((card) => {
			if (isScryCard(card)) {
				cache.set(card.name, card);
			}
		});

		writeCache();

		res.send(cards);
	} else {
		res.sendStatus(StatusCodes.BAD_REQUEST);
	}
}

export { getCard };
