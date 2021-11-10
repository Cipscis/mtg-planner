import { DeckCard } from './DeckCard';
import { Deck } from './Deck';

const Decklist = {
	write(deck: Deck) {
		let cards = deck.cards;
		let cardsList = cards.map(Decklist.writeLine);

		const decklist = cardsList.join('\n');

		return decklist;
	},

	writeLine(card: DeckCard) {
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
	},

	read(decklist: string) {
		const cards = decklist
			.split('\n')
			.map(Decklist.readLine)
			.filter((value): value is DeckCard => value instanceof DeckCard);

		return cards;
	},

	readLine(line: string): DeckCard | null {
		const flags = Decklist.readLineFlags(line);
		const groups = Decklist.readLineGroups(line);
		const overrides = Decklist.readLineOverrides(line);

		const cleanLine = Decklist.cleanLine(line, { flags, groups, overrides });

		const mainParts = cleanLine.match(/^(\d+)x (.+)/);

		if (mainParts) {
			const name = mainParts[2];
			const quantity = parseInt(mainParts[1], 10);

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
	},

	readLineFlags(line: string) {
		const flagsMatch = line.match(/\s+\*[^:]+?\*/g);
		if (flagsMatch) {
			const flags = new Set(flagsMatch.map((flag) => flag.replace(/^\s+\*|\*$/g, '')));
			return flags;
		}
	},

	readLineGroups(line: string) {
		const groupsMatch = line.match(/\s+#\S+/g);
		if (groupsMatch) {
			const groups = new Set(groupsMatch.map((group) => group.replace(/^\s+#/, '')));
			return groups;
		}
	},

	readLineOverrides(line: string) {
		const overridesMatch = line.match(/\s+\*.+?:.+?\*/g);
		if (overridesMatch) {
			const overridesMatrix = overridesMatch.map((override) => override.replace(/^\s+\*|\*$/g, '').split(':'));
			if (overridesMatrix.every((row): row is [string, string] => row.length === 2)) {
				const overrides = new Map(overridesMatrix);
				return overrides;
			}
		}
	},

	cleanLine(line: string, options?: { groups?: Set<string>, flags?: Set<string>, overrides?: Map<string, string> }) {
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
	},
};

export { Decklist };
