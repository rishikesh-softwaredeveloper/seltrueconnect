const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_acct_address':
            return state=[...state,action.payload]
        case "clear_acct_address":
         return state =[]
        default:
            return state
    }   
}

export default reducer;