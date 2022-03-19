import { getCards } from './api/getCard.js';
import { DeckCard } from './DeckCard.js';
import * as Decklist from './Decklist.js';

/** A Magic: The Gathering deck. */
class Deck {
	cards: DeckCard[];

	/** A Promise that resolves when a deck's cards' `data` properties are all set. It resolves to the Deck object. */
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

		// Get data for each card in the deck using `getCards` to reduce requests,
		// then set it on the cards when the data comes back.
		getCards(...this.cards.map((card) => card.name)).then((results) => {
			for (let [i, card] of this.cards.entries()) {
				const data = results[i];
				card.getData(data);
			}
		});
	}

	/** The number of cards in the deck. */
	get numCards() {
		return this.cards.reduce((sum, card) => sum + card.quantity, 0);
	}

	toString() {
		return Decklist.write(this);
	}
}

export { Deck };
