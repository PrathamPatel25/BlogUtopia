import React from "react";

export default function Logo({ width = "100px", className = "" }) {
  return (
    <div
      className={`text-2xl font-bold text-blue-600 hover:text-blue-800 transition-all duration-300 ${className}`}
      style={{ width }}
    >
      Blog<span className="text-gray-800">Utopia</span>
    </div>
  );
}
