import decklist from './data/decklist';
import { Deck } from './Deck';

const deck = new Deck(decklist);
console.log(deck.cards, deck.numCards);

console.log(deck);

import * as api from './api/api';

(async () => {
	console.log(await api.getCards('forests', 'forest'));
	console.log(await api.getCard('mountain'));
})()
