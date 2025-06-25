module.exports = {
  root: true,
  extends: ['@penpot/eslint-config'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
