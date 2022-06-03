class Argument {
	argument: string
	shortcut: string | undefined

	constructor(argument: string, shortcut?: string) {
		this.argument = argument
		this.shortcut = shortcut
	}
}

export class Operation extends Argument {}
export class Option extends Argument {}

export const operations = {
	database: new Operation('--database', 'D'),
	query: new Operation('--query', 'Q'),
	remove: new Operation('--remove', 'R'),
	sync: new Operation('--sync', 'S'),
	install: new Operation('--sync', 'S'),
	deptest: new Operation('--deptest', 'T'),
	upgrade: new Operation('--upgrade', 'U'),
	files: new Operation('--files', 'F'),
	version: new Operation('--version', 'V'),
	help: new Operation('--help', 'h'),
}

export function operation(operation: keyof typeof operations): Operation {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (operations as any)[operation] as Operation
}

export const commonOptions = {
	dbpath: new Option('dbpath', 'b'),
	root: new Option('--root', 'r'),
	verbose: new Option('verbose', 'v'),
	arch: new Option('--arch'),
	cachedir: new Option('--cachedir'),
	color: new Option('--color'),
	config: new Option('--config'),
	debug: new Option('--debug'),
	gpgdir: new Option('--gpgdir'),
	hookdir: new Option('--hookdir'),
	logfile: new Option('logfile'),
	noconfirm: new Option('--noconfirm'),
	confirm: new Option('--confirm'),
	disableDownloadTimeout: new Option('--disable-download-timeout'),
	sysroot: new Option('--sysroot'),
}

export function commonOption(option: keyof typeof commonOptions): Option {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (commonOptions as any)[option] as Operation
}

export const transactionOptions = {
	nodeps: new Option('--nodeps', 'd'),
	print: new Option('--print', 'p'),
	assumeInstalled: new Option('--assume-installed'),
	dbonly: new Option('--dbonly'),
	noprogressbar: new Option('--noprogressbar'),
	noscriptlet: new Option('--noscriptlet'),
	printFormat: new Option('--print-format'),
}

export function transactionOption(
	option: keyof typeof transactionOptions
): Option {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (transactionOptions as any)[option] as Operation
}

export const upgradeOptions = {
	downloadOnly: new Option('--downloadonly', 'w'),
	asdeps: new Option('--asdeps'),
	asexplicit: new Option('--asexplicit'),
	ignore: new Option('--ignore'),
	ignoregroup: new Option('--ignoregroup'),
	needed: new Option('--needed'),
	overwrite: new Option('--overwrite'),
}

export function upgradeOption(option: keyof typeof upgradeOptions): Option {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (upgradeOptions as any)[option] as Operation
}

export const queryOptions = {
	changelog: new Option('--changelog', 'c'),
	deps: new Option('--deps', 'd'),
	explicit: new Option('--explicit', 'e'),
	groups: new Option('--groups', 'g'),
	info: new Option('--info', 'i'),
	check: new Option('--check', 'k'),
	list: new Option('--list', 'l'),
	foreign: new Option('--foreign', 'm'),
	native: new Option('--native', 'n'),
	owns: new Option('--owns', 'o'),
	file: new Option('--file', 'p'),
	quiet: new Option('--quiet', 'q'),
	search: new Option('--search', 's'),
	unrequired: new Option('--unrequired', 't'),
	upgrades: new Option('--upgrades', 'u'),
}

export function queryOption(option: keyof typeof queryOptions): Option {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (queryOptions as any)[option] as Operation
}

export const removeOptions = {
	cascade: new Option('--cascade', 'c'),
	nosave: new Option('--nosave', 'n'),
	recursive: new Option('--recursive', 's'),
	unneeded: new Option('--unneeded', 'u'),
}

export function removeOption(option: keyof typeof removeOptions): Option {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (removeOptions as any)[option] as Operation
}

export const syncOptions = {
	clean: new Option('--clean', 'c'),
	groups: new Option('--groups', 'g'),
	info: new Option('--info', 'i'),
	list: new Option('--list', 'l'),
	quiet: new Option('--quiet', 'q'),
	search: new Option('--search', 's'),
	sysupgrade: new Option('--sysupgrade', 'u'),
	refresh: new Option('--refresh', 'y'),
	forceRefresh: new Option('--refresh --refresh', 'yy'),
}

export function syncOption(option: keyof typeof syncOptions): Option {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (syncOptions as any)[option] as Operation
}

export const databaseOptions = {
	check: new Option('--check', 'k'),
	quiet: new Option('--quiet', 'q'),
	asdeps: new Option('--asdeps'),
	asexlipcit: new Option('--asexplicit'),
}

export function databaseOption(option: keyof typeof databaseOptions): Option {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (databaseOptions as any)[option] as Operation
}

export const fileOptions = {
	refresh: new Option('--refresh', 'y'),
	forceRefresh: new Option('--refresh --refresh', 'yy'),
	list: new Option('--list', 'l'),
	regex: new Option('--regex', 'x'),
	machinereadable: new Option('--machinereadable'),
}

export function fileOption(option: keyof typeof fileOptions): Option {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (fileOptions as any)[option] as Operation
}

export const noop: Option = {
	argument: '',
	shortcut: '',
}
