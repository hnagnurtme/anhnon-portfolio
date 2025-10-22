/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "section-xs": "1rem", // 16px
        "section-sm": "1.5rem", // 24px
        "section-md": "2rem", // 32px
      },
    },
  },
  plugins: [],
};
