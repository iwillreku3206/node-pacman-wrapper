import Pacman from '.'
import Command from './Command'
import {
	commonOptions,
	databaseOption,
	databaseOptions,
	fileOption,
	fileOptions,
	noop,
	Operation,
	operations,
	Option,
	queryOption,
	queryOptions,
	removeOption,
	removeOptions,
	syncOption,
	syncOptions,
	transactionOption,
	transactionOptions,
	upgradeOption,
	upgradeOptions,
} from './utils/args'

interface CommonnCommandConstructorOptions {
	operation: keyof typeof operations
	commonOptions?: (keyof typeof commonOptions)[]
}

interface SyncCommandConstructorOptions
	extends CommonnCommandConstructorOptions {
	operation: 'sync' | 'install'
	options?: (
		| keyof typeof transactionOptions
		| keyof typeof upgradeOptions
		| keyof typeof syncOptions
	)[]
}

interface RemoveCommandConstructorOptions
	extends CommonnCommandConstructorOptions {
	operation: 'remove'
	options?: (keyof typeof transactionOptions | keyof typeof removeOptions)[]
}

interface UpgradeCommandConstructorOptions
	extends CommonnCommandConstructorOptions {
	operation: 'upgrade'
	options?: (keyof typeof transactionOptions | keyof typeof upgradeOptions)[]
}

interface QueryCommandConstructorOptions
	extends CommonnCommandConstructorOptions {
	operation: 'query'
	options?: (keyof typeof queryOptions)[]
}

interface DatabaseCommandConstructorOptions
	extends CommonnCommandConstructorOptions {
	operation: 'database'
	options?: (keyof typeof databaseOptions)[]
}

interface FilesCommandConstructorOptions
	extends CommonnCommandConstructorOptions {
	operation: 'files'
	options?: (keyof typeof fileOptions)[]
}

interface OtherCommandConstuctorOptions
	extends CommonnCommandConstructorOptions {
	operation: 'deptest' | 'version' | 'help'
	commonOptions?: (keyof typeof commonOptions)[]
	options?: ['']
}

export type CommandConstructorOptions =
	| SyncCommandConstructorOptions
	| RemoveCommandConstructorOptions
	| UpgradeCommandConstructorOptions
	| QueryCommandConstructorOptions
	| DatabaseCommandConstructorOptions
	| FilesCommandConstructorOptions
	| OtherCommandConstuctorOptions

export default class PacmanCommand extends Command {
	command: 'pacman' | 'pacstrap' = 'pacman'
	shorthandOpts: (Option | undefined)[] | undefined
	opts: (Option | undefined)[] | undefined
	operation: Operation

	constructor(
		pacman: Pacman,
		options: CommandConstructorOptions,
		data?: string
	) {
		super(pacman, data)
		this.operation = operations[options.operation]

		this.shorthandOpts = options.options
			?.map((opt) => {
				let returnOption = noop

				if (options.operation === 'database')
					returnOption = databaseOption(opt as keyof typeof databaseOptions)

				if (options.operation === 'files')
					returnOption = fileOption(opt as keyof typeof fileOptions)

				if (options.operation === 'install' || options.operation === 'sync')
					returnOption =
						syncOption(opt as keyof typeof syncOption) ||
						transactionOption(opt as keyof typeof transactionOptions) ||
						upgradeOption(opt as keyof typeof upgradeOptions)

				if (options.operation === 'query')
					returnOption = queryOption(opt as keyof typeof queryOptions)

				if (options.operation === 'remove')
					returnOption =
						removeOption(opt as keyof typeof removeOptions) ||
						transactionOption(opt as keyof typeof transactionOptions)

				if (options.operation === 'upgrade')
					returnOption =
						upgradeOption(opt as keyof typeof upgradeOptions) ||
						transactionOption(opt as keyof typeof transactionOptions)

				return returnOption
			})
			.filter((opt) => opt?.shortcut !== undefined)

		this.opts = options.options
			?.map((opt) => {
				let returnOption = noop

				if (options.operation === 'database')
					returnOption = databaseOption(opt as keyof typeof databaseOptions)

				if (options.operation === 'files')
					returnOption = fileOption(opt as keyof typeof fileOptions)

				if (options.operation === 'install' || options.operation === 'sync')
					returnOption =
						syncOption(opt as keyof typeof syncOption) ||
						transactionOption(opt as keyof typeof transactionOptions) ||
						upgradeOption(opt as keyof typeof upgradeOptions)

				if (options.operation === 'query')
					returnOption = queryOption(opt as keyof typeof queryOptions)

				if (options.operation === 'remove')
					returnOption =
						removeOption(opt as keyof typeof removeOptions) ||
						transactionOption(opt as keyof typeof transactionOptions)

				if (options.operation === 'upgrade')
					returnOption =
						upgradeOption(opt as keyof typeof upgradeOptions) ||
						transactionOption(opt as keyof typeof transactionOptions)

				return returnOption
			})
			.filter((opt) => opt?.shortcut === undefined)
	}

	toString() {
		return `${this.pacman.pacmanDirectory} ${this.toArgs()}`
	}

	toArgs() {
		const hasOpts =
			this.opts?.filter((opt) => opt !== undefined).length || 0 > 1

		return `-${this.operation.shortcut}${
			this.shorthandOpts?.map((o) => o?.shortcut || '').join('') || ''
		}${this.opts?.map((o) => o?.argument || '').join(' ') || ''} ${this.data}`
	}
}
