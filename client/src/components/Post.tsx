import React from 'react'
import { postDataType, useGlobalContext } from '../context'
import { Link } from 'react-router-dom'
import { FaEllipsisH, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import moment from 'moment'

const Post = ({_id,name,createdAt,file,info,likes,tags,title,creator}:postDataType) => {
    const {likePost,setFormComponent,setEditId}=useGlobalContext()
    const user=JSON.parse(localStorage.getItem('profile') ||'{}')
    const userId=user?.result?.googleId||user?.result?._id
    const userLikedPost=likes?.find(x=>x===userId)
  return (
    <div className='w-[300px] h-[430px] m-4 pb-2 rounded-lg overflow-hidden bg-slate-100 cShadow'>
        <div className='w-full h-[50%] relative'>
            <img className='w-full h-full object-cover' src={file}/>
            <div className='absolute top-2 w-full px-4 text-white z-20 text-xl flex justify-between items-center'>
                <Link to={`/creator/${name}`} className='hover:text-gray-300'>{name}</Link>
                {userId===creator && <FaEllipsisH onClick={_=>{setEditId(_id || '');setFormComponent(true)}}/>}
            </div>
            <p className='absolute top-10 px-4 text-white text-sm z-20'>{moment(createdAt).fromNow()}</p>
            <div className='absolute bg-black/60 top-0 left-0 w-full h-full'></div>
        </div>
        <div className='p-3 h-[50%] flex justify-between flex-col'>
            <div className='flex flex-wrap text-xs text-gray-700'>{tags?.map((tag,i)=><Link to={`/tags/${tag}`} className='mx-[1px] hover:text-gray-500 cursor-pointer' key={i}><span className='text-sm'>#</span>{tag}</Link>)}</div>
            <h1 className='text-xl'>{title}</h1>
            <p className='text-gray-600 my-2'>{info.slice(0,60)}...</p>
            <div className='flex w-full text-md items-center justify-between'>
                <div onClick={_=>likePost(_id,false)} className='flex cursor-pointer text-blue-400 items-center'>{!userLikedPost?<FaRegThumbsUp/>:<FaThumbsUp/>}<span className='ml-1 font-bold'>{likes?.length}</span></div>
                <Link to={`/posts/${_id}`} className="w-fit cBtn">Details</Link>
            </div>
        </div>
    </div>
  )
}

export default Post