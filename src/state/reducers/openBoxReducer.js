const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_openbox':
            return state=[...state,action.payload]
        case 'add_openbox':
            return [...state,action.payload];
        case "clear_openbox":
         return state = []
        default:
            return state
    }   
}

export default reducer;