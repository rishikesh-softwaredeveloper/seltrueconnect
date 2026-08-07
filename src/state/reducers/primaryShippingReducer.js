const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_primary_shipping':
            return state=[...state,action.payload]
        case "clear_primary_shipping":
         return state =[]
        default:
            return state
    }   
}

export default reducer;