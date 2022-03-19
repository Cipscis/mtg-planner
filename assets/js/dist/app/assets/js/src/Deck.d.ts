import { DeckCard } from './DeckCard.js';
/** A Magic: The Gathering deck. */
declare class Deck {
    cards: DeckCard[];
    /** A Promise that resolves when a deck's cards' `data` properties are all set. It resolves to the Deck object. */
    ready: Promise<this>;
    constructor(decklist: string);
    constructor(cards: readonly DeckCard[]);
    /** The number of cards in the deck. */
    get numCards(): number;
    toString(): string;
}
export { Deck };
