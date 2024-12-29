import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import Grid from "../components/Grid";

export default function Post() {
  const [post, setPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { postid } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (postid) {
      appwriteService.getPost(postid).then((post) => {
        if (post) {
          setPost(post);
        } else navigate("/");
      });

      appwriteService.getOtherPosts(postid).then((posts) => {
        setOtherPosts(posts.documents);
        setLoading(false);
      });
    } else navigate("/");
  }, [postid, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/all-posts");
      }
    });
  };

  return (
    <Grid>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      ) : post ? (
        <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen py-4 sm:py-8 dark:text-white transition-colors duration-300">
          <Container>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
              {/* Main Post Content */}
              <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
                {/* Featured Image and Title */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl transition-transform hover:scale-[1.01] duration-300">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-48 sm:h-64 md:h-[400px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                      {post.title}
                    </h1>
                  </div>
                </div>

                {/* Author Info and Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 sm:py-4 border-b dark:border-gray-700 gap-4 sm:gap-0">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {post.userId?.charAt(0) || "A"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium dark:text-gray-300">
                        {post.userId || "Unknown"}
                      </p>
                    </div>
                  </div>

                  {isAuthor && (
                    <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
                      <Link
                        to={`/edit-post/${post.$id}`}
                        className="flex-1 sm:flex-none"
                      >
                        <Button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={deletePost}
                        className="flex-1 sm:flex-none w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none px-1 sm:px-0">
                  {parse(post.content)}
                </div>
              </div>

              {/* Other Posts Sidebar */}
              <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
                <div className="lg:sticky lg:top-4">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 dark:text-gray-200 px-1 sm:px-0">
                    More Posts
                  </h2>
                  <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                    <div className="divide-y dark:divide-gray-700 max-h-[400px] sm:max-h-[600px] lg:max-h-[800px] overflow-y-auto">
                      {otherPosts && otherPosts.length > 0 ? (
                        otherPosts.map((otherPost, index) => (
                          <Link
                            key={index}
                            to={`/post/${otherPost.$id}`}
                            className="block group"
                          >
                            <div className="p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                              <div className="flex gap-3 sm:gap-4">
                                <img
                                  src={appwriteService.getFilePreview(
                                    otherPost.featuredImage
                                  )}
                                  alt={otherPost.title}
                                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="flex-1">
                                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                                    {otherPost.title}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-4 sm:p-6 text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                          No other posts available.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </Grid>
  );
}
