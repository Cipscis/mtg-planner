import { ICardOptions, Card } from './Card';
interface IDeckCardOptions extends ICardOptions {
    flags?: Set<string>;
    groups?: Set<string>;
    overrides?: Map<string, string>;
}
declare class DeckCard extends Card implements IDeckCardOptions {
    flags?: Set<string>;
    groups?: Set<string>;
    overrides?: Map<string, string>;
    constructor(options: IDeckCardOptions);
    toString(): string;
}
export { DeckCard };
