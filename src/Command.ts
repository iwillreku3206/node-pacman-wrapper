import Pacman from '.'
import {
	commonOptions,
	databaseOption,
	databaseOptions,
	fileOption,
	fileOptions,
	operation,
	operations,
	Option,
	queryOption,
	queryOptions,
	removeOption,
	removeOptions,
	syncOption,
	syncOptions,
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
	options?:
		| (keyof typeof transactionOptions)[]
		| (keyof typeof upgradeOptions)[]
		| (keyof typeof syncOptions)[]
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

export default class Command {
	shorthandOpts: (Option | undefined)[] | undefined
	opts: (Option | undefined)[] | undefined
	operation: string
	data: string | undefined
	pacman: Pacman

	constructor(
		pacman: Pacman,
		options: CommandConstructorOptions,
		data?: string
	) {
		const opts = options.options
		this.operation = options.operation
		this.data = data
		this.pacman = pacman

		this.shorthandOpts = opts
			?.map((opt) => {
				let returnOption

				if (this.operation === 'database')
					returnOption = databaseOption(opt as keyof typeof databaseOptions)
				if (this.operation === 'files')
					returnOption = fileOption(opt as keyof typeof fileOption)
				if (this.operation === 'install')
					returnOption = syncOption(opt as keyof typeof syncOption)
				if (this.operation === 'sync')
					returnOption = syncOption(opt as keyof typeof syncOption)
				if (this.operation === 'query')
					returnOption = queryOption(opt as keyof typeof fileOption)
				if (this.operation === 'remove')
					returnOption = removeOption(opt as keyof typeof fileOption)
				if (this.operation === 'upgrade')
					returnOption = upgradeOption(opt as keyof typeof fileOption)

				return returnOption
			})
			.filter((opt) => opt?.shortcut !== undefined)
	}

	toString() {
		return `${this.pacman.pacmanDirectory} -${
			operation(this.operation as keyof typeof operations).shortcut
		}${this.shorthandOpts?.map((o) => o?.shortcut || '').join('')} ${this.data}`
	}
}
