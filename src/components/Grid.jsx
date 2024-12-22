import React from "react";
import gridImage from "../img/grid.jpg";

const Grid = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Grid Background */}
      <div className="fixed inset-0">
        <div className="h-full w-full">
          <img
            src={gridImage}
            alt="Background"
            className="h-full w-full object-cover object-center"
            style={{ minHeight: "100vh", minWidth: "100vw" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-300/90 to-slate-600/95 dark:from-blue-500/80 dark:to-blue-900/95" />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full pt-16">{children}</div>
      {/* Added 'pt-16' to ensure content is pushed below the header */}
    </div>
  );
};

export default Grid;
