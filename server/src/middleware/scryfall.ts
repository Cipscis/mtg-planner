import { Express } from 'express';
import routes from '../routes.js';

import { getCard } from './getCard.js';

function scryfallMiddleware(app: Express) {
	app.get(routes.getCards, getCard);
}

export { scryfallMiddleware };
