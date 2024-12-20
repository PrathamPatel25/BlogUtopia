import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Profile() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.auth.userData);
  const userId = userData.$id;

  useEffect(() => {
    appwriteService.getPosts().then((response) => {
      if (response && response.documents) {
        const filteredPosts = response.documents.filter(
          (post) => post.userId === userId
        );
        setPosts(filteredPosts);
      }
      setLoading(false);
    });
  }, [userId]);

  return loading ? (
    <div className="w-full py-8 text-center dark:bg-[#0369a1] dark:text-white">
      <Container>
        <h1 className="text-2xl font-bold hover:text-gray-500">Loading...</h1>
      </Container>
    </div>
  ) : (
    <div className="w-full py-8 dark:bg-[#0369a1] dark:text-white">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 dark:bg-[#0369a1] dark:text-white">
          Your Posts
        </h1>
        <hr className="border-t-2 border-gray-300 mx-auto w-1/4" />
      </section>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.$id} {...post} />)
          ) : (
            <h1 className="text-3xl font-semibold text-gray-800 mb-4 dark:bg-[#0369a1] dark:text-white">
              No posts yet. Share your Post!
            </h1>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Profile;
