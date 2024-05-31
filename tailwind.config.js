const animagePlugin = require("tailwindcss-animate")
const { shadcnPlugin } = require('./src/lib/shadcn-plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  plugins: [animagePlugin, shadcnPlugin],
}