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
	abstract toArgs(): string[]

	run(options?: RunOptions) {
		if (!this.pacman.canRun) throw new Error('Insufficient permissions to run.')

		const args = this.toArgs()
		console.log(`Running: ${this.command} ${args}`)
		console.log(`Args: ${JSON.stringify(args)}`)

		const proc = child_process.spawn(
			this.command === 'pacman'
				? this.pacman.pacmanDirectory
				: this.pacman.pacstrapDirectory,
			args
		)

		if (options?.outputToStdout && proc.exitCode === null) {
			proc.stdout.pipe(process.stdout)
			proc.stderr.pipe(process.stdout)
		}

		if (options?.readFromStdin && proc.exitCode === null) {
			process.stdin.pipe(process.stdin)
		}

		return proc
	}
}
