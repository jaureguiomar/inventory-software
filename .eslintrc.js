module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "plugin:vue/recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript"
  ],
  plugins: ["vue"],
  rules: {
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "vue/html-indent": 0,
    "vue/singleline-html-element-content-newline": 0,
    "vue/max-attributes-per-line": 0,
    "vue/html-self-closing": 0,
    "vue/component-definition-name-casing": 0,
    "vue/no-parsing-error": 0,
    "vue/attribute-hyphenation": 0,
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        // "allowDestructuring": true, // Allow `const { props, state } = this`; false by default
        "allowedNames": ["vue_this"] // Allow `const vm= this`; `[]` by default
      }
    ]
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        mocha: true,
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
