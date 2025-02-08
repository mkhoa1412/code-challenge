import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';


export default tseslint.config(
  { ignores: ['build'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescriptEslint,
      prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      "prettier/prettier": "error",
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'import/prefer-default-export': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      'no-console': 'off',
      'no-labels': 'off',
      'no-restricted-syntax': 'off',
      'no-unused-expressions': 'off',
      'no-unused-labels': 'off',
    },
  },
)
