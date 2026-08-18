import path from 'node:path'
import eslintReact from '@eslint-react/eslint-plugin'
import jsEslint from '@eslint/js'
// import cspell from '@cspell/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'
import next from '@next/eslint-plugin-next'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import perfectionist from 'eslint-plugin-perfectionist'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

const eslintConfig = defineConfig([
	// ==========================================
	// 1. GLOBAL IGNORES
	// ==========================================
	{ ignores: ['**/node_modules/**', '**/.git/**', '**/.vscode/**'] },

	// ==========================================
	// 2. UNIVERSAL CONFIGURATION (TS, Style, Formatting, Sorting)
	// ==========================================
	// This block contains universal rules that apply to any TypeScript project.
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: { ...globals.node },
			parser: tsEslint.parser,
			parserOptions: { project: './tsconfig.json', tsconfigRootDir: path.resolve(import.meta.dirname, '..') },
			sourceType: 'module',
		},
		plugins: { '@stylistic': stylistic, perfectionist },
		extends: [jsEslint.configs.recommended, ...tsEslint.configs.recommended],
		rules: {
			// Universal Javascript / ESLint Quality Rules
			curly: ['error', 'all'],
			eqeqeq: ['warn', 'always', { null: 'ignore' }],
			'newline-before-return': 'warn',
			'no-case-declarations': 'error',
			'no-console': ['warn', { allow: ['warn', 'error', 'info', 'table'] }],
			'no-control-regex': 'error',
			'no-debugger': 'error',
			'no-dupe-keys': 'error',
			'no-eval': 'error',
			'no-extra-boolean-cast': 'warn',
			'no-implied-eval': 'error',
			'no-misleading-character-class': 'error',
			'no-mixed-spaces-and-tabs': 'off',
			'no-self-compare': 'error',
			'no-template-curly-in-string': 'warn',
			'no-undef': 'off',
			'no-unsafe-optional-chaining': 'error',
			'no-unused-vars': 'off',
			'no-useless-rename': 'warn',
			'no-var': 'error',
			'object-shorthand': ['warn', 'always'],
			'prefer-const': 'error',
			'prefer-template': 'warn',
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['react'],
							importNamePattern: '^\\*$',
						},
						{
							group: ['@/components/base'],
							message: 'fork only components',
						},
					],
				},
			],

			// Universal TypeScript Rules
			'@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
			'@typescript-eslint/consistent-type-exports': ['warn', { fixMixedExportsWithInlineTypeSpecifier: true }],
			'@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports', fixStyle: 'separate-type-imports' }],
			// '@typescript-eslint/explicit-function-return-type': [
			// 	'warn',
			// 	{ allowDirectConstAssertionInArrowFunctions: true, allowExpressions: true, allowHigherOrderFunctions: true, allowTypedFunctionExpressions: true },
			// ],
			'@typescript-eslint/no-base-to-string': 'error',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-misused-promises': 'error',
			'@typescript-eslint/no-non-null-assertion': 'warn',
			'@typescript-eslint/no-unnecessary-condition': ['warn', { allowConstantLoopConditions: true }],
			'@typescript-eslint/no-unnecessary-type-assertion': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
			'@typescript-eslint/prefer-as-const': 'warn',
			'@typescript-eslint/prefer-includes': 'warn',
			'@typescript-eslint/prefer-optional-chain': 'warn',
			'@typescript-eslint/prefer-string-starts-ends-with': 'warn',
			'@typescript-eslint/require-await': 'error',
			'@typescript-eslint/restrict-plus-operands': 'error',
			'@typescript-eslint/restrict-template-expressions': ['error', { allowAny: false, allowBoolean: true, allowNullish: true, allowNumber: true, allowRegExp: true }],
			'@typescript-eslint/unbound-method': 'error',
			'@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],

			// Universal Coding Style (Stylistic Plugin)
			'@stylistic/arrow-parens': ['warn', 'always'],
			'@stylistic/lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
			'@stylistic/no-multi-spaces': 'warn',
			'@stylistic/padding-line-between-statements': [
				'warn',
				{ blankLine: 'always', next: 'return', prev: '*' },
				{ blankLine: 'always', next: '*', prev: 'directive' },
				{ blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
				{ blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] },
				{ blankLine: 'always', next: '*', prev: 'block-like' },
				{ blankLine: 'always', next: 'block-like', prev: '*' },
				{ blankLine: 'always', next: '*', prev: ['multiline-const'] },
				{ blankLine: 'always', next: ['multiline-const'], prev: '*' },
				{ blankLine: 'always', next: ['if', 'for', 'switch', 'try', 'while'], prev: '*' },
				{ blankLine: 'always', next: '*', prev: ['if', 'for', 'switch', 'try', 'while'] },
				{ blankLine: 'always', next: '*', prev: 'import' },
				{ blankLine: 'any', next: 'import', prev: 'import' },
				{ blankLine: 'always', next: 'export', prev: '*' },
				{ blankLine: 'always', next: ['interface', 'type', 'return'], prev: '*' },
				{ blankLine: 'always', next: '*', prev: ['interface', 'type'] },
			],
			'@stylistic/rest-spread-spacing': ['warn', 'never'],
			'@stylistic/spaced-comment': ['warn', 'always', { markers: ['/'] }],
			'@stylistic/template-curly-spacing': ['warn', 'never'],

			// Perfectionist Sorting Rules
			'perfectionist/sort-enums': [
				'warn',
				{ fallbackSort: { type: 'unsorted' }, ignoreCase: true, order: 'asc', sortByValue: 'ifNumericEnum', specialCharacters: 'keep', type: 'alphabetical' },
			],
			'perfectionist/sort-exports': ['warn', { fallbackSort: { type: 'unsorted' }, ignoreCase: true, order: 'asc', specialCharacters: 'keep', type: 'alphabetical' }],
			'perfectionist/sort-imports': [
				'warn',
				{
					groups: [['builtin', 'external'], ['internal', 'parent', 'sibling', 'index'], 'type', 'unknown'],
					ignoreCase: true,
					internalPattern: ['^@/.*'],
					order: 'asc',
					type: 'alphabetical',
				},
			],
			'perfectionist/sort-interfaces': [
				'warn',
				{ fallbackSort: { type: 'unsorted' }, ignoreCase: true, order: 'asc', sortBy: 'name', specialCharacters: 'keep', type: 'alphabetical' },
			],
			'perfectionist/sort-modules': [
				'warn',
				{
					fallbackSort: { type: 'alphabetical' },
					groups: [
						'declare-enum',
						'export-enum',
						'enum',
						['declare-interface', 'declare-type'],
						['export-interface', 'export-type'],
						['interface', 'type'],
						'declare-class',
						'class',
						'export-class',
						'declare-function',
						'export-function',
						'function',
					],
					ignoreCase: true,
					order: 'asc',
					specialCharacters: 'keep',
					type: 'alphabetical',
				},
			],
			'perfectionist/sort-named-exports': [
				'warn',
				{ fallbackSort: { type: 'unsorted' }, ignoreAlias: true, ignoreCase: true, order: 'asc', specialCharacters: 'keep', type: 'alphabetical' },
			],
			'perfectionist/sort-named-imports': ['warn', { ignoreCase: true, order: 'asc', type: 'alphabetical' }],
			'perfectionist/sort-object-types': [
				'warn',
				{ fallbackSort: { type: 'unsorted' }, ignoreCase: true, order: 'asc', sortBy: 'name', specialCharacters: 'keep', type: 'alphabetical' },
			],
			'perfectionist/sort-objects': ['warn', { fallbackSort: { type: 'unsorted' }, ignoreCase: true, order: 'asc', sortBy: 'name', specialCharacters: 'keep', type: 'alphabetical' }],
			'perfectionist/sort-union-types': ['warn', { fallbackSort: { type: 'unsorted' }, ignoreCase: true, order: 'asc', specialCharacters: 'keep', type: 'alphabetical' }],
			'perfectionist/sort-variable-declarations': ['warn', { fallbackSort: { type: 'unsorted' }, ignoreCase: true, order: 'asc', specialCharacters: 'keep', type: 'alphabetical' }],
		},
		settings: { 'import/resolver': { typescript: { project: './tsconfig.json' } } },
	},
	// ==========================================
	// 3. SPELL CHECKER CONFIGURATION
	// ==========================================
	// { files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'], plugins: { '@cspell': cspell }, rules: { '@cspell/spellchecker': ['warn', { checkComments: false }] } },

	// ==========================================
	// 4. PROJECT-SPECIFIC CONFIGURATION
	// ==========================================
	// Stack-specific blocks here. When copying this eslint config to other projects,
	// simply remove/comment this block and its corresponding import at the top.
	{ ignores: ['**/.next/**', '.next/**', 'next-env.d.ts', 'src/components/base/**'] },
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		languageOptions: { globals: { ...globals.browser } },
		plugins: { '@next/next': next, '@stylistic': stylistic, perfectionist, 'better-tailwindcss': betterTailwindcss },
		extends: [eslintReact.configs['strict-typescript']],
		settings: {
			// Tailwind CSS v4 uses the CSS file as its config entry point
			'better-tailwindcss': { entryPoint: 'src/styles/global.css' },
		},
		rules: {
			// Next.js Stack Rules
			// Explicit overrides for the HTML-element convention:
			// raw `<a>` → `<Link>` from next/link · raw `<img>` → `<Image>` from next/image.
			...next.configs.recommended.rules,
			...next.configs['core-web-vitals'].rules,
			'@next/next/no-html-link-for-pages': 'error',
			'@next/next/no-img-element': 'error',

			// Tailwind CSS Rules (class sorting owned by ESLint, prettier only formats)
			'better-tailwindcss/enforce-canonical-classes': 'error',
			'better-tailwindcss/enforce-consistent-class-order': 'error',
			'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
			'better-tailwindcss/enforce-consistent-variant-order': 'error',
			'better-tailwindcss/no-conflicting-classes': 'error',
			'better-tailwindcss/no-concatenated-classes': 'error',
			'better-tailwindcss/no-deprecated-classes': 'error',
			'better-tailwindcss/no-duplicate-classes': 'error',
			'better-tailwindcss/no-unknown-classes': 'error',
			'better-tailwindcss/no-unnecessary-whitespace': 'error',

			// React Core Quality Rules
			'@eslint-react/dom-no-dangerously-set-innerhtml': 'warn',
			'@eslint-react/jsx-no-useless-fragment': 'warn',
			'@eslint-react/no-array-index-key': 'warn',
			'@eslint-react/no-clone-element': 'warn',
			'@eslint-react/no-missing-component-display-name': 'off',
			'@eslint-react/no-missing-key': 'error',
			'@eslint-react/exhaustive-deps': 'off', // we don't need exhaustive deps

			// React Stylistic Formatting
			'@stylistic/jsx-child-element-spacing': 'warn',
			'@stylistic/jsx-curly-brace-presence': ['warn', { children: 'never', props: 'never' }],
			'@stylistic/jsx-pascal-case': ['warn', { allowNamespace: true }],
			'@stylistic/jsx-quotes': ['warn', 'prefer-double'],
			'@stylistic/jsx-self-closing-comp': 'warn',
			'perfectionist/sort-jsx-props': ['warn', { fallbackSort: { type: 'unsorted' }, ignoreCase: true, order: 'asc', type: 'alphabetical' }],
			'perfectionist/sort-classes': [
				'warn',
				{
					fallbackSort: { type: 'alphabetical' },
					groups: ['static-property', 'property', 'constructor', 'static-method', 'method'],
					ignoreCase: true,
					order: 'asc',
					type: 'alphabetical',
				},
			],

			// Custom rules (e.g., prevent production build stringify inside <pre> tags)
			'no-restricted-syntax': [
				'warn',
				{
					message: `Don't leave JSON.stringify inside <pre> in production code.`,
					selector: `JSXElement[openingElement.name.name='pre'] > JSXExpressionContainer > CallExpression[callee.object.name='JSON'][callee.property.name='stringify'][arguments.length>=3]`,
				},
			],
		},
	},
])

export default eslintConfig
