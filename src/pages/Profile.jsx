// Profile.jsx
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import Loader from "./Loader";
import Grid from "../components/Grid";

function Profile() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?.$id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    appwriteService.getPosts().then((posts) => {
      if (posts?.documents) {
        const filteredPosts = posts.documents.filter(
          (post) => post.userId === userId
        );
        setPosts(filteredPosts);
      }
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <Loader />;

  return (
    <Grid>
      <div>
        <section className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black dark:text-white mb-4">
            Your Posts
          </h1>
          <hr className="border-t-2 border-gray-300 mx-auto w-1/3 sm:w-1/4 lg:w-1/5" />
        </section>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts && posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.$id} {...post} />)
            ) : (
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black dark:text-white mt-6 text-center">
                No posts yet. Share your Post!
              </h1>
            )}
          </div>
        </Container>
      </div>
    </Grid>
  );
}

export default Profile;
