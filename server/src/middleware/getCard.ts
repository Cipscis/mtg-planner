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
/** This interval tries to clear the queue at the fastest rate allowed by `queueThrottle`. */
const queueClock = global.setInterval(executeQueue, queueThrottle);

const cache = await readCache();

async function readCache(): Promise<Map<string, Scry.Card>> {
	try {
		const source = JSON.parse(await readFile(cachePath, { encoding: 'utf8' }));
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

/** Add a `getCard` request to the queue. */
function queueGetCard(cardName: string) {
	return new Promise<Scry.Card | SearchError>((resolve, reject) => {
		queue.push({
			cardName,
			resolve,
		});
	});
}

/** Retrieve data for the next card in the queue from the ScryFall API. */
function executeQueue() {
	const queueItem = queue.shift();

	if (queueItem) {
		const cardPromise = Scry.Cards.byName(queueItem.cardName);

		cardPromise.then((card) => {
			queueItem.resolve(Scry.error() || card);
		});
	}
}

/** Forward a request for one or more cards' data to the ScryFall API. */
async function getCard(req: Request, res: Response): Promise<void> {
	/** The `'names'` querystring parameter is expected to be a pipe-separated list of card names. */
	const cardNamesQuery = req.query.names;

	if (typeof cardNamesQuery === 'string') {
		const cardNames = cardNamesQuery.split('|').map(decodeURIComponent);

		// For each card with data requested, try to retrieve cached data.
		// If there is no cached data, add a request for this card's data to the queue.
		const cardPromises = cardNames.map((cardName) => {
			return cache.get(cardName) || queueGetCard(cardName);
		});

		const cards = await Promise.all(cardPromises);

		// Store all valid data returned in the cache.
		cards.forEach((card) => {
			if (isScryCard(card)) {
				cache.set(card.name, card);
			}
		});

		writeCache();

		res.send(cards);
	} else {
		// A getCard request without one or more names is not valid.
		res.sendStatus(StatusCodes.BAD_REQUEST);
	}
}

export { getCard };
