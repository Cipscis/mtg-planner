import * as Scry from 'scryfall-sdk';

// TODO: This is duplicated in the server code
type SearchError = Exclude<ReturnType<typeof Scry.error>, undefined>;

function isScryCard(data: unknown): data is Scry.Card {
	const testData = data as Scry.Card;

	if (
		typeof testData === 'object' &&
		testData.object === 'card'
	) {
		// This isn't a true test, but it's a good enough one for this purpose.
		return true;
	} else {
		return false;
	}
}

function isSearchError(data: unknown): data is SearchError {
	const testData = data as SearchError;

	if (
		testData && typeof testData === 'object' &&
		testData.object === 'error' &&
		typeof testData.code === 'string' &&
		typeof testData.status === 'number' &&
		typeof testData.details === 'string' &&
		(
			typeof testData.warnings === 'undefined' || (
				Array.isArray(testData.warnings) &&
				testData.warnings.every((element: unknown): element is string => typeof element === 'string')
			)
		)
	) {
		return true;
	} else {
		return false;
	}
}

export {
	SearchError,

	isScryCard,
	isSearchError,
};
