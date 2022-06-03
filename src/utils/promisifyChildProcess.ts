import { ChildProcess } from 'child_process'

export default function promisifyChildProcess(process: ChildProcess) {
	return new Promise((resolve, reject) => {
		process.addListener('error', reject)
		process.addListener('exit', resolve)
	})
}
