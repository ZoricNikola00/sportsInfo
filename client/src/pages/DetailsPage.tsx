import {useEffect,useState} from 'react'
import { useParams, useNavigate, Link} from 'react-router-dom'
import { useGlobalContext } from '../context'

const DetailsPage = () => {
    const {id}=useParams()
    const {getPost,state}=useGlobalContext()

    useEffect(()=>{
        getPost(id)
    },[id])
  return (
    <div>{state.post?.title}</div>
  )
}

export default DetailsPage