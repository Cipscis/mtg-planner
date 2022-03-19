import { ICardOptions, Card } from './Card.js';
interface IDeckCardOptions extends ICardOptions {
    quantity: number;
    flags?: Set<string>;
    groups?: Set<string>;
    overrides?: Map<string, string>;
}
declare class DeckCard extends Card implements IDeckCardOptions {
    quantity: number;
    flags?: Set<string>;
    groups?: Set<string>;
    overrides?: Map<string, string>;
    constructor(options: IDeckCardOptions);
    toString(): string;
}
export { DeckCard };
