import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import Loader from "./Loader";
import Grid from "../components/Grid";

function Profile() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?.$id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    appwriteService.getUserPosts(userId).then((posts) => {
      if (posts?.documents) setPosts(posts.documents);
      setLoading(false);
    });
  }, [userId]);

  const filteredPosts = posts?.filter(
    (post) => activeFilter === "all" || post.status === activeFilter
  );

  const TabButton = ({ label, value, count }) => (
    <button
      onClick={() => setActiveFilter(value)}
      className={`px-4 py-2 text-sm sm:text-base rounded-lg font-medium transition-colors duration-200 ${
        activeFilter === value
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
    >
      {label} {count !== undefined && `(${count})`}
    </button>
  );

  if (loading) return <Loader />;

  const activePosts =
    posts?.filter((post) => post.status === "active").length || 0;
  const inactivePosts =
    posts?.filter((post) => post.status === "inactive").length || 0;

  return (
    <Grid>
      <div className="w-full px-4 sm:px-6 lg:px-8 mb-10">
        <section className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black dark:text-white mb-4">
            Your Posts
          </h1>
          <hr className="border-t-2 border-gray-300 mx-auto w-2/3 sm:w-1/2 lg:w-1/3 mb-6" />

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <TabButton label="All Posts" value="all" count={posts?.length} />
            <TabButton label="Active" value="active" count={activePosts} />
            <TabButton
              label="Inactive"
              value="inactive"
              count={inactivePosts}
            />
          </div>
        </section>

        <Container>
          {filteredPosts && filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map((post) => (
                <div key={post.$id} className="relative">
                  <div
                    className={`absolute top-2 right-2 z-10 px-2 py-1 rounded-full text-sm font-medium ${
                      post.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                    }`}
                  >
                    {post.status === "active" ? "Active" : "Inactive"}
                  </div>
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black dark:text-white">
                {posts?.length > 0
                  ? `No ${activeFilter} posts found`
                  : "No posts yet. Share your Post!"}
              </h1>
            </div>
          )}
        </Container>
      </div>
    </Grid>
  );
}

export default Profile;
