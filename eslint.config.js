const penpotConfig = require('@penpot/eslint-config');

module.exports = [
  // First, define a configuration for JS config files
  {
    files: ['**/*.js', '**/*.cjs'], // Target .js and .cjs files
    languageOptions: {
      // No parser options with project = true here!
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off', // Allow require() in CJS config files
    },
  },
  ...penpotConfig,
  // You can add root-level overrides here if needed, for example:
  // {
  //   files: ["packages/ui-core/**/*.stories.tsx"],
  //   rules: {
  //     // special rules for story files
  //   }
  // }
];
