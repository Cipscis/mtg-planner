import { ICardOptions, Card } from './Card.js';
import * as Decklist from './Decklist.js';

interface IDeckCardOptions extends ICardOptions {
	quantity: number;

	/** Flags such as `'*CMDR*'` */
	flags?: Set<string>;
	/** Groups such as `'#Ramp'` */
	groups?: Set<string>;
	/** Overrides such as `'*CMC:3*'` */
	overrides?: Map<string, string>;
}

/**
 * A Magic: The Gathering card in the context of a deck.
 */
class DeckCard extends Card implements IDeckCardOptions {
	quantity: number;

	flags?: Set<string>;
	groups?: Set<string>;
	overrides?: Map<string, string>;

	isLand?: boolean;
	cmc?: number;
	manaValue?: number;

	constructor(options: IDeckCardOptions) {
		options.defer = true;
		super(options);

		this.quantity = options.quantity;

		if (options.flags) {
			this.flags = options.flags;
		}

		if (options.groups) {
			this.groups = options.groups;
		}

		if (options.overrides) {
			this.overrides = options.overrides;
		}

		this.ready.then(() => {
			this.isLand = !!this.data!.type_line.match(/\bLand\b/);

			if (this.isLand === false) {
				const cmcOverride = this.overrides?.get('CMC');
				if (cmcOverride && typeof cmcOverride === 'number') {
					this.cmc = cmcOverride;
				} else {
					this.cmc = this.data!.cmc;
				}
				this.manaValue = this.cmc;
			}

		});
	}

	toString() {
		return Decklist.writeLine(this);
	}
};

export { DeckCard };
