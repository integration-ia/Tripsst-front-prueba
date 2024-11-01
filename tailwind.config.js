// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // Incluye archivos en `app`
    "./pages/**/*.{js,ts,jsx,tsx}",     // Incluye archivos en `pages`
    "./components/**/*.{js,ts,jsx,tsx}", // Incluye archivos en `components`
    "./src/**/*.{js,ts,jsx,tsx}",       // Incluye archivos en `src` si tu proyecto usa esta estructura
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
