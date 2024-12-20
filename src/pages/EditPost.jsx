import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const [post, setPost] = useState(null);
  const { postid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (postid) {
      appwriteService.getPost(postid).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [postid, navigate]);
  return post ? (
    <div className="py-8 dark:bg-[#0369a1] dark:text-white">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}
