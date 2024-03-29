import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/common/helpers/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#203170",
        secondary: "#C5E5FF",
        tertiary: "#FE6916",
        note: "#808080",
        stroke: "#EAEAEA",
        error: "#F23030",
        link: "#0057FF",
        medical: "#FF6D80",
        daily: "#969AFF",
        moment: "#FFA959",
      },
    },
  },
  plugins: [],
};
export default config;
