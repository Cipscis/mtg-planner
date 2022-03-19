import { Card } from './Card.js';
import decklist from './data/decklist.js';
import { Deck } from './Deck.js';

const deck = new Deck(decklist);
const card = new Card('Forest');

(async () => {
	console.log(await deck.ready);

	console.log(await card.ready);
})()
