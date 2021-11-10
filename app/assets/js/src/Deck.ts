import { DeckCard } from './DeckCard';
import { Decklist } from './Decklist';

class Deck {
	cards: DeckCard[];

	constructor(decklist: string)
	constructor(cards: readonly DeckCard[])
	constructor(cards: string | readonly DeckCard[]) {
		if (typeof cards === 'string') {
			this.cards = Decklist.read(cards);
		} else {
			this.cards = cards.concat();
		}
	}

	// get numCards() {
	// 	return this.cards.reduce((sum, card) => sum + card.quantity, 0);
	// }

	toString() {
		return Decklist.write(this);
	}
}

export { Deck };
