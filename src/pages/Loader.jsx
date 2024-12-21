import React from "react";

const loaderStyles = {
  "@keyframes loaderDot": {
    "0%": {
      transform: "translate(0px, 0px) scaleX(1)",
    },
    "14%": {
      transform: "translate(-12px, -16px) scaleX(1.05)",
    },
    "28%": {
      transform: "translate(-27px, -28px) scaleX(1.07)",
    },
    "42%": {
      transform: "translate(-46px, -35px) scaleX(1.1)",
    },
    "57%": {
      transform: "translate(-70px, -37px) scaleX(1.1)",
    },
    "71%": {
      transform: "translate(-94px, -32px) scaleX(1.07)",
    },
    "85%": {
      transform: "translate(-111px, -22px) scaleX(1.05)",
    },
    "100%": {
      transform: "translate(-125px, -9px) scaleX(1)",
    },
  },
  "@keyframes loaderBar": {
    "0%": {
      boxShadow: "0 -6px, -122.9px -8px",
    },
    "25%, 75%": {
      boxShadow: "0 0px, -122.9px -8px",
    },
    "100%": {
      boxShadow: "0 0px, -122.9px -16px",
    },
  },
};

const Loader = () => {
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes loaderDot {
        0% { transform: translate(0px, 0px) scaleX(1); }
        14% { transform: translate(-12px, -16px) scaleX(1.05); }
        28% { transform: translate(-27px, -28px) scaleX(1.07); }
        42% { transform: translate(-46px, -35px) scaleX(1.1); }
        57% { transform: translate(-70px, -37px) scaleX(1.1); }
        71% { transform: translate(-94px, -32px) scaleX(1.07); }
        85% { transform: translate(-111px, -22px) scaleX(1.05); }
        100% { transform: translate(-125px, -9px) scaleX(1); }
      }
      @keyframes loaderBar {
        0% { box-shadow: 0 -6px, -122.9px -8px; }
        25%, 75% { box-shadow: 0 0px, -122.9px -8px; }
        100% { box-shadow: 0 0px, -122.9px -16px; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen dark:bg-[#0369a1]">
      <div className="relative inline-block">
        <span className="text-black text-5xl tracking-[4px] font-[Arial] dark:text-white">
          Load&nbsp;ng
          <span
            className="absolute right-[70px] bottom-[10px] h-7 w-[5.15px] bg-current"
            style={{ animation: "loaderBar 1s linear infinite alternate" }}
          ></span>
          <span
            className="absolute left-[125px] top-[2px] w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-black"
            style={{ animation: "loaderDot 1s linear infinite alternate" }}
          ></span>
        </span>
      </div>
    </div>
  );
};

export default Loader;
