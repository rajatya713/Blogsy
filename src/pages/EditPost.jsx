import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'


function EditPost() {
    const [posts, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post){
                    setPosts(post)
                }
            }).catch((error) => {
                console.error("Failed to fetch post:", error.message || error)
                navigate('/')
            })
        }
        else{
            navigate('/')
        }
    },[slug, navigate])
  return posts ? (
      <div className='py-8 bg-[#F3E9DC]'>
        <Container>
            <PostForm post={posts}/>
        </Container>
    </div>
  ) : <div className='flex space-x-2 justify-center items-center bg-[#f3e9dc] h-130'>
      <span className='sr-only'>Loading...</span>
      <div className='h-8 w-8 bg-[#63543f] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-8 w-8 bg-[#63543f] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-8 w-8 bg-[#63543f] rounded-full animate-bounce'></div>
  </div>
}

export default EditPost