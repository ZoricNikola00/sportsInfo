
export const reducer = (state:any,action:any)=>{
    switch(action.type){
        case 'GET_POSTS':
            return {...state}
        case "START_LOADING":
            return {...state, loading:true}
        case "END_LOADING":
            return {...state, loading:false}
        
    }
}