import * as Scry from 'scryfall-sdk';
declare type SearchError = Exclude<ReturnType<typeof Scry.error>, undefined>;
declare function isSearchError(data: unknown): data is SearchError;
export { SearchError, isSearchError, };
