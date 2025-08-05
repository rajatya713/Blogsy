import React from 'react'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'
function AddPost() {
  return (
    <div className='py-8 bg-[#F3E9DC]'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost