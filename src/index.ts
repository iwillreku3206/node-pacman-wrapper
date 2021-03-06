import os from 'os'
import {
	CommandConstructorOptions,
	default as PacmanCommand,
} from './PacmanCommand'
import PacstrapCommand from './PacstrapCommand'
import promisifyChildProcess from './utils/promisifyChildProcess'
import ConstructorOptions from './_types/ConstructorOptions'
import RunOptions from './_types/RunOptions'

export default class Pacman {
	canRun: boolean

	public pacmanDirectory = '/usr/bin/pacman'
	public pacstrapDirectory = '/usr/bin/pacstrap'

	constructor(options?: ConstructorOptions) {
		// Check if uid is root
		const uid = os.userInfo().uid
		this.canRun = uid === 0

		if (options?.pacmanLocation) this.pacmanDirectory = options?.pacmanLocation
		if (options?.pacstrapLocation)
			this.pacstrapDirectory = options?.pacstrapLocation
	}

	setPacmanDirectory(directory: string) {
		this.pacmanDirectory = directory
	}

	setPacstrapDirectory(directory: string) {
		this.pacstrapDirectory = directory
	}

	makePacmanCommand(options: CommandConstructorOptions, data?: string) {
		return new PacmanCommand(this, options, data)
	}

	makePacstrapCommand(mountPoint: string, packages: string[]) {
		return new PacstrapCommand(this, mountPoint, packages)
	}

	async install(packages: string[], runOptions?: RunOptions) {
		const command = this.makePacmanCommand(
			{
				operation: 'install',
			},
			packages.join(' ')
		)

		if (runOptions?.run) {
			const runner = command.run(runOptions)
			return promisifyChildProcess(runner)
		}

		return command.toString()
	}

	async refresh(force?: boolean, runOptions?: RunOptions) {
		const command = this.makePacmanCommand({
			operation: 'install',
			options: [force ? 'forceRefresh' : 'refresh'],
		})

		if (runOptions?.run) {
			const runner = command.run(runOptions)
			return promisifyChildProcess(runner)
		}

		return command.toString()
	}

	async remove(
		packages: string[],
		cleanUnneeded?: boolean,
		runOptions?: RunOptions
	) {
		const command = this.makePacmanCommand(
			{
				operation: 'remove',
				options: cleanUnneeded ? ['unneeded'] : [],
			},
			packages.join(' ')
		)

		if (runOptions?.run) {
			const runner = command.run(runOptions)
			return promisifyChildProcess(runner)
		}

		return command.toString()
	}
}
