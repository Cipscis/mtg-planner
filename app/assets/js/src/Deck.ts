import { getCards } from './api/getCard.js';
import { DeckCard } from './DeckCard.js';
import * as Decklist from './Decklist.js';

interface IDeckOptions {
	name: string;
	cards: string | DeckCard[];
};

/** A Magic: The Gathering deck. */
class Deck {
	name: string;
	cards: DeckCard[];

	/** A Promise that resolves when a deck's cards' `data` properties are all set. It resolves to the Deck object. */
	ready: Promise<this>;

	constructor(options: IDeckOptions)
	constructor(cards: readonly DeckCard[])
	constructor(decklist: string)
	constructor(options: IDeckOptions | readonly DeckCard[] | string) {
		if (typeof options === 'string') {
			this.name = 'New Deck';
			this.cards = Decklist.read(options);
		} else if ('length' in options) {
			this.name = 'New Deck';
			this.cards = options.concat();
		} else {
			this.name = options.name;

			if (typeof options.cards === 'string') {
				this.cards = Decklist.read(options.cards);
			} else {
				this.cards = options.cards.concat();
			}
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
	get numCards(): number {
		return this.cards.reduce((sum, card) => sum + card.quantity, 0);
	}

	get manaCurve(): Map<number, number> {
		const curve: Map<number, number> = new Map;

		this.cards.forEach((card) => {
			const manaValue = card.manaValue;
			if (typeof manaValue !== 'undefined') {
				if (curve.has(manaValue) === false) {
					curve.set(manaValue, 1);
				} else {
					curve.set(manaValue, (curve.get(manaValue) as number) + 1);
				}
			}
		});

		return curve;
	}

	toString() {
		return Decklist.write(this);
	}
}

export { Deck };
