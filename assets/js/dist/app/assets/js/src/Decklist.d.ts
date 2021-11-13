import { DeckCard } from './DeckCard';
import { Deck } from './Deck';
declare const Decklist: {
    write(deck: Deck): string;
    writeLine(card: DeckCard): string;
    read(decklist: string): DeckCard[];
    readLine(line: string): DeckCard | null;
    readLineFlags(line: string): Set<string> | undefined;
    readLineGroups(line: string): Set<string> | undefined;
    readLineOverrides(line: string): Map<string, string> | undefined;
    cleanLine(line: string, options?: {
        groups?: Set<string> | undefined;
        flags?: Set<string> | undefined;
        overrides?: Map<string, string> | undefined;
    } | undefined): string;
};
export { Decklist };
