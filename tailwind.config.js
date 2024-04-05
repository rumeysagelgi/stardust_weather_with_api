module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    flex: {
      1: 1,
      1.5: 1.5,
      2: 2,
      3: 3,
    },
    
    extend: {
      fontFamily: {
        fleur: ["Fleur De Leah", "cursive"],
        roboto: ["Roboto", "sans-serif"]
      },

      textShadow: {
        "custom": "15px 15px 20px #262626",
      },

      gridTemplateColumns: {
        "2-custom": "1.5fr 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
};
