const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_order':
            return state=[...state,action.payload]
        case 'add_order':
            return [...state,action.payload];
        case "remove_order":
         return  state.filter(item=>item.bundle_id !== action.payload.bundle_id)
        case "clear_order":
         return state =[]
        default:
            return state
    }   
}

export default reducer;