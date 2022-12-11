/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#00A6F3",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          ".btn-custom": {
            "background-color": "#1EA1F1",
          },
        },
      },
    ],
  },
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        "neutral-dark": "var(--neutral-dark)",
        "neutral-medium": "#171F2B",
        "neutral-light": "#6F8CC7",
        primary: "#00A6F3",
        white: "#FFF",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    // styled: true,
    // themes: true,
    // base: true,
    // utils: true,
    // logs: true,
    // rtl: false,
    // prefix: "",
    // darkTheme: "dark",
  },
  // darkMode: ['class', '[data-theme="night"]']
};
