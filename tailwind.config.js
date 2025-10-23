/** @type {import('tailwindcss').Config} */
export default {
    content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}" ],
    theme: {
        extend: {
            spacing: {
                "section-xs": "1rem", // 16px
                "section-sm": "1.5rem", // 24px
                "section-md": "2rem", // 32px
            },
            fontFamily: {
                josefin: [ "Josefin Sans", "sans-serif" ],
                poppins: [ "Poppins", "sans-serif" ],
                space: [ "Space Grotesk", "sans-serif" ],
            },
            animation: {
                'pulse-slow': 'pulse 4s ease-in-out infinite',
                'float-glow': 'float-glow 8s ease-in-out infinite',
            },
            keyframes: {
                'float-glow': {
                    '0%, 100%': {
                        transform: 'translateY(0)',
                        filter: 'drop-shadow(0 0 6px rgba(139,92,246,0.4))',
                    },
                    '50%': {
                        transform: 'translateY(-6px)',
                        filter: 'drop-shadow(0 0 14px rgba(236,72,153,0.6))',
                    },
                },
            },
        },
    },
    plugins: [],
};
