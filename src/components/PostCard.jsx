import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="bg-slate-100 rounded-xl p-4 shadow-lg h-full flex flex-col cursor-pointer">
        <div className="h-48 md:h-60 w-full mb-4 overflow-hidden rounded-lg">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
        <h2 className="text-lg md:text-xl font-bold text-gray-800 line-clamp-2">
          {title}
        </h2>
      </div>
    </Link>
  );
}
