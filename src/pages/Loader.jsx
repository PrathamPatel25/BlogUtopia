import React from "react";
import "../style/Loader.css"; // Assuming you still want to keep the custom CSS

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-[#0369a1]">
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
