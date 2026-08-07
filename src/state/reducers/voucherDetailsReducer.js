const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_voucherDetails':
            return state=[...state,action.payload]
        case 'add_voucherDetails':
            return [...state,action.payload];
        case "clear_voucherDetails":
         return state =[]
        default:
            return state
    }   
}

export default reducer;