import * as Scry from 'scryfall-sdk';

function isScryCard(data: unknown): data is Scry.Card {
	const testData = data as Scry.Card;

	if (
		testData && typeof testData === 'object' &&
		testData.object === 'card'
	) {
		// This isn't a true test, but it's a good enough one for this purpose.
		return true;
	} else {
		return false;
	}
}

export { isScryCard };
