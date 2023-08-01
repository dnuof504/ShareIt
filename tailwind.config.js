/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.svelte",
  "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",],
  theme: {
    extend: {},
  },
  plugins: ['flowbite/plugin'],
}

darkMode: 'class',

module.exports = config;