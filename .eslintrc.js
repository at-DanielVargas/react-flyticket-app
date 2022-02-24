module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:prettier/recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['prettier', 'react'],
  ignorePatterns: ['src/**/*.spec.js', 'src/**/*.test.js'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        bracketSameLine: true,
        bracketSpacing: true,
        embeddedLanguageFormatting: 'auto',
        htmlWhitespaceSensitivity: 'css',
        insertPragma: false,
        jsxSingleQuote: true,
        printWidth: 100,
        proseWrap: 'always',
        quoteProps: 'preserve',
        requirePragma: false,
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none',
        useTabs: false,
        vueIndentScriptAndStyle: false
      }
    ]
  }
}
