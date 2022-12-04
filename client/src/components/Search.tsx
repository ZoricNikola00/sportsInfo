import {useState} from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../context'
import { useNavigate } from 'react-router-dom'

type SrchType={
  setSearchModal:(p:boolean)=>void
}
const Search = ({setSearchModal}:SrchType) => {
  const [searchQuery,setSearchQuery]=useState({term:'',tags:[]})
  const [pTags,setpTags]=useState('')
  const {searchPost}=useGlobalContext()
  const nav=useNavigate()
  const handleSpace=(e:React.KeyboardEvent):any=>{
    if(e.keyCode===32){
      setSearchQuery((p:any)=>({...p,tags:[...p.tags,pTags]}))
        setpTags('')
    }
  }

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    searchPost({...searchQuery,tags:searchQuery.tags.join('').trim()})
    nav(`/posts/search?searchQuery=${searchQuery.term || 'none'}&tags=${searchQuery.tags}`)
    setpTags('')
    setSearchModal(false)
  }

  return (
    <form onSubmit={handleSubmit} className='font-normal not-italic'>
      <h1 className='text-lg'>Search for particular post...</h1>
      <input onChange={e=>setSearchQuery(p=>({...p,term:e.target.value}))} value={searchQuery.term} className='cInput' placeholder='Search'/>
      <input value={pTags} className='cInput' placeholder='Tags...' onChange={e=>setpTags(e.target.value)} onKeyDown={handleSpace}/>
      <ul className='w-full flex flex-wrap'>{searchQuery?.tags?.map((x,i)=><li key={i} className='flex items-center m-[1px] w-fit p-1 rounded-xl border-2 border-blue-500 text-blue-500'><span onClick={()=>setSearchQuery(p=>({...p,tags:p.tags.filter((y,j)=>i!==j)}))} className='text-sm mr-1 cursor-pointer'><FaTimes/></span>{x}</li>)}</ul> 
      <button type='submit' className='cBtn'>Search</button>
    </form>
  )
}

export default Search