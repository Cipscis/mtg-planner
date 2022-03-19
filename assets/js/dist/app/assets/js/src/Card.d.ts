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
declare class Card implements ICardOptions {
    #private;
    name: string;
    data?: Awaited<ReturnType<typeof getCard>>;
    /** A Promise that resolves when a card's `data` exists. It resolves to the Card object. */
    ready: Promise<this>;
    constructor(options: string);
    constructor(options: ICardOptions);
    /**
     * Either store already retrieved card data, or retrieve data via the getCard API end point.
     */
    getData(data?: Awaited<ReturnType<typeof getCard>>): Promise<import("scryfall-sdk").Card | null>;
}
export { ICardOptions, Card, };
