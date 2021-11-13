import decklist from './data/decklist';
import { Deck } from './Deck';

const deck = new Deck(decklist);

(async () => {
	await deck.ready;

	console.log(deck);
})()
