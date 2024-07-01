/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D',
        secondary: '#16181c',
        teritiary: '#ffffff',
        fourth: '#f0efe9',
        fifth: '#222222',
        sixth: '#383838',
        seventh: '#e31c5f',
        eighth: '#ffffff',
        nineth: '#1d8248',
        bright: '65fe08',
        darkings: '#dddddd',
        newest: '#008489',
        fonzzi: '#192734',
        allnew: '#35ade1',
      }
    },
  },
  plugins: [
    function({addUtilities}){
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar":{
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

