import {useEffect,useState} from 'react'
import { FaRegThumbsUp, FaThumbsUp, FaTrash } from 'react-icons/fa'
import { useParams, useNavigate, Link} from 'react-router-dom'
import { useGlobalContext } from '../context'
import { DotLoader } from 'react-spinners'
import CommentSection from '../components/CommentSection'

const DetailsPage = () => {
    const {id}=useParams()
    const {getPost,state,likePost,deletePost}=useGlobalContext()
    const [modalDelete,setModalDelete]=useState(false)
    const nav=useNavigate()
    const user=JSON.parse(localStorage.getItem('profile') || '{}') 
    const userId=user?.result?.googleId||user?.result?._id
    const userLikedPost=state.post?.likes?.find(x=>x===userId)    
    
    useEffect(()=>{
        getPost(id)
    },[id])
    if(state.loading){
        return <DotLoader color='rgb(59 130 246)' className=' w-full mx-auto my-24'>LOADING!!!!</DotLoader>
       }
  return (
    <div className='w-[95%] md:w-[80%] mx-auto'>
        {modalDelete && <div className='fixed flex justify-center items-center w-full h-full bg-black/60 top-0 left-0'>
                <div className='flex justify-center items-center flex-col fixed w-[400px] h-[210px] bg-white p-4 rounded'>
                    <h1 className='text-xl text-center font-bold'>Are you sure you want to delete this post?</h1>
                    <button onClick={_=>{deletePost(state.post?._id);nav('/')}} className='bg-red-500 hover:text-red-500 cBtn'>Yes</button>
                    <button onClick={_=>setModalDelete(false)} className='cBtn'>No</button>
                </div>
            </div>}
        <div className='w-full rounded my-4 cShadow bg-slate-100 p-4 flex justify-between flex-col md:flex-row'>
            <img className='w-full md:w-[40%] rounde-lg object-cover' src={state.post?.file}/>
            <div className='w-full md:w-[50%]'>
                <h1 className='text-4xl'>{state.post?.title}</h1>
                <div className='flex items center my-2 text-gray-500'>{state.post?.tags?.map((tag,i)=><Link to={`/tags/${tag}`} className='mx-[1px] hover:text-gray-700' key={i}><span className='text-sm'>#</span>{tag}</Link>)}</div>
                <p className='text-lg my-2'>{state.post?.info}</p>
                <p className='text-lg italic text-gray-800 flex items-center'>Created by: <Link to={`/creator/${state.post?.name}`} className='hover:text-gray-600'>{state.post?.name}</Link></p>
                <div className='flex w-[95%] text-lg my-2 items-center justify-between'>
                    <div onClick={_=>likePost(id,true)} className='flex cursor-pointer text-blue-400 items-center'>{!userLikedPost?<FaRegThumbsUp/>:<FaThumbsUp/>}<span className='ml-1 font-bold'>{state.post?.likes?.length}</span></div>
                    {userId===state.post?.creator && <FaTrash onClick={_=>setModalDelete(true)} className='text-red-500 cursor-pointer'/>}
                </div>
            </div>
            <CommentSection id={id} comments={state?.post?.comments}/>
        </div>
    </div>
  )
}

export default DetailsPage