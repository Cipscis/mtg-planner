import { DeckCard } from './DeckCard.js';
interface IDeckOptions {
    name: string;
    cards: string | DeckCard[];
}
/** A Magic: The Gathering deck. */
declare class Deck {
    name: string;
    cards: DeckCard[];
    /** A Promise that resolves when a deck's cards' `data` properties are all set. It resolves to the Deck object. */
    ready: Promise<this>;
    constructor(options: IDeckOptions);
    constructor(cards: readonly DeckCard[]);
    constructor(decklist: string);
    /** The number of cards in the deck. */
    get numCards(): number;
    get manaCurve(): Map<number, number>;
    toString(): string;
}
export { Deck };
