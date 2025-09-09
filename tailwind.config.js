/** @type {import ('tailwind.css').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/componenets/**/*.{js,ts,jsx,tsx}",
        "./src/context/**/*.{js.ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins:[],
    darkMode: 'class'
}