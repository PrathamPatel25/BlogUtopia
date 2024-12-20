/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // Add custom utilities or styles here
      scrollbar: {
        hide: {
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for WebKit browsers
          },
          "-ms-overflow-style": "none", // Hide scrollbar for IE and Edge
          "scrollbar-width": "none", // Hide scrollbar for Firefox
        },
      },
    },
  },
  plugins: [
    // Add a plugin for custom utilities
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hidden": {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
  ],
};
