import Pacman from '.'

export default abstract class Command {
	pacman: Pacman
	data: string | undefined
	constructor(pacman: Pacman, data?: string) {
		this.pacman = pacman
		this.data = data
	}

	abstract toString(): string
}
