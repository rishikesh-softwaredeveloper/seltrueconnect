const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_vendorList':
            return state=[...state,action.payload]
        case 'add_vendorList':
            return [...state,action.payload];
        case "clear_vendorList":
         return state =[]
        default:
            return state
    }   
}

export default reducer;