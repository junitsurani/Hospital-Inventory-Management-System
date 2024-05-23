/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    important: "#root",
    theme: {
        extend: {
            colors: {
                first: "#2B6ED4",
                second: "#E8ECF3",
                third: "#a6c7f9",
                fourth: "#3d3d3d",
                fifth: "#F2F2F2",
            },
        },
    },
    plugins: [],
};
