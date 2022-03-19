import * as Scry from 'scryfall-sdk';
/** Get data for one or more cards. */
declare function getCards(...cardNames: string[]): Promise<Array<Scry.Card | null>>;
/** Get data for a single card. */
declare function getCard(cardName: string): Promise<Scry.Card | null>;
export { getCard, getCards, };
