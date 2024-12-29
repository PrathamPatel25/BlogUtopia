import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../pages/Loader";
import Grid from "../Grid";

export default function PostForm({ post }) {
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(
    post ? appwriteService.getFilePreview(post.featuredImage) : null
  );

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = async (data) => {
    try {
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
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <Grid>
      <div className="min-h-screen py-6 sm:py-8 px-0 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loader />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {post ? "Edit Post" : "Create New Post"}
              </h2>

              <form onSubmit={handleSubmit(submit)} className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Main Content Section */}
                  <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                      <Input
                        label="Title"
                        placeholder="Enter your post title"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        {...register("title", { required: true })}
                      />
                    </div>

                    <div className="space-y-2">
                      <RTE
                        label="Content"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                      />
                    </div>
                  </div>

                  {/* Sidebar Section */}
                  <div className="w-full lg:w-80 space-y-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="group relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-500 transition-colors">
                          <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                            onChange={handleImageChange}
                          />

                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="text-center py-8">
                              <div className="text-gray-500 dark:text-gray-400">
                                <span className="block">
                                  Drop image here or
                                </span>
                                <span className="text-blue-500">browse</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        {...register("status", { required: true })}
                      />

                      <Button
                        type="submit"
                        className={`w-full px-6 py-3 text-white rounded-lg transition-colors ${
                          post
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                      >
                        {post ? "Update Post" : "Publish Post"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Grid>
  );
}
