import { useLocation } from 'react-router-dom'
import {useEffect} from 'react'
import { useGlobalContext } from '../context';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const Home = () => {
  const query=useQuery()
  const page=query.get('page') || 1;
  const {getPosts,state}=useGlobalContext()
  useEffect(()=>{
    getPosts(page)
    console.log(state);
    
  },[])
  return (
    <div>Home</div>
  )
}

export default Home