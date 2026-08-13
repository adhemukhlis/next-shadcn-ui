import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const devDir = dirname(fileURLToPath(import.meta.url))
const rootDir = join(devDir, '..')

// Change working directory to root so ESLint processes files relative to root
process.chdir(rootDir)

const eslintPkg = require.resolve('eslint/package.json')
const eslintBin = eslintPkg.replace('package.json', 'bin/eslint.js')

await import(eslintBin)
