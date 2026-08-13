#!/usr/bin/env node

import { spawn } from 'node:child_process'

const port = process.env.PORT || 3000

const mode = process.argv[2] || 'dev'

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

const child = spawn(commands[mode][0], commands[mode].slice(1), { stdio: 'inherit', env: process.env })

child.on('exit', (code) => process.exit(code ?? 0))
