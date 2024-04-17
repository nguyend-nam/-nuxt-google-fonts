// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiKey: process.env.NUXT_PUBLIC_GOOGLE_FONTS_KEY,
    },
  },
  css: ['ant-design-vue/dist/reset.css', '/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt',],
  pinia: {
    autoImports: ['defineStore'],
  },
});
