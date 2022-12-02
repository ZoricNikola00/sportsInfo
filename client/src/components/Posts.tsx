import React from 'react'
import { postDataType, useGlobalContext } from '../context'

const Posts = () => {
    const {state}=useGlobalContext()

  return (
    <div className='flex flex-wrap my-4 justify-evenly w-full'>
        {state.posts?.map((post:postDataType)=>{
            return <div key={post._id}>{post.title}</div>
        })}
    </div>
  )
}

export default Posts