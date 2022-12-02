import React, {useState,useEffect} from 'react'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import FileBase from 'react-file-base64'

const Form = () => {
  const [formInfo,setFormInfo]=useState({title:'', info:'', tags:[],file:''})
  const {setFormComponent}=useGlobalContext()
  const [pTags,setpTags]=useState('')

  const user=true
  const handleSpace=(e:React.KeyboardEvent):any=>{
    if(e.keyCode===32){
        setFormInfo((p:any)=>({...p,tags:[...p.tags,pTags]}))
        setpTags('')
    }
  }
  const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault()
  }
  if(!user){
    return <div className='bg-slate-100 rounded mx-auto text-center my-4 cShadow p-4'>
        <h1 className='text-lg my-2'>Log In To Create a Info</h1>
        <Link to='/signIn' className='cBtn ' onClick={_=>setFormComponent(false)}>Sign In</Link>
    </div>
  }
  return (
    <form onSubmit={handleSubmit} className='w-[90%] md:w-[700px] bg-slate-100 ronded text-center mx-auto my-4 cShadow p-4 overflow-hidden'>
        <h1 className='text-lg'>Create Sport Info</h1>
        <input value={formInfo.title} className='cInput' onChange={(e)=>setFormInfo(p=>({...p,title:e.target.value}))} placeholder='Title'/>
        <textarea value={formInfo.info} className='h-[250px] cInput' onChange={(e)=>setFormInfo(p=>({...p, info:e.target.value}))} placeholder='Info'/>
        <input className='cInput' value={pTags} onChange={(e)=>setpTags(e.target.value)} onKeyDown={handleSpace} placeholder='Tags...'/>
        <ul className='w-full flex flex-wrap'>{formInfo?.tags?.map((x,i)=><li key={i} className='flex items-center m-[1px] w-fit p-1 rounded-xl border-2 border-blue-500 text-blue-500'><span onClick={()=>setFormInfo(p=>({...p,tags:p.tags.filter((y,j)=>i!==j)}))} className='text-sm mr-1 cursor-pointer'><FaTimes/></span>{x}</li>)}</ul> 
        <div className='my-2 w-full'>
            <FileBase
                type='file'
                multiple={false}
                onDone={({base64}:any)=>setFormInfo(p=>({...p,file:base64}))}
            />
        </div>
        <button type='submit' className='cBtn'>Submit</button>
        <button type='button' onClick={_=>{setFormInfo({title:'',info:'',tags:[],file:''});setpTags('')}} className='bg-red-500 hover:text-red-500 cBtn'>Clear</button>
    </form>
  )
}

export default Form