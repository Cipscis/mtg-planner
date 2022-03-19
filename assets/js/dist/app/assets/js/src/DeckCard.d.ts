import { ICardOptions, Card } from './Card.js';
interface IDeckCardOptions extends ICardOptions {
    quantity: number;
    /** Flags such as `'*CMDR*'` */
    flags?: Set<string>;
    /** Groups such as `'#Ramp'` */
    groups?: Set<string>;
    /** Overrides such as `'*CMC:3*'` */
    overrides?: Map<string, string>;
}
/**
 * A Magic: The Gathering card in the context of a deck.
 */
declare class DeckCard extends Card implements IDeckCardOptions {
    quantity: number;
    flags?: Set<string>;
    groups?: Set<string>;
    overrides?: Map<string, string>;
    isLand?: boolean;
    cmc?: number;
    manaValue?: number;
    constructor(options: IDeckCardOptions);
    toString(): string;
}
export { DeckCard };
