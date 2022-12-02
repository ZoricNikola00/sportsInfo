
export const reducer = (state:any,action:any)=>{
    switch(action.type){
        case 'GET_POSTS':
            return {...state, posts:action.payload.data, numberOfPages:action.payload.numberOfPages, currentPage:action.payload.page}
        case "START_LOADING":
            return {...state, loading:true}
        case "END_LOADING":
            return {...state, loading:false}
        case "ADD_POST":
            return {...state, posts:[...state.posts,action.payload]}
    }
}