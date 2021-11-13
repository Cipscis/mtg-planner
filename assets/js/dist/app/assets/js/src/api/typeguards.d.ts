import * as Scry from 'scryfall-sdk';
declare type SearchError = Exclude<ReturnType<typeof Scry.error>, undefined>;
declare function isScryCard(data: unknown): data is Scry.Card;
declare function isSearchError(data: unknown): data is SearchError;
export { SearchError, isScryCard, isSearchError, };
