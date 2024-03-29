module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    extends: [
        'xo',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
    ],
    rules: {
        semi: 'off',
        '@typescript-eslint/semi': ['error', 'always'],
        indent: ['error', 4],
        camelcase: 'off',
        'no-negated-condition': 'off',
        'guard-for-in': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'no-constructor-return': 'off',
        'default-param-last': 'off',
        'eol-last': ['error', 'always'],
        'react/prop-types': [2, {ignore: ['children']}],
        'default-case': 'off',
        'no-mixed-operators': 'off',
        'prefer-promise-reject-errors': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        '@typescript-eslint/type-annotation-spacing': ['error'],
        'no-alert': 'off',
        'no-undef': 'off',
        'no-void': 'off'
    }
};
