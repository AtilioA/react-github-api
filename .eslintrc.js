module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "prettier", "prettier/react"],
    "plugins": ["react", "prettier"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "parser": "babel-eslint"
    },
    "rules": {
        "prettier/prettier": "error",
        "react/jsx-filename-extension": ["warn", { "extensions": [".jsx", ".js"] }],
        "semi": ["error", "always"],
        "class-methods-use-this": "off",
        "no-param-reassign": "off",
        "camelcase": "off",
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
    }
};
