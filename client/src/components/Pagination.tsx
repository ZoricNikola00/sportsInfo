import {useEffect} from 'react'
import { useGlobalContext } from '../context'
import { useNavigate } from 'react-router-dom'

type data={
    page:string|number
}

const Pagination = ({page}:data) => {
    const {state,getPosts,dispatch}=useGlobalContext()
    const nav=useNavigate()
    const pages=[]
    for(let i=1;i<=state?.numberOfPages;i++){
        pages.push(i)
    }
    useEffect(()=>{
        getPosts(page)
    },[dispatch,page])

  return (
    <div className='w-[80%] mx-auto rounded my-4 cShadow flex justify-center p-4'>
        {pages.map((page,i)=><div onClick={_=>nav(`/posts?page=${page}`)} key={i} className={`border-2 mx-1 cursor-pointer transition-all border-blue-500 ${state.currentPage===page?'text-white bg-blue-500':'text-blue-500'} py-1 px-2 rounded`}>
            {page}
        </div>)}
    </div>
  )
}

export default Pagination