/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./html/**/*.{html,js}", "./js/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", 'sans-serif']
      },
      colors: {
        primary70: "#994A2F",
        primary50: "#EC7249",
        primary30: "#FFAF94",
        brown70: "#3A2B26",
        brown50: "#513D36",
        brown30: "#906D61",
        gray70: "#1F1F1F",
        gray50: "#656565",
        gray30: "#FAFAFA",
        blue50: "#1B73A3",
        blue30: "#2296D5",
        green50: "#30965C",
        green30: "#3CC175",
        red50: "#9C2F2F",
        red30: "#C13C3C"
      },
    },
  },
  plugins: [],
}

