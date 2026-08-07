const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_brands':
            return state=[...state,action.payload]
        case "clear_brands":
         return state =[];
        default:
            return state
    }   
}

export default reducer;