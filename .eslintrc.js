module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': 'off',
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-console': 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'comma-dangle': ['error', 'always-multiline'],
        'quote-props': ['error', 'as-needed'],
        'no-trailing-spaces': 'error',
        'eol-last': 'error',
        'implicit-arrow-linebreak': ['error', 'beside'],
        'function-paren-newline': ['error', 'consistent'],
    },
};
