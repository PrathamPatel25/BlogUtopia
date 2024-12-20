import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 bg-gray-50">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Post Image */}
          <div className="w-full relative border border-gray-300 rounded-xl overflow-hidden mb-6 shadow-lg">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Author Name */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-600">
              Author: {post.userId || "Unknown"}
            </p>
            {isAuthor && (
              <div className="flex space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="hover:bg-green-600">
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  className="hover:bg-red-600"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Post Title */}
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
            {post.title}
          </h1>

          {/* Post Content */}
          <div className="prose prose-lg prose-gray">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null;
}
