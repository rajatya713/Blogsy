import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import RTE from "../RTE";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const [loader, setLoader] = useState(true)
  const [create, setCreate] = useState(false)

  const submit = async (data) => {
    setCreate(true)
    //edit post (update)
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
        setCreate(false)
        navigate(`/post/${dbPost.$id}`);
      }
    }
    //create new post
    else {
      // console.log(`Inside create new Post`);
      
      const file = await appwriteService.uploadFile(data.image[0]);
      // console.log(`File is created.`);
      
      if (file) {
        const fileId = file.$id;
        // console.log(`File is created`);
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        // console.log(`user id: ${userData.$id}`);
        
        if (dbPost) {
          setCreate(false)
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  // transform slug values like "dog image" to "dog-image"
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    const timeout = setTimeout(() => setLoader(false), 300);
    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout)
    }
      
  }, [watch, slugTransform, setValue]);
  
  useEffect(() => {
    if (post && post.title) {
      setValue("slug", slugTransform(post.title), { shouldValidate: true });
    }
  }, [post, setValue, slugTransform]);


  return (loader ? <div className='flex space-x-2 justify-center items-center bg-[#f3e9dc] h-130'>
    <span className='sr-only'>Loading...</span>
    <div className='h-8 w-8 bg-[#63543f] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
    <div className='h-8 w-8 bg-[#63543f] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
    <div className='h-8 w-8 bg-[#63543f] rounded-full animate-bounce'></div>
    </div> :
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title:"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug:"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image:"
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
              className="rounded-lg"
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
          disabled={create}
        >
          {create ? "Posting..." : post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
