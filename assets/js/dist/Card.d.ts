interface ICard {
    name: string;
    quantity: number;
}
declare class Card implements ICard {
    name: string;
    quantity: number;
    constructor(options: ICard);
}
export { Card };
