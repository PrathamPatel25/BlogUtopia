import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg h-full flex flex-col cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:scale-105 hover:shadow-2xl border border-blue-200">
        {/* Image Container */}
        <div className="h-48 md:h-60 w-full mb-4 overflow-hidden rounded-xl">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
        {/* Title */}
        <h2 className="text-lg md:text-xl font-bold text-black dark:text-blue-900 line-clamp-2 text-center">
          {title}
        </h2>
      </div>
    </Link>
  );
}
