import { existsSync, mkdirSync, unlink, writeFile } from 'fs'
import { get } from 'https'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

import config from './config.js'

import type { IncomingMessage } from 'http'

const { icons, rootDir, outputDir } = config
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const toPascalCase = (str: string): string => {
	return str.replace(/[-_\s]+(.)?/g, (_, c: string | undefined) => (c ? c.toUpperCase() : '')).replace(/^(.)/, (match) => match.toUpperCase())
}

const ensureDirectoryExistence = (filePath: string): void => {
	const _dirname = dirname(filePath)

	if (existsSync(_dirname)) {
		return
	}

	mkdirSync(_dirname, { recursive: true })
}

const pLimit = async <T>(fnList: Array<() => Promise<T>>, limit: number = 5): Promise<T[]> => {
	const runningPromises: Promise<T>[] = []

	for (const fn of fnList) {
		const promise = fn()

		runningPromises.push(promise)
		promise.finally(() => {
			const index = runningPromises.indexOf(promise)

			if (index > -1) {
				runningPromises.splice(index, 1)
			}
		})

		if (runningPromises.length >= limit) {
			await Promise.race(runningPromises)
		}
	}

	return Promise.all(runningPromises)
}

const downloadFile = async (url: string, filename: string): Promise<void> => {
	const filePath = join(resolve(__dirname, rootDir, outputDir, 'svgs'), filename)

	ensureDirectoryExistence(filePath)

	return new Promise<void>((promiseResolve, reject) => {
		const request = get(url, (response: IncomingMessage) => {
			if (!response.statusCode || response.statusCode < 200 || response.statusCode >= 300) {
				if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
					request.destroy()
					console.warn(`Redirecting: ${url}`)
					downloadFile(response.headers.location, filename).then(promiseResolve).catch(reject)

					return
				}

				reject(new Error(`Failed to get '${url}'. Status Code: ${response.statusCode}`))

				return
			}

			let fileContent = ''

			response.on('data', (chunk: Buffer) => {
				fileContent += chunk
			})
			response.on('end', () => {
				try {
					const componentNameMatch = fileContent.match(/const\s+(\w+)\s+=\s+\(([^)]*)\)\s+=>/)

					if (!componentNameMatch) {
						reject(new Error(`Konten SVG tidak memiliki format 'const Component = (props) =>' yang diharapkan.`))

						return
					}

					const componentName = componentNameMatch[1]
					const typedContent = fileContent.replace(/const\s+\w+\s+=\s+\(([^)]*)\)\s+=>/, `const ${componentName}: FC<SVGProps<SVGSVGElement>> = ($1) =>`)
					const finalContent = `import type { FC, SVGProps } from 'react'\n${typedContent}`

					writeFile(filePath, finalContent, (err) => {
						if (err) {
							reject(err)

							return
						}

						promiseResolve()
					})
				} catch (err) {
					reject(new Error(`Gagal memproses file ${filename}: ${(err as Error).message}`))
				}
			})
			response.on('error', (err: Error) => {
				unlink(filePath, () => {})
				reject(err)
			})
			// Tambahkan error handling request timeout seperti sebelumnya
			request.on('error', (err: Error) => {
				reject(err)
			})
			request.setTimeout(15000, () => {
				request.destroy()
				reject(new Error('Request timed out after 15 seconds'))
			})
		})
	})
}

type DownloadItem = [type: string, icon: string]

type RegisteredIcon = {
	filePath: string
	importName: string
	componentName: string
}

const downloadList: DownloadItem[] = Object.keys(icons)
	.flatMap((type) => icons[type]!.map((icon): DownloadItem => [type, icon]))
	.reduce<DownloadItem[]>((unique, item) => {
		const key = item.join('-')

		return unique.map((_item) => _item.join('-')).includes(key) ? unique : [...unique, item]
	}, [])
	.sort((a, b) => a[1].localeCompare(b[1]))

const missingDownloadList = downloadList.filter((downloadItem) => {
	const filename = `${downloadItem[0]}/${downloadItem[1]}.tsx`
	const filePath = join(resolve(__dirname, rootDir, outputDir, 'svgs'), filename)

	return !existsSync(filePath)
})

if (missingDownloadList.length === 0) {
	console.info('\n--- Tidak ada icon baru yang perlu di-download. ---')
} else {
	console.info(`\n--- Menemukan ${missingDownloadList.length} icon baru untuk di-download. ---`)
}

const downloadFnList = missingDownloadList.map((downloadItem) => () => {
	const url = `https://svgjs.vercel.app/api/getContent?group=font-awesome&type=${downloadItem[0]}&iconName=${downloadItem[1]}.svg`
	const filename = `${downloadItem[0]}/${downloadItem[1]}.tsx`

	return downloadFile(url, filename)
		.then(() => {
			console.info(`✅ ${filename} downloaded successfully!`)
		})
		.catch((err: Error) => {
			console.error(`❌ Error downloading ${filename}: ${err.message}`)
			throw err
		})
})

pLimit(downloadFnList, 5)
	.then(() => {
		if (missingDownloadList.length > 0) {
			console.info('\n--- Semua icon baru sukses di-download. Melanjutkan pembuatan index file. ---\n')
		} else {
			console.info('\n--- Melanjutkan pembuatan index file. ---\n')
		}

		const registerIcons: RegisteredIcon[] = downloadList.map((item) => {
			const combinedString = item.join('-')
			const importName = toPascalCase(combinedString)

			return {
				filePath: `./svgs/${item[0]}/${item[1]}`,
				importName,
				componentName: `Icon${importName}`
			}
		})

		const files = [
			{
				path: join(resolve(__dirname, rootDir, outputDir), 'index.tsx'),
				content: `${registerIcons.map((item) => `import ${item.importName} from '${item.filePath}'`).join('\n')}\n\nimport type { FC, SVGProps } from 'react'\n${registerIcons.map((item) => `export const ${item.componentName}: FC<SVGProps<SVGSVGElement>> = (props) => <${item.importName} {...props} />`).join('\n')}`
			}
		]

		files.forEach((file) => {
			ensureDirectoryExistence(file.path)
			writeFile(file.path, file.content, (err) => {
				if (err) {
					console.error(`❌ Error creating file ${file.path}:`, err)

					return
				}

				console.info(`✅ ${file.path} has been created successfully!`)
			})
		})
	})
	.catch((err: Error) => {
		console.error('\n--- Proses dibatalkan karena ada kegagalan download! ---')
		console.error(err)
	})
