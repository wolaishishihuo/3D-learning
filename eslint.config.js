import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import autoImportGlobals from './.eslintrc-auto-import.json' with { type: 'json' };

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  prettier,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...autoImportGlobals.globals,
        ...globals.browser
      }
    }
  },
  {
    rules: {
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style']
        }
      ],
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          semi: true
        }
      ]
    }
  },
  {
    ignores: ['dist', 'node_modules', '*.config.js']
  }
];
