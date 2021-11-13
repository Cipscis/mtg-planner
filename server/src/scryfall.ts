import { Express } from 'express';

import * as Scry from 'scryfall-sdk';

import routes from './routes.js';

type SearchError = Exclude<ReturnType<typeof Scry.error>, undefined>;

interface IQueueItem {
	cardName: string,
	resolve: (value: Scry.Card | SearchError) => void,
}

const queue: IQueueItem[] = [];
const queueThrottle = 100; // ms - Scryfall API rate limits throttled to 10 requests per second

const scryfallMiddleware = {
	getCard(cardName: string) {
		return new Promise<Scry.Card | SearchError>((resolve, reject) => {
			queue.push({
				cardName,
				resolve,
			});
		});
	},

	executeQueue() {
		const queueItem = queue.shift();

		if (queueItem) {
			const cardPromise = Scry.Cards.byName(queueItem.cardName);

			cardPromise.then((card) => {
				queueItem.resolve(Scry.error() || card);
			});
		}
	},

	init(app: Express) {
		app.get(routes.getCards, async (req, res) => {
			const cardNamesQuery = req.query.names;

			if (typeof cardNamesQuery === 'string') {
				const cardNames = cardNamesQuery.split('|').map(decodeURIComponent);
				const cardPromises = cardNames.map((cardName) => scryfallMiddleware.getCard(cardName));
				const cards = await Promise.all(cardPromises);
				res.send(cards);
			} else {
				res.sendStatus(400);
			}
		});
	},
};

const queueClock = global.setInterval(scryfallMiddleware.executeQueue, queueThrottle);

export { scryfallMiddleware };
