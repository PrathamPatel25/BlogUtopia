import React from "react";
import { Container, PostForm } from "../components";

export default function AddPost() {
  return (
    <div className="py-8 dark:bg-[#0369a1] dark:text-white">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}
