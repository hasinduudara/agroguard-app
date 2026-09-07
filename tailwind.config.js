/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify the paths to all of your component files
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  
  // REQUIRED: Add the NativeWind preset
  presets: [require("nativewind/preset")],
  
  theme: {
    extend: {},
  },
  plugins: [],
}