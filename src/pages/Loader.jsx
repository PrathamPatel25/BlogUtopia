import React from "react";
import "../style/Loader.css";

const Loader = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <span className="loader"></span>
      </div>
    </>
  );
};

export default Loader;
