import { Card } from './Card';

class Deck {
	cards: Card[];

	constructor(decklist: string)
	constructor(cards: Card[])
	constructor(options: string | Card[]) {
		if (typeof options === 'string') {
			this.cards = Deck.readDecklist(options);
		} else {
			this.cards = options;
		}
	}

	get numCards() {
		return this.cards.reduce((sum, card) => sum + card.quantity, 0);
	}

	static readDecklist(decklist: string): Card[] {
		const cards = decklist
			.split('\n')
			.map(Deck.#readDecklistLine)
			.filter((value) => value instanceof Card) as Card[];

		return cards;
	}

	static #readDecklistLine(line: string): Card | null {
		const mainParts = line.match(/^(\d+)x\s+(.+?)(\s*$|\s+(#|\(|\*))/);

		if (mainParts) {
			return {
				name: mainParts[2],
				quantity: parseInt(mainParts[1], 10),
			};
		} else {
			return null;
		}
	}
}

export { Deck };
