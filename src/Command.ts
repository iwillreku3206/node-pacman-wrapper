import child_process from 'child_process'
import Pacman from '.'
import RunOptions from './_types/RunOptions'

export default abstract class Command {
	pacman: Pacman
	data: string | undefined
	abstract command: 'pacman' | 'pacstrap'
	constructor(pacman: Pacman, data?: string) {
		this.pacman = pacman
		this.data = data
	}

	abstract toString(): string
	abstract toArgs(): string

	run(options?: RunOptions) {
		if (!this.pacman.canRun) throw new Error('Insufficient permissions to run.')

		const args = this.toArgs()
		const proc = child_process.spawn(
			this.command === 'pacman'
				? this.pacman.pacmanDirectory
				: this.pacman.pacstrapDirectory,
			[args]
		)

		if (options?.outputToStdout) {
			proc.stdout.pipe(process.stdout)
		}

		if (options?.readFromStdin) {
			process.stdin.pipe(process.stdin)
		}

		return proc
	}
}
