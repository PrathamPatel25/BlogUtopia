import React from "react";

export default function LeftSide() {
  return (
    <div className="w-full h-auto sm:h-auto md:h-[700px] lg:h-[800px] mt-10 flex flex-col justify-center p-6 text-left dark:text-white bg-gradient-to-r from-blue-50 via-gray-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg shadow-lg md:ml-10 md:mr-0 ml-5 mr-5">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-blue-500 dark:bg-blue-700 rounded-full flex justify-center items-center text-white mr-4">
          <span className="text-lg font-bold">BU</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
          Welcome to BlogUtopia
        </h2>
      </div>
      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6">
        BlogUtopia is your ultimate platform for creating, managing, and
        exploring blog posts. Our intuitive interface and powerful tools make it
        easy to share your thoughts with the world.
      </p>
    </div>
  );
}
