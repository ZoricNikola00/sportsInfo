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
})

export const AppProvider:FC<any>=props=>{
    const [state,dispatch]=useReducer(reducer,initialState)
    const [formComponent,setFormComponent]=useState(false)
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

    const addPost=async(newData:postDataType)=>{
        try{
            dispatch({type:'START_LOADING'})
            const {data}=await api.addPost(newData)
            dispatch({type:"ADD_POST",payload:data})
            dispatch({type:"END_LOADING"})
            
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
    return <AppContext.Provider value={{signOut,googleSuccess,signIn,signUp,addPost,formComponent,setFormComponent,state,getPosts}}>{props.children}</AppContext.Provider>
}

export const useGlobalContext=()=>{
    return useContext(AppContext)
}