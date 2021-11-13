import * as Scry from 'scryfall-sdk';
import {
	SearchError,

	isScryCard,
	isSearchError,
} from './typeguards';

// TODO: There must be a cleaner way to share this between FE and BE code?
import routes from '../../../../../server/src/routes';

function getCards(...cardNames: string[]): Promise<Array<Scry.Card | SearchError>> {
	return new Promise(async (resolve, reject) => {
		const url = `${routes.getCards}?names=${cardNames.map(encodeURIComponent).join('|')}`;

		const response = await fetch(url);
		if (response.ok) {
			const json: unknown = await response.json();

			if (Array.isArray(json) && json.every((value: unknown) => isSearchError(value) || isScryCard(value))) {
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

async function getCard(cardName: string): Promise<Scry.Card | SearchError> {
	const cards = await getCards(cardName);

	return cards[0];
}

export {
	getCard,
	getCards,
};
