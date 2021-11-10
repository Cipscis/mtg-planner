interface ICardOptions {
	name: string;
	quantity: number;
}

class Card implements ICardOptions {
	name: string;
	quantity: number;

	constructor(options: ICardOptions) {
		this.name = options.name;
		this.quantity = options.quantity;
	}
};

export {
	ICardOptions,
	
	Card,
};
