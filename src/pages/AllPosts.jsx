import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

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

  return loading ? (
    <div className="w-full py-8 text-center dark:bg-[#0369a1] dark:text-white">
      <Container>
        <h1 className="text-2xl font-bold">Loading...</h1>
      </Container>
    </div>
  ) : (
    <div className="w-full py-8 dark:bg-[#0369a1] dark:text-white">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}
