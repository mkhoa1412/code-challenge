module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ["airbnb-base"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx"],
                moduleDirectory: ["node_modules", "src/"],
            },
        },
    },
    rules: {
        // enable additional rules
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],

        // override default options for rules from base configurations
        "no-cond-assign": ["error", "always"],
        "arrow-body-style": ["error", "always"],

        // disable rules from base configurations
        "no-console": "off",
        "no-unused-vars": ["error", { vars: "all" }],
        "import/no-unresolved": [2, { caseSensitive: false }],
    },
};