/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js, jsx, ts, tsx}',
        './pages/**/*.{js, jsx, ts, tsx}'
    ],
    theme: {
        listStyleType: {
            none: 'none',
            disc: 'disc',
            decimal: 'decimal',
            square: 'square',
            roman: 'upper-roman',
        },
        extend: {},
        dark: {
            textColor: 'white',
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light", "dark"],
    },
}
