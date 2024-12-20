import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "..";

export default function PostForm({ post }) {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, watch, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Loading State */}
      {loading ? (
        <div className="w-full py-8 text-center flex-grow dark:bg-[#0369a1] dark:text-white">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold ">Loading...</h1>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-wrap w-full flex-grow"
        >
          <div className="w-full sm:w-2/3 px-2 ">
            <Input
              label="Title :"
              placeholder="Title"
              className="mb-4"
              {...register("title", { required: true })}
            />
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
          <div className="w-full sm:w-1/3 px-2">
            <Input
              label="Featured Image :"
              type="file"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="w-full mb-4">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg w-full"
                />
              </div>
            )}
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              {...register("status", { required: true })}
            />
            <Button
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="w-full"
            >
              {post ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
