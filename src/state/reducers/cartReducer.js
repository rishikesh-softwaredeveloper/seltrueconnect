const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_item':
            return state=[...state,action.payload]
        case 'add_item':
            return [...state,action.payload];
        case "remove_item":
         return  state.filter(item=>item.bundle_id !== action.payload.bundle_id)
        case "remove_openbox_item":
         return  state.filter(item=>item.grnreport_id !== action.payload.grnreport_id)
        case "clear_cart":
         return state =[]
        default:
            return state
    }   
}

export default reducer;