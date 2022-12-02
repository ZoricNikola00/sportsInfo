import { createContext,useContext,useReducer,useState,FC} from 'react'
import { reducer } from './reducer'
import * as api from './api/index'


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
type initialStateType={
    posts:postDataType[],
    post:postDataType |null,
    numberOfPages:number,
    currentPage:number,
    loading:boolean
}
const AppContext=createContext<{
    state:initialStateType,
    getPosts:(p:number|string)=>Promise<void>
}>({
    state:initialState,
    getPosts:async()=>{}
})

export const AppProvider:FC<any>=props=>{
    const [state,dispatch]=useReducer(reducer,initialState)

    const getPosts=async(currentPage:number|string)=>{
        try{
            dispatch({type:'START_LOADING'})
            const {data}=await api.getPosts(currentPage)
            dispatch({type:'GET_POSTS', payload:data})
            dispatch({type:"END_LOADING"})
        }catch(err){console.log(err);
        }
    }
    return <AppContext.Provider value={{state,getPosts}}>{props.children}</AppContext.Provider>
}

export const useGlobalContext=()=>{
    return useContext(AppContext)
}