/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        formBG: "rgba(221, 221, 221, 0.9)",
        formText: "#353131",
        formInput: "rgba(236, 236, 236, 0.72)",
        formButton: "rgba(165, 72, 140, 0.85)",
        cancelButton: "#676767",
        modalBorder: "#6B6B6B",
        mc1: "#D67187",
        mc2: "#9F5280",
        mc3: "#67AEFE",
        mc4: "#5D9CF6",
        mc5: "#99D9DB",
        mc6: "#7EB3D2",
        mc7: "#539FB3",
        mc8: "#4182A3",
        mc9: "#FFD48C",
        mc10: "#E8AF90",
        bg1: "#f0f9ff",
        bd1: "#bae6fd",
        tab1: "#EF476F",
        tab2: "#F78C6B",
        tab3: "#FFD166",
        tab4: "#06D6A0",
        tab5: "#118AB2",
        tab6: "#073B4C",
        tab7: "#eb6d54",
        tab8: "#99b7db",
        tab9: "#f8d44c",
        tab10: "#a8d572",
        tab10hover: "#95c75a",
        tab11: "#f6ecc9",
        tab12: "#f2ac3c",
        tab13: "#fb7185"
      },
      height: {
        "screen-80": "calc(100vh - 96px)",
        "screen-40": "calc(100% - 40px)",
        "screen-16": "calc(100% - 16px)",
      },
      transformOrigin: {
        bottom: "bottom",
      },
      keyframes: {
        slideRightToLeft: {
          '0%': { transform: 'translateX(100%)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-68%)' },
        },
      },
      animation: {
        scroll: 'scroll 8s linear infinite',
        slideRightToLeft: 'slideRightToLeft 5s ease-in-out forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
