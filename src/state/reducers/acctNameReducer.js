const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_acct_name':
            return state=[...state,action.payload]
        case "clear_acct_name":
         return state =[]
        default:
            return state
    }   
}

export default reducer;