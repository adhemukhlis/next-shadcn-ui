type IconConfig = {
	outputLanguage: 'typescript' | 'javascript'
	outputDir: string
	rootDir: string
	icons: Record<string, string[]>
}

const config: IconConfig = {
	outputLanguage: 'typescript',
	rootDir: '../../..',
	outputDir: 'src/components/icons',
	icons: {
		regular: ['atom-simple', 'sidebar', 'xmark', 'chevron-right', 'arrows-left-right', 'check']
	}
}

export default config
