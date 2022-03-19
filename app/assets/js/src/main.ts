import { Deck } from './Deck.js';

import deckTemplate from './templates/deck.js';

import decklist from './data/decklist.js';

const $deckArea = document.querySelector('.js-deck-area');
if ($deckArea) {
	const deck = new Deck({
		name: 'Marath',
		cards: decklist,
	});

	deck.ready.then(() => {
		$deckArea.innerHTML = deckTemplate(deck);
	});
}
