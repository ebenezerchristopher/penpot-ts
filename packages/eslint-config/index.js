module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"prettier", // Must be the last one to override other configs
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "react"],
	rules: {
		"react/react-in-jsx-scope": "off", // Not needed with React 17+ and new JSX transform
		"react/prop-types": "off", // We use TypeScript for prop types
		"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
		"@typescript-eslint/explicit-module-boundary-types": "off",
	},
	settings: {
		react: {
			version: "detect", // Automatically detect the React version
		},
	},
	ignorePatterns: ["node_modules/", "dist/", ".turbo/", "coverage/"],
};
