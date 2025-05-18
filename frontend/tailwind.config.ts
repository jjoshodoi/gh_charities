import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: '#2C6A4D',       // Dark green
                accent: '#F6A800',        // Yellow
                danger: '#D50032',        // Red
            },
        },
    },
    plugins: [],
};

export default config;
