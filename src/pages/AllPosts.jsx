import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import Loader from "./Loader";
import Grid from "../components/Grid";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <Grid>
      <div className="py-8 sm:py-12">
        <Container>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                All Posts
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Explore our collection of articles and stories
              </p>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No posts available yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {posts.map((post) => (
                  <div key={post.$id} className="flex">
                    <PostCard {...post} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </Grid>
  );
}
