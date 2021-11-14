import * as Scry from 'scryfall-sdk';
declare function isScryCard(data: unknown): data is Scry.Card;
export { isScryCard };
