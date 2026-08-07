const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_salesPersonList':
            return state=[...state,action.payload]
        case 'add_salesPersonList':
            return [...state,action.payload];
        case "clear_salesPersonList":
         return state =[]
        default:
            return state
    }   
}

export default reducer;