import { Deck } from '../Deck.js';
import deckCardTemplate from './deckCard.js';

export default (deck: Deck) => `
	<section class="deck">
		<h1 class="deck__name">${deck.name}</h1>

		<dl class="deck__mana-curve">
			${Array.from(deck.manaCurve).sort((a, b) => a[0] - b[0]).map(([value, number]): string => `
				<div class="deck__mana-curve__item">
					<dt class="deck__mana-curve__value">${value}</dt>
					<dd class="deck__mana-curve__number" style="height: ${number}em;">${number}</dt>
				</div>
			`).join('')}
		</dl>

		<ul class="deck__cards">
			${deck.cards.map((card): string => {
				return deckCardTemplate(card);
			}).join('')}
		</ul>
	</section>
`;
