import { Card } from './Card';
import decklist from './data/decklist';
import { Deck } from './Deck';

const deck = new Deck(decklist);
const card = new Card('Forest');

(async () => {
	console.log(await deck.ready);

	console.log(await card.ready);
})()
