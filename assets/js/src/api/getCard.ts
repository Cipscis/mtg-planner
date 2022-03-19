import * as Scry from 'scryfall-sdk';
import { isScryCard } from 'server/middleware/typeguards.js';

import routes from 'server/routes.js';

/** Get data for one or more cards. */
function getCards(...cardNames: string[]): Promise<Array<Scry.Card | null>> {
	return new Promise(async (resolve, reject) => {
		const url = `${routes.getCards}?names=${cardNames.map(encodeURIComponent).join('|')}`;

		const response = await fetch(url);
		if (response.ok) {
			const json: unknown = await response.json();

			if (Array.isArray(json) && json.every((value: unknown): value is null | Scry.Card => value === null || isScryCard(value))) {
				resolve(json);
			} else {
				console.error(json);
				reject(new Error('Response data format unrecognised.'));
			}
		} else {
			reject(new Error(`Response not ok. Status: ${response.status} ${response.statusText}`));
		}
	});
}

/** Get data for a single card. */
async function getCard(cardName: string): Promise<Scry.Card | null> {
	const cards = await getCards(cardName);

	return cards[0];
}

export {
	getCard,
	getCards,
};
