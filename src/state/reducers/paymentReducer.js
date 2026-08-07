const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_payment':
            return state=[...state,action.payload]
        case 'add_payment':
            return [...state,action.payload];
        case "remove_payment":
         return  state.filter(item=>item.bundle_id !== action.payload.bundle_id)
        case "clear_payment":
         return state =[]
        default:
            return state
    }   
}

export default reducer;