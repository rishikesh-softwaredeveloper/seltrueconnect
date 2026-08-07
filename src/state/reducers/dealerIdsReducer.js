const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_dealerIds':
            return [...state,action.payload];
        case "remove_dealerIds":
            return  state.filter(item=>item !== action.payload)
        case "clear_dealerIds":
            return state = [];
        default:
            return state
    }   
}

export default reducer;