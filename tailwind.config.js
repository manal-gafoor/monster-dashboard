/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      width: {
        20: "20px",
        28: "28px",
        768: "768px",
      }
    },
  },
  plugins: [],
}

