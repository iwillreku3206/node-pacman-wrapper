import child_process from 'child_process'
import Pacman from '.'
import RunOptions from './_types/RunOptions'

export default abstract class Command {
	pacman: Pacman
	data: string | undefined
	constructor(pacman: Pacman, data?: string) {
		this.pacman = pacman
		this.data = data
	}

	abstract toString(): string
	run(options?: RunOptions) {
		if (!this.pacman.canRun) throw new Error('Insufficient permissions to run.')

		const cmd = this.toString()
		const proc = child_process.spawn(cmd)

		if (options?.outputToStdout) {
			proc.stdout.pipe(process.stdout)
		}

		if (options?.readFromStdin) {
			process.stdin.pipe(process.stdin)
		}

		return proc
	}
}
