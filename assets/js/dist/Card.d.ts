interface ICardOptions {
    name: string;
}
declare class Card implements ICardOptions {
    name: string;
    constructor(options: ICardOptions);
}
export { ICardOptions, Card, };
