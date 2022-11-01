const colors = require("tailwindcss/colors");

module.exports = {
  important: ".tailwind",
  purge: ["./src/**/*.{js,jsx,md,mdx,ts,tsx,vue}"],
  plugins: [require("@tailwindcss/forms")],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work Sans"],
        body: ["Inter"],
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["focus-visible"],
      opacity: ["disabled"],
    },
  },
  colors: {
    black: "rgb(31, 41, 55)",
  },
};
