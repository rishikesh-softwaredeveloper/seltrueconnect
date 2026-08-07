const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_types':
            return state=[...state,action.payload]
        case "clear_types":
         return state =[];
        default:
            return state
    }   
}

export default reducer;