import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Link
      to={`/post/${$id}`}
      className="group w-full h-full transition-all duration-300"
    >
      <article className="relative flex flex-col h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-1">
        <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/10 transition-colors duration-300 z-10" />
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        <div className="flex flex-col flex-grow p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h2>

          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors duration-300">
                Read more
                <svg
                  className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
