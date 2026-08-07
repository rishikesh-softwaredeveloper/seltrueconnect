const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_acct_mobile':
            return state=[...state,action.payload]
        case "clear_acct_mobile":
         return state =[]
        default:
            return state
    }   
}

export default reducer;