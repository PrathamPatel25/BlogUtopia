import React from "react";
import { Container, PostForm } from "../components";

export default function AddPost() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}
