const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_grades':
            return state=[...state,action.payload]
        case "clear_grades":
         return state =[];
        default:
            return state
    }   
}

export default reducer;