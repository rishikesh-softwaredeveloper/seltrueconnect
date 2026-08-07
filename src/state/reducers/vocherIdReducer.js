const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_vocher_id':
            return state=[...state,action.payload]
        case "clear_vocher_id":
         return state =[]
        default:
            return state
    }   
}

export default reducer;