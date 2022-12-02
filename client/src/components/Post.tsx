import React from 'react'
import { postDataType } from '../context'
import { Link } from 'react-router-dom'
import { FaEllipsisH, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import moment from 'moment'

const Post = ({_id,name,createdAt,file,info,likes,tags,title}:postDataType) => {
    const userLikedPost=false
  return (
    <div className='w-[300px] h-[430px] m-4 pb-2 rounded-lg overflow-hidden bg-slate-100 cShadow'>
        <div className='w-full h-[50%] relative'>
            <img className='w-full h-full object-cover' src={file}/>
            <div className='absolute top-2 w-full px-4 text-white z-20 text-xl flex justify-between items-center'>
                <h1>Name</h1>
                <FaEllipsisH/>
            </div>
            <p className='absolute top-10 px-4 text-white text-sm z-20'>{moment(createdAt).fromNow()}</p>
            <div className='absolute bg-black/60 top-0 left-0 w-full h-full'></div>
        </div>
        <div className='p-3 h-[50%] flex justify-between flex-col'>
            <div className='flex flex-wrap text-xs text-gray-700'>{tags?.map((tag,i)=><p className='mx-[1px] hover:text-gray-500 cursor-pointer' key={i}><span className='text-sm'>#</span>{tag}</p>)}</div>
            <h1 className='text-xl'>{title}</h1>
            <p className='text-gray-600 my-2'>{info.slice(0,60)}...</p>
            <div className='flex w-full text-md items-center justify-between'>
                <div className='flex cursor-pointer text-blue-400 items-center'>{userLikedPost?<FaRegThumbsUp/>:<FaThumbsUp/>}<span className='ml-1 font-bold'>{likes?.length}</span></div>
                <Link to={`/posts/${_id}`} className="w-fit cBtn">Details</Link>
            </div>
        </div>
    </div>
  )
}

export default Post