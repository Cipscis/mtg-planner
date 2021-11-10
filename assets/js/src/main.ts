// import * as scry from 'scryfall-sdk';

import decklist from './data/decklist';
import { Deck } from './Deck';

const deck = new Deck(decklist);
console.log(deck.cards, deck.numCards);

console.log(deck);
