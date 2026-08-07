const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_seltruebox':
            return state=[...state,action.payload]
        case 'add_seltruebox':
            return [...state,action.payload];
        case "clear_seltruebox":
         return state =[]
        default:
            return state
    }   
}

export default reducer;