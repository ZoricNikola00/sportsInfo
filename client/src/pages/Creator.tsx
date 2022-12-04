import {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Post from '../components/Post';
import { postDataType, useGlobalContext } from '../context';
import { DotLoader } from 'react-spinners'

const Creator = () => {
    const {name}=useParams()
    const {getPostsOfCreator,state}=useGlobalContext()

    useEffect(()=>{
        getPostsOfCreator(name)
    },[])
    if(state.loading){
        return <DotLoader color='rgb(59 130 246)' className=' w-full mx-auto my-24'>LOADING!!!!</DotLoader>
       }
  return (
    <div className='w-[90%] md:w-[70%] flex flex-wrap items-center justify-center mx-auto my-4'>
        {state.posts?.map((post:postDataType)=><Post key={post._id} {...post}/>)}
    </div>
  )
}

export default Creator