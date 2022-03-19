import { getCard } from './api/getCard.js';

interface ICardOptions {
	name: string;
	data?: Awaited<ReturnType<typeof getCard>>;

	/**
	 * If set to `true` when creating a Card, the Card will be created without immediately fetching data for it.
	 * Useful if creating multiple cards at once.
	 */
	defer?: boolean;
}

/**
 * A Magic: The Gathering card in an isolated context.
 */
class Card implements ICardOptions {
	name: string;
	data?: Awaited<ReturnType<typeof getCard>>;

	/** A Promise that resolves when a card's `data` exists. It resolves to the Card object. */
	ready: Promise<this>;

	/** An internal function that can be called to resolve the card's `ready` Promise. */
	#resolve!: (this: this) => void;

	constructor(options: string)
	constructor(options: ICardOptions)
	constructor(options: string | ICardOptions) {
		if (typeof options === 'string') {
			options = { name: options } as ICardOptions;
		}

		this.name = options.name;

		this.ready = new Promise((resolve, reject) => {
			this.#resolve = () => {
				resolve(this);
			};
		});

		if (options.defer !== true) {
			this.getData();
		}
	}

	/**
	 * Either store already retrieved card data, or retrieve data via the getCard API end point.
	 */
	async getData(data?: Awaited<ReturnType<typeof getCard>>) {
		if (typeof this.data === 'undefined') {
			if (data) {
				this.data = data;
			} else {
				this.data = await getCard(this.name);
			}

			this.#resolve();
		} else if (data) {
			console.warn(`WARNING: \`Card.getData\` should not be passed data once a Card has already had data retreived.`);
		}

		return this.data as Exclude<typeof this.data, undefined>;
	}
};

export {
	ICardOptions,

	Card,
};
