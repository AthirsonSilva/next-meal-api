module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: 'standard-with-typescript',
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: ['@typescript-eslint', 'prettier'],
	extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
	rules: {
		'@typescript-eslint/dot-notation': 'off',
		'prettier/prettier': [
			'error',
			{
				semi: false,
				useTabs: true,
				tabWidth: 2,
				singleQuote: true,
				trailingComma: 'all',
				arrowParens: 'avoid',
			},
		],
	},
}
