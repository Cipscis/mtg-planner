import * as Scry from 'scryfall-sdk';
import { SearchError } from 'server/middleware/SearchError.js';
/** Get data for one or more cards. */
declare function getCards(...cardNames: string[]): Promise<Array<Scry.Card | SearchError>>;
/** Get data for a single card. */
declare function getCard(cardName: string): Promise<Scry.Card | SearchError>;
export { getCard, getCards, };
