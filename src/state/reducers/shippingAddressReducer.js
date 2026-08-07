const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_shipping_address':
            return state=[...state,action.payload]
        case 'add_shipping_address':
            return [...state,action.payload];
        case "clear_shipping_address":
         return state =[]
        default:
            return state
    }   
}

export default reducer;