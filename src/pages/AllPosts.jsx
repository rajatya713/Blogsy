import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import Postcard from "../components/Postcard";

function AllPosts() {
  const [loader, setLoader] = useState(true)
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoader(false)
    });
    
  }, []);

  return (loader ? <div className='flex space-x-2 justify-center items-center bg-[#f3e9dc] h-[516px]'>
    <span className='sr-only'>Loading...</span>
    <div className='h-8 w-8 bg-[#63543f] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
    <div className='h-8 w-8 bg-[#63543f] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
    <div className='h-8 w-8 bg-[#63543f] rounded-full animate-bounce'></div>
  </div> :
    <div className="w-full py-8 bg-[#F3E9DC] ">
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

export default AllPosts;
