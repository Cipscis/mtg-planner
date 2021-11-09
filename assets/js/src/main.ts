import * as scry from 'scryfall-sdk';

(async () => {
	const card = await scry.Cards.byName('Sol Ring');
	console.log(card);
})();
