import { getCard } from './api/getCard';

// Polyfill for TypeScript < v4.5
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

interface ICardOptions {
	name: string;
	data?: Awaited<ReturnType<typeof getCard>>;
}

class Card implements ICardOptions {
	name: string;
	data?: Awaited<ReturnType<typeof getCard>>;
	ready: Promise<this>;

	constructor(options: ICardOptions) {
		this.name = options.name;
		
		let resolve: (value: this | PromiseLike<this>) => void;
		this.ready = new Promise((resolveArg, reject) => resolve = resolveArg);

		getCard(this.name).then((cardData) => {
			this.data = cardData
			resolve(this);
		});
	}
};

export {
	ICardOptions,
	
	Card,
};
