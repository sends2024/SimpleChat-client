// eslint.config.mjs
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
    {
        files: ['**/*.{ts,tsx}'],
        ignores: ['dist', 'dev-build'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            'react-hooks/rules-of-hooks': 'error',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            // 允许any类型，允许空接口，仅对未使用变量报错
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-interface': 'off',
            '@typescript-eslint/no-unused-vars': 'warn'
        }
    }
]
