interface ICardOptions {
    name: string;
    quantity: number;
}
declare class Card implements ICardOptions {
    name: string;
    quantity: number;
    constructor(options: ICardOptions);
}
export { ICardOptions, Card, };
