import { getCard } from './api/getCard';

// Polyfill for TypeScript < v4.5
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

interface ICardOptions {
	name: string;
	data?: Awaited<ReturnType<typeof getCard>>;

	defer?: boolean;
}

class Card implements ICardOptions {
	name: string;
	data?: Awaited<ReturnType<typeof getCard>>;

	#isResolved: boolean;
	ready: Promise<this>;
	#resolve!: (value: this | PromiseLike<this>) => void;

	constructor(options: string | ICardOptions) {
		if (typeof options === 'string') {
			options = { name: options } as ICardOptions;
		}
		
		this.name = options.name;
	
		this.#isResolved = false;
		this.ready = new Promise((resolveArg, reject) => {
			this.#resolve = (value: this | PromiseLike<this>) => {
				this.#isResolved = true;
				resolveArg(value);
			};
		});

		if (options.defer !== true) {
			this.getData();
		}
	}

	getData(data?: Awaited<ReturnType<typeof getCard>>) {
		if (this.#isResolved === false) {
			if (data) {
				this.data = data;
				this.#resolve(this);
			} else {
				getCard(this.name).then((cardData) => {
					this.data = cardData;
					this.#resolve(this);
				});
			}
		}

		return this.ready;
	}
};

export {
	ICardOptions,
	
	Card,
};
