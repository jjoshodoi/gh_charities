import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                zinc: colors.zinc,
                primary: "#2C6A4D",
                "primary-foreground": "#ffffff",
                accent: "#F6A800",
                danger: "#D50032",
            },
        },
    },
    corePlugins: {
        fontFamily: true,
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
