import React from 'react'
import { postDataType, useGlobalContext } from '../context'
import Post from './Post'
import { DotLoader } from 'react-spinners'

const Posts = () => {
    const {state}=useGlobalContext()

    if(state?.loading){
      return <DotLoader color='rgb(59 130 246)' className=' w-full mx-auto my-24'>LOADING!!!!</DotLoader>
     }
  return (
    <div className='flex flex-wrap my-4 justify-evenly w-full'>
        {state?.posts?.map((post:postDataType)=>{
            return <Post key={post._id} {...post}/>
        })}
    </div>
  )
}

export default Posts