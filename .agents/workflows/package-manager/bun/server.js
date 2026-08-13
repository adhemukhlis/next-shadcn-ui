const port = Bun.env.PORT || 3000

const mode = Bun.argv[2] || 'dev'

const commands = {
	dev: ['next', 'dev', '-p', String(port)],
	'dev-https': ['next', 'dev', '-p', String(port), '--experimental-https'],
	start: ['next', 'start', '-p', String(port)],
}

if (!commands[mode]) {
	console.error(`❌ Unknown mode: "${mode}"`)
	console.error(`   Available: ${Object.keys(commands).join(', ')}`)
	process.exit(1)
}

console.info(`🚀 Running: ${commands[mode].join(' ')}`)

Bun.spawn(commands[mode], { stdout: 'inherit', stderr: 'inherit', stdin: 'inherit' })
