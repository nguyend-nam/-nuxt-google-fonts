/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    ({ addComponents }) =>
      addComponents({
        ".section-container": {
          maxWidth: "1440px",
          marginLeft: "auto",
          marginRight: "auto",
        },
      }),
  ],
};
