import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    <section class="bg-white dark:bg-[#0369a1]">
      <div class="px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
          <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-[#1d4ed8] dark:text-white">
            404
          </h1>
          <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4x dark:text-white">
            Something's missing.
          </p>
          <p class="mb-4 text-lg font-light text-gray-500 dark:text-white">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <button
            onClick={handleClick}
            class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4 bg-[#1d4ed8] dark:bg-slate-400"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
