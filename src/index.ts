import os from 'os'
import Command, { CommandConstructorOptions } from './PacmanCommand'

export default class Pacman {
	canRun: boolean

	public pacmanDirectory = '/usr/bin/pacman'
	public pacstrapDirectory = '/usr/bin/pacstrap'

	constructor() {
		// Check if uid is root
		const uid = os.userInfo().uid
		this.canRun = uid === 0
	}

	setPacmanDirectory(directory: string) {
		this.pacmanDirectory = directory
	}

	setPacstrapDirectory(directory: string) {
		this.pacstrapDirectory = directory
	}

	makeCommand(options: CommandConstructorOptions, data?: string) {
		return new Command(this, options, data)
	}
}

const cmd = new Command(
	new Pacman(),
	{ operation: 'install', options: ['refresh', 'nodeps'] },
	'asdf asdf-asdf'
)

console.log(cmd.toString())
