import { DeckCard } from './DeckCard.js';
import { Deck } from './Deck.js';

/**
 * Write a `Deck` object to a Tapped Out style decklist string.
 */
export function write(deck: Deck): string {
	let cards = deck.cards;
	let cardsList = cards.map(writeLine);

	const decklist = cardsList.join('\n');

	return decklist;
}

/**
 * Write a `DeckCard` object to a single line of a Tapped Out style decklist string.
 */
export function writeLine(card: DeckCard): string {
	let line = `${card.quantity}x ${card.name}`;

	if (card.flags) {
		line += Array.from(card.flags).map((flag) => ` *${flag}*`).join('');
	}

	if (card.groups) {
		line += Array.from(card.groups).map((group) => ` #${group}`).join('');
	}

	if (card.overrides) {
		line += Array.from(card.overrides).map((override) => ` *${override.join(':')}*`).join('');
	}

	return line;
}

/**
 * Read a Tapped Out style decklist string into an array of `DeckCard` objects.
 */
export function read(decklist: string): DeckCard[] {
	const cards = decklist
		.split('\n')
		.map(readLine)
		.filter((value): value is DeckCard => value instanceof DeckCard);

	return cards;
}

/**
 * Read a single line of a Tapped Out style decklist string.
 */
function readLine(line: string): DeckCard | null {
	const flags = readLineFlags(line);
	const groups = readLineGroups(line);
	const overrides = readLineOverrides(line);

	const cleanedLine = cleanLine(line, { flags, groups, overrides });

	const [quantity, name] = readCleanedLineQuantityAndName(cleanedLine);

	if (quantity && name) {
		return new DeckCard({
			name,
			quantity,

			flags,
			groups,
			overrides,
		});
	} else {
		return null;
	}
}

/** Read a decklist line's flags, such as `'*CMDR*'` */
function readLineFlags(line: string): DeckCard['flags'] {
	const flagsMatch = line.match(/\s+\*[^:]+?\*/g);
	if (flagsMatch) {
		const flags = new Set(flagsMatch.map((flag) => flag.replace(/^\s+\*|\*$/g, '')));
		return flags;
	}
}

/** Read a decklist line's groups, such as `'#Ramp'` */
function readLineGroups(line: string): DeckCard['groups'] {
	const groupsMatch = line.match(/\s+#\S+/g);
	if (groupsMatch) {
		const groups = new Set(groupsMatch.map((group) => group.replace(/^\s+#/, '')));
		return groups;
	}
}

/** Read a decklist line's overrides, such as `'*CMC:3*'` */
function readLineOverrides(line: string): DeckCard['overrides'] {
	const overridesMatch = line.match(/\s+\*.+?:.+?\*/g);
	if (overridesMatch) {
		const overridesMatrix = overridesMatch.map((override) => override.replace(/^\s+\*|\*$/g, '').split(':'));
		if (overridesMatrix.every((row): row is [string, string] => row.length === 2)) {
			const overrides = new Map(overridesMatrix);
			return overrides;
		}
	}
}

/** Remove known flag, group, and override strings from a decklist line so only the quantity and card name remain. */
function cleanLine(line: string, options?: { groups?: Set<string>, flags?: Set<string>, overrides?: Map<string, string> }): string {
	if (options) {
		if (options.flags) {
			const flagPattern = new RegExp(`\\s+\\*(${Array.from(options.flags).join('|')})\\*`, 'g');
			line = line.replace(flagPattern, '');
		}

		if (options.groups) {
			const groupPattern = new RegExp(`\\s+#(${Array.from(options.groups).join('|')})\\b`, 'g');
			line = line.replace(groupPattern, '');
		}

		if (options.overrides) {
			const overrides = Array.from(options.overrides).map((override) => override.join(':'));
			const overridePattern = new RegExp(`\\s+\\*(${overrides.map((override) => override.replace(/(\{|\})/g, '\\$1')).join('|')})\\*`, 'g');
			line = line.replace(overridePattern, '');
		}
	}

	return line;
}

/** Read a cleaned decklist line's quantity and card name, such as `'10x Forest'` */
function readCleanedLineQuantityAndName(cleanedLine: string): [DeckCard['quantity'], DeckCard['name']] | [undefined, undefined] {
	const quantityAndNameMatch = cleanedLine.match(/^(\d+)x (.+)/);

	if (quantityAndNameMatch) {
		const quantity = parseInt(quantityAndNameMatch[1], 10);
		const name = quantityAndNameMatch[2];

		return [quantity, name];
	} else {
		return [,,];
	}
}
