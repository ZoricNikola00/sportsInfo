import { useLocation } from 'react-router-dom'
import {useEffect} from 'react'
import { useGlobalContext } from '../context';
import Form from '../components/Form';
import Posts from '../components/Posts';
import Pagination from '../components/Pagination';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const Home = () => {
  const query=useQuery()
  const page=query.get('page') || 1;
  const {setFormComponent,formComponent}=useGlobalContext()


  return (
    <div className='w-[90%] md:w-[70%] flex flex-col mx-auto my-4'>
      <button onClick={_=>setFormComponent(formComponent?false:true)} className='w-[200px] md:w-[300px] mx-auto cBtn'>
        {formComponent?'Back to the posts':'Create a post'}
      </button>
      {formComponent?
      <Form/>:
      <>
        <Posts/>
        <Pagination page={page}/>
      </>
      }
    </div>
  )
}

export default Home