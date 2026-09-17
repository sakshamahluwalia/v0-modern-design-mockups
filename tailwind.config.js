/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "ui-serif", "Georgia", "serif"],
        fraunces: ["Fraunces", "ui-serif", "Georgia", "serif"],
        display: ["Sora", "Inter", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
};
