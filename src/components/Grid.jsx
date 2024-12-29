import React from "react";
import gridImage from "../img/grid.jpg";

const Grid = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed inset-0">
        <div className="h-full w-full">
          <img
            src={gridImage}
            alt="Background"
            className="h-full w-full object-cover object-center"
            style={{ minHeight: "100vh", minWidth: "100vw" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white to-white dark:from-slate-900/85 dark:to-slate-900/95" />
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default Grid;
