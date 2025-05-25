/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables class-based dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    // background - color
    "bg-orange-500",
    "bg-blue-500",
    "bg-red-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-500",

    "bg-orange-600",
    "bg-blue-600",
    "bg-red-600",
    "bg-green-600",
    "bg-purple-600",
    "bg-yellow-600",

    // hover - background
    "hover:bg-orange-50",
    "hover:bg-blue-50",
    "hover:bg-red-50",
    "hover:bg-green-50",
    "hover:bg-purple-50",
    "hover:bg-yellow-50",

    // text - color
    "text-orange-500",
    "text-blue-500",
    "text-red-500",
    "text-green-500",
    "text-purple-500",
    "text-yellow-500",

    "text-orange-600",
    "text-blue-600",
    "text-red-600",
    "text-green-600",
    "text-purple-600",
    "text-yellow-600",
    // border - color
    "border-orange-500",
    "border-blue-500",
    "border-red-500",
    "border-green-500",
    "border-purple-500",
    "border-yellow-500",

    "border-s-orange-500",
    "border-s-blue-500",
    "border-s-red-500",
    "border-s-green-500",
    "border-s-purple-500",
    "border-s-yellow-500",
    // hover - background
    "hover:bg-orange-500",
    "hover:bg-blue-500",
    "hover:bg-red-500",
    "hover:bg-green-500",
    "hover:bg-purple-500",
    "hover:bg-yellow-500",
    // hover - text
    "hover:text-orange-500",
    "hover:text-blue-500",
    "hover:text-red-500",
    "hover:text-green-500",
    "hover:text-purple-500",
    "hover:text-yellow-500",
    // hover - border
    "hover:border-orange-500",
    "hover:border-blue-500",
    "hover:border-red-500",
    "hover:border-green-500",
    "hover:border-purple-500",
    "hover:border-yellow-500",
    // focus - border
    "focus:border-orange-500",
    "focus:border-blue-500",
    "focus:border-red-500",
    "focus:border-green-500",
    "focus:border-purple-500",
    "focus:border-yellow-500",
    // marker - color
    "marker:text-orange-500",
    "marker:text-blue-500",
    "marker:text-red-500",
    "marker:text-green-500",
    "marker:text-purple-500",
    "marker:text-yellow-500",
  ],
  plugins: [],
};
