import * as Scry from 'scryfall-sdk';

type SearchError = Exclude<ReturnType<typeof Scry.error>, undefined>;

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
	isSearchError,
};
