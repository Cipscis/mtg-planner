import { DeckCard } from '../DeckCard.js';

export default (card: DeckCard) => `
	<div class="deck__card">
		<img src="${card.data?.image_uris?.small}" class="deck__card__image" alt="${card.name}" />
	</div>
`;
