import { DeckCard } from './DeckCard.js';
import { Deck } from './Deck.js';
/**
 * Write a `Deck` object to a Tapped Out style decklist string.
 */
export declare function write(deck: Deck): string;
/**
 * Write a `DeckCard` object to a single line of a Tapped Out style decklist string.
 */
export declare function writeLine(card: DeckCard): string;
/**
 * Read a Tapped Out style decklist string into an array of `DeckCard` objects.
 */
export declare function read(decklist: string): DeckCard[];
