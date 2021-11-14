import { getCard } from './api/getCard';
declare type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
interface ICardOptions {
    name: string;
    data?: Awaited<ReturnType<typeof getCard>>;
    defer?: boolean;
}
declare class Card implements ICardOptions {
    #private;
    name: string;
    data?: Awaited<ReturnType<typeof getCard>>;
    ready: Promise<this>;
    constructor(options: string | ICardOptions);
    getData(data?: Awaited<ReturnType<typeof getCard>>): Promise<this>;
}
export { ICardOptions, Card, };
