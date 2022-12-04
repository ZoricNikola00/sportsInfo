import {useState} from 'react'
type CommentType={
    id:string|undefined,
    comments:string[] | undefined
}
const CommentSection = ({id,comments}:CommentType) => {
    const [comment,setComment]=useState('')
    const user=JSON.parse(localStorage.getItem('profile') || '{}') 

    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault()

    }
  return (
    <div className='w-full rounded my-4 flex justify-between cShadow bg-slate-100 p-4'>
        <div className='w-[59%] h-[300px] p-2 overflow-y-scroll'>
            <h1 className='text-lg text-gray-600 '>Comments: </h1>
            <div className='p-3 cSHadow bg-white rounded '>
              {comments?.map((x,i)=>{
                const comment=x.split(':')
                return <div key={i}><span className='text-gray-800 italic'>{comment[0]}</span> : <span className='text-lg'>{comment[1]}</span></div>
              })}
            </div>
        </div>
        <form onSubmit={handleSubmit} className='w-[39%]'>
            <textarea value={comment} onChange={(e)=>setComment(e.target.value)} className='cInput h-[60%]' placeholder='Leave comment here...'/>
            <button type='submit' className='cBtn'>Submit Comment</button>
        </form>
    </div>
  )
}

export default CommentSection