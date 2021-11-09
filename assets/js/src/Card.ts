interface ICard {
	name: string;
	quantity: number;
}

class Card implements ICard {
	name: string;
	quantity: number;

	constructor(options: ICard) {
		this.name = options.name;
		this.quantity = options.quantity;
	}
};

export { Card };
