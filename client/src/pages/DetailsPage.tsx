import {useEffect,useState} from 'react'
import { FaRegThumbsUp, FaThumbsUp, FaTrash } from 'react-icons/fa'
import { useParams, useNavigate, Link} from 'react-router-dom'
import { useGlobalContext } from '../context'

const DetailsPage = () => {
    const {id}=useParams()
    const {getPost,state,likePost}=useGlobalContext()
    const user=JSON.parse(localStorage.getItem('profile') || '{}') 
    const userId=user?.result?.googleId||user?.result?._id
    const userLikedPost=state.post?.likes?.find(x=>x===userId)    

    useEffect(()=>{
        getPost(id)
    },[id])
  return (
    <div className='w-[95%] md:w-[80%] mx-auto'>
        <div className='w-full rounded my-4 cShadow bg-slate-100 p-4 flex justify-between flex-col md:flex-row'>
            <img className='w-full md:w-[40%] rounde-lg object-cover' src={state.post?.file}/>
            <div className='w-full md:w-[50%]'>
                <h1 className='text-4xl'>{state.post?.title}</h1>
                <div className='flex items center my-2 text-gray-500'>{state.post?.tags?.map((tag,i)=><Link to={`/tags/${tag}`} className='mx-[1px] hover:text-gray-700' key={i}><span className='text-sm'>#</span>{tag}</Link>)}</div>
                <p className='text-lg my-2'>{state.post?.info}</p>
                <p className='text-lg italic text-gray-800 flex items-center'>Created by: <Link to={`/creator/${state.post?.name}`} className='hover:text-gray-600'>{state.post?.name}</Link></p>
                <div className='flex w-[95%] text-lg my-2 items-center justify-between'>
                    <div onClick={_=>likePost(id,true)} className='flex cursor-pointer text-blue-400 items-center'>{!userLikedPost?<FaRegThumbsUp/>:<FaThumbsUp/>}<span className='ml-1 font-bold'>{state.post?.likes?.length}</span></div>
                    {userId===state.post?.creator && <FaTrash className='text-red-500 cursor-pointer'/>}
                </div>
            </div>

        </div>
    </div>
  )
}

export default DetailsPage