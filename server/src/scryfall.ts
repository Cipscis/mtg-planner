import { Express } from 'express';

import * as Scry from 'scryfall-sdk';

const apiPath = '/api';

interface IQueueItem {
	cardName: string,
	resolve: (value: Promise<Scry.Card>) => void,
}

const queue: IQueueItem[] = [];
const queueThrottle = 100; // ms - Scryfall API rate limits throttled to 10 requests per second

const scryfallMiddleware = {
	getCard(cardName: string) {
		const promise = new Promise<Scry.Card>((resolve, reject) => {
			queue.push({
				cardName,
				resolve,
			});
		});
		return promise;
	},

	executeQueue() {
		const queueItem = queue.shift();
		if (queueItem) {
			const cardPromise = Scry.Cards.byName(queueItem.cardName);

			queueItem.resolve(cardPromise);
		}
	},

	init(app: Express) {
		app.get(`${apiPath}/cards`, async (req, res) => {
			const cardNamesQuery = req.query.names;
			const cards: Scry.Card[] = [];

			if (typeof cardNamesQuery === 'string') {
				const cardNames = cardNamesQuery.split('|').map(decodeURIComponent);
				const cardPromises: Promise<Scry.Card>[] = [];

				for (const cardName of cardNames) {
					cardPromises.push(scryfallMiddleware.getCard(cardName));
				}

				cards.push(...await Promise.all(cardPromises));
			}

			res.send(cards);
		});
	},
};

const queueClock = global.setInterval(scryfallMiddleware.executeQueue, queueThrottle);

export { scryfallMiddleware };
