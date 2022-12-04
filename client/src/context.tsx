import { createContext,useContext,useReducer,useState,FC} from 'react'
import { reducer } from './reducer'
import * as api from './api/index'
import { useNavigate } from 'react-router-dom'


const initialState={
    posts:[],
    post:null,
    numberOfPages:0,
    currentPage:0,
    loading:false,
    auth:null
}
export type SearchData={
    term:string,
    tags:string
}
export type postDataType={
    _id?:string,
    title:string,
    info:string,
    tags:string[],
    file:string,
    likes?:string[],
    name?:string,
    comments?:string[],
    createdAt?:string,
    auth?:any,
    creator?:string
}
export type userData={
    firstName:string,
    lastName:string,
    password:string,
    confirmPassword:string,
    email:string
}
type initialStateType={
    posts:postDataType[],
    post:postDataType |null,
    numberOfPages:number,
    currentPage:number,
    loading:boolean
}
const AppContext=createContext<{
    state:initialStateType,
    getPosts:(p:number|string)=>Promise<void>,
    formComponent:boolean,
    setFormComponent:(p:boolean)=>void,
    addPost:(d:postDataType)=>Promise<void>,
    signIn:(d:userData)=>Promise<void>,
    signUp:(d:userData)=>Promise<void>,
    signOut:()=>void,
    googleSuccess:(r:any)=>Promise<void>,
    dispatch:any,
    searchPost:(d:SearchData)=>Promise<void>,
    getPostsOfCreator:(c:string|undefined)=>Promise<void>,
    getPost:(i:string|undefined)=>Promise<void>,
    likePost:(i:string|undefined,s:boolean)=>Promise<void>,
    deletePost:(i:string|undefined)=>Promise<void>,
    editPost:(i:string|undefined, d:postDataType)=>Promise<void>,
    editId:string,
    setEditId:React.Dispatch<React.SetStateAction<(string)>>,
    commentPost:(i:string|undefined, c:string)=>Promise<void>,

}>({
    state:initialState,
    getPosts:async()=>{},
    formComponent:false,
    setFormComponent:()=>{},
    addPost:async()=>{},
    signIn:async()=>{},
    signUp:async()=>{},
    signOut:()=>{},
    googleSuccess:async()=>{},
    dispatch:()=>{},
    searchPost:async()=>{},
    getPostsOfCreator:async()=>{},
    getPost:async()=>{},
    likePost:async()=>{},
    deletePost:async()=>{},
    editPost:async()=>{},
    editId:'',
    setEditId:()=>{},
    commentPost:async()=>{}
})

export const AppProvider:FC<any>=props=>{
    const [state,dispatch]=useReducer(reducer,initialState)
    const [formComponent,setFormComponent]=useState(false)
    const [editId,setEditId]=useState('')
    const nav=useNavigate()

    const getPosts=async(currentPage:number|string)=>{
        try{
            dispatch({type:'START_LOADING'})
            const {data}=await api.getPosts(currentPage)
            dispatch({type:'GET_POSTS', payload:data})
            dispatch({type:"END_LOADING"})
        }catch(err){console.log(err);
        }
    }
    const getPost=async(id:string|undefined)=>{
        try{
            dispatch({type:'START_LOADING'})
            const {data}=await api.getPost(id)
            dispatch({type:"GET_POST",payload:data})
            dispatch({type:"END_LOADING"})

        }catch(err){console.log(err);
        }
    }
    const getPostsOfCreator=async(creator:string|undefined)=>{
        try{
            dispatch({type:'START_LOADING'})
            const {data}=await api.searchCreator(creator)
            dispatch({type:"SEARCH", payload:data})
            dispatch({type:"END_LOADING"})
        }catch(err){console.log(err);
        }
    }
    const addPost=async(newData:postDataType)=>{
        try{
            dispatch({type:'START_LOADING'})
            const {data}=await api.addPost(newData)
            dispatch({type:"ADD_POST",payload:data})
            dispatch({type:"END_LOADING"})
            
        }catch(err){console.log(err);
        }
    }
    const searchPost=async(searchData:SearchData)=>{
        try{
            dispatch({type:'START_LOADING'})
            const {data}=await api.searchPosts(searchData)            
            dispatch({type:'SEARCH',payload:data})
            dispatch({type:"END_LOADING"})
        }catch(err){console.log(err)
        }
    }
    const likePost=async(id:string|undefined,single:boolean)=>{
        try{
            const {data}=await api.likePost(id)
            dispatch({type:'LIKE',payload:data,single:single})
        }catch(err){console.log(err);
        }
    }
    const deletePost=async(id:string|undefined)=>{
        try{
            await api.deletePost(id)
            dispatch({type:'DELETE',payload:id})
        }catch(err){console.log(err);
        }
    }
    const editPost=async(id:string|undefined,editedData:postDataType)=>{
        try{
            const{data}=await api.editPost(id,editedData)
            dispatch({type:"EDIT", payload:data})
            setFormComponent(false)
        }catch(err){console.log(err);
        }
    }
    const commentPost=async(id:string|undefined,comment:string)=>{
        try{
            const {data}=await api.commentPost(id,comment)
            dispatch({type:"COMMENT",payload:data})
        }catch(err){console.log(err);
        }
    }
    const signIn=async(userData:userData)=>{
        try{
            const {data}=await api.signIn(userData)
            dispatch({type:"AUTH", payload:data})
            nav('/')
        }catch(err){console.log(err);
        }
    }
    const signUp=async(userData:userData)=>{
        try{
            const {data}=await api.signUp(userData)
            dispatch({type:"AUTH", payload:data})
            nav('/')
            
        }catch(err){console.log(err);
        }
    }
    const googleSuccess=async(res:any)=>{
        const result=res?.profileObj;
        const token=res?.tokenId
        try{
          dispatch({type:'AUTH', payload:{token,result}})
          nav('/')
        }catch(err){console.log(err);
        }
      }
    const signOut=()=>{
        dispatch({type:'SIGN_OUT'})
    }
    return <AppContext.Provider value={{commentPost,editId,setEditId,editPost,likePost,deletePost,getPost,getPostsOfCreator,searchPost,dispatch,signOut,googleSuccess,signIn,signUp,addPost,formComponent,setFormComponent,state,getPosts}}>{props.children}</AppContext.Provider>
}

export const useGlobalContext=()=>{
    return useContext(AppContext)
}