import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'm-gray': '#808080',
        'm-black': '#000000cc',
        'm-white': '#ffffff'
      },
      fontFamily: {
        'main': ["dungGeunMo"],
      },
      gap: {
        large: "20px"
      }
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      return addVariant("not-last", "&:not(:last-child)");
    }),
  ],
};
export default config;
