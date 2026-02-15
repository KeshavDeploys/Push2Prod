export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#000000",
        surface: "#0b0b0f",
        lavender: "#c9a7ff",
        lavenderSoft: "#a78bfa",
        lavenderDim: "#7c6aed",
      },
      animation: {
        glow: "glow 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
}
