import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import Grid from "../components/Grid"; // Import the Grid component

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
        <Loader />
      ) : post ? (
        <div className="py-8 dark:bg-transparent dark:text-white">
          <Container>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Main Post */}
              <div className="w-full md:w-2/3">
                <div className="relative border border-gray-300 rounded-xl overflow-hidden mb-6 shadow-lg">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-white">
                    Author: {post.userId || "Unknown"}
                  </p>
                  {isAuthor && (
                    <div className="flex space-x-2">
                      <Link to={`/edit-post/${post.$id}`}>
                        <Button
                          bgColor="bg-green-500"
                          className="hover:bg-green-600"
                        >
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
                <h1 className="text-3xl font-extrabold text-gray-800 mb-4 dark:text-white">
                  {post.title}
                </h1>
                <div className="prose prose-lg prose-gray">
                  {parse(post.content)}
                </div>
              </div>

              {/* Other Posts */}
              <div className="w-full md:w-1/3">
                <div className=" border border-gray-300 rounded-xl shadow-lg max-h-[80vh] overflow-y-scroll overflow-x-hidden scrollbar-hidden text-white dark:text-black">
                  {otherPosts && otherPosts.length > 0 ? (
                    otherPosts.map((otherPost, index) => (
                      <Link
                        key={index}
                        to={`/post/${otherPost.$id}`}
                        className="flex items-center space-x-4 p-4 border-b last:border-none hover:bg-slate-400 border-white dark:hover:bg-blue-400"
                      >
                        <img
                          src={appwriteService.getFilePreview(
                            otherPost.featuredImage
                          )}
                          alt={otherPost.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white overflow-hidden line-clamp-2 ">
                            {otherPost.title}
                          </h3>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-white text-center">
                      No other posts available.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </Grid>
  );
}
