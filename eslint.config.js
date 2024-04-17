import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    ignores: [
      ".nuxt/*",
      "*.json",
      "*.md",
      "*.css",
      "node_modules",
      "dist",
      "public/*",
      "tests/*",
      "scripts/*",
      "*.config.js",
      ".DS_Store",
      "coverage",
      ".nuxt",
      "build",
      "!.commitlintrc.cjs",
      "jest.config.js",
    ],
  },
  {
    files: ["**/*.vue"],
    rules: {
      // "vue/html-self-closing": "off"
    },
  },
);
