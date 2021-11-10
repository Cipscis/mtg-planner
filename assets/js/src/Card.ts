interface ICardOptions {
	name: string;
}

class Card implements ICardOptions {
	name: string;

	constructor(options: ICardOptions) {
		this.name = options.name;
	}
};

export {
	ICardOptions,
	
	Card,
};
