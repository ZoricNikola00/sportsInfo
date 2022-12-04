import {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Post from '../components/Post';
import { postDataType, useGlobalContext } from '../context';

const Creator = () => {
    const {name}=useParams()
    const {getPostsOfCreator,state}=useGlobalContext()

    useEffect(()=>{
        getPostsOfCreator(name)
    },[])
  return (
    <div className='w-[90%] md:w-[70%] flex flex-wrap items-center justify-center mx-auto my-4'>
        {state.posts?.map((post:postDataType)=><Post key={post._id} {...post}/>)}
    </div>
  )
}

export default Creator