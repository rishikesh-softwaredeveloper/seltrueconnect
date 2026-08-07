const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_bundle':
            return state=[...state,action.payload]
        case 'add_bundle':
            return [...state,action.payload];
        case "clear_bundle":
         return state =[]
        default:
            return state
    }   
}

export default reducer;