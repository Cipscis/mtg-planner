import { Express } from 'express';
import routes from '../routes.js';

import { getCard } from './getCard.js';

const scryfallMiddleware = {
	init(app: Express) {
		app.get(routes.getCards, getCard);
	},
};

export { scryfallMiddleware };
