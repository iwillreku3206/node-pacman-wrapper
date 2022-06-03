import Pacman from '.'
import Command from './Command'

export default class PacstrapCommand extends Command {
	mountPoint: string
	packages: string[]

	constructor(pacman: Pacman, mountPoint: string, packages: string[]) {
		super(pacman)

		this.mountPoint = mountPoint
		this.packages = packages
	}

	toString(): string {
		return `${this.pacman.pacstrapDirectory} ${
			this.mountPoint
		} ${this.packages.join(' ')}`
	}
}
