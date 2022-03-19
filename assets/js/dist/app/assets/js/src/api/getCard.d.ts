import * as Scry from 'scryfall-sdk';
import { SearchError } from 'server/middleware/SearchError.js';
declare function getCards(...cardNames: string[]): Promise<Array<Scry.Card | SearchError>>;
declare function getCard(cardName: string): Promise<Scry.Card | SearchError>;
export { getCard, getCards, };
