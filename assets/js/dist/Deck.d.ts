import { Card } from './Card';
declare class Deck {
    #private;
    cards: Card[];
    constructor(decklist: string);
    constructor(cards: Card[]);
    get numCards(): number;
    static readDecklist(decklist: string): Card[];
}
export { Deck };
