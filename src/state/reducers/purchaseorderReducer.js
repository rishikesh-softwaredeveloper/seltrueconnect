const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_purchaseorder':
            return state=[...state,action.payload]
        case 'add_purchaseorder':
            return [...state,action.payload];
        case "remove_purchaseorder":
         return  state.filter(item=>item.bundle_id !== action.payload.bundle_id)
        case "clear_purchaseorder":
         return state =[]
        default:
            return state
    }   
}

export default reducer;