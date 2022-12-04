import {useState} from 'react'
import { FaTimes } from 'react-icons/fa'
type SrchType={
  setSearchModal:(p:boolean)=>void
}
const Search = ({setSearchModal}:SrchType) => {
  const [searchQuery,setSearchQuery]=useState({term:'',tags:[]})
  const [pTags,setpTags]=useState('')

  const handleSpace=(e:React.KeyboardEvent):any=>{
    if(e.keyCode===32){
      setSearchQuery((p:any)=>({...p,tags:[...p.tags,pTags]}))
        setpTags('')
    }
  }
  return (
    <form className='font-normal not-italic'>
      <h1 className='text-lg'>Search for particular post...</h1>
      <input value={searchQuery.term} className='cInput' placeholder='Search'/>
      <input value={pTags} className='cInput' placeholder='Tags...' onChange={e=>setpTags(e.target.value)} onKeyDown={handleSpace}/>
      <ul className='w-full flex flex-wrap'>{searchQuery?.tags?.map((x,i)=><li key={i} className='flex items-center m-[1px] w-fit p-1 rounded-xl border-2 border-blue-500 text-blue-500'><span onClick={()=>setSearchQuery(p=>({...p,tags:p.tags.filter((y,j)=>i!==j)}))} className='text-sm mr-1 cursor-pointer'><FaTimes/></span>{x}</li>)}</ul> 
    </form>
  )
}

export default Search