import { getCards } from './api/getCard';
import { DeckCard } from './DeckCard';
import { Decklist } from './Decklist';

class Deck {
	cards: DeckCard[];
	ready: Promise<this>;

	constructor(decklist: string)
	constructor(cards: readonly DeckCard[])
	constructor(cards: string | readonly DeckCard[]) {
		if (typeof cards === 'string') {
			this.cards = Decklist.read(cards);
		} else {
			this.cards = cards.concat();
		}

		this.ready = new Promise((resolve, reject) => {
			Promise.all(this.cards.map((card) => card.ready)).then(() => resolve(this));
		});

		getCards(...this.cards.map((card) => card.name)).then((results) => {
			for (let [i, card] of this.cards.entries()) {
				const data = results[i];
				card.getData(data);
			}
		});
	}

	get numCards() {
		return this.cards.reduce((sum, card) => sum + card.quantity, 0);
	}

	toString() {
		return Decklist.write(this);
	}
}

export { Deck };
