const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_bankAccounts':
            return state=[...state,action.payload]
        case 'add_bankAccounts':
            return [...state,action.payload];
        case "clear_bankAccounts":
         return state =[]
        default:
            return state
    }   
}

export default reducer;