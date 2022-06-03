import Pacman from '.'
import Command from './Command'

export default class PacstrapCommand extends Command {
	command: 'pacman' | 'pacstrap' = 'pacstrap'
	mountPoint: string
	packages: string[]

	constructor(pacman: Pacman, mountPoint: string, packages: string[]) {
		super(pacman)

		this.mountPoint = mountPoint
		this.packages = packages
	}

	toString() {
		return `${this.pacman.pacstrapDirectory} ${this.toArgs().join(' ')}}`
	}

	toArgs() {
		return [this.mountPoint, this.packages.join(' ')]
	}
}
