import { DeckCard } from './DeckCard';
declare class Deck {
    cards: DeckCard[];
    constructor(decklist: string);
    constructor(cards: readonly DeckCard[]);
    get numCards(): number;
    toString(): string;
}
export { Deck };
