module.exports = {
    parser: "@babel/eslint-parser",
    extends: ["airbnb"],
    env: {
      browser: true,
      node: true,
      es6: true,
      commonjs: true,
    },
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    rules: {
    //   quotes: [2, "double"],
      "array-callback-return": 0,
      indent: [0, 4],
      "arrow-body-style": 0,
    },
};
