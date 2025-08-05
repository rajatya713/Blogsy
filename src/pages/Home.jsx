import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import Postcard from "../components/Postcard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    appwriteService.getPosts().then((post) => {
      if (post) {
        setPosts(post.documents);
      }
      setLoading(false)
    });
  }, []);
  if (loading) {
    return (
    <div className='flex space-x-2 justify-center items-center bg-[#f3e9dc] h-[516px]'>
      <span className='sr-only'>Loading...</span>
      <div className='h-8 w-8 bg-[#63543f] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-8 w-8 bg-[#63543f] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-8 w-8 bg-[#63543f] rounded-full animate-bounce'></div>
    </div> )
  }
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 text-center bg-[#F3E9DC]">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read Posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8 bg-[#F3E9DC]">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
