import React from 'react'
import { postDataType, useGlobalContext } from '../context'
import Post from './Post'

const Posts = () => {
    const {state}=useGlobalContext()

  return (
    <div className='flex flex-wrap my-4 justify-evenly w-full'>
        {state.posts?.map((post:postDataType)=>{
            return <Post key={post._id} {...post}/>
        })}
    </div>
  )
}

export default Posts