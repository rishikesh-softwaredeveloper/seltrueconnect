const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_token':
            return state=[...state,action.payload]
        case "clear_token":
         return state =[]
        default:
            return state
    }   
}

export default reducer;