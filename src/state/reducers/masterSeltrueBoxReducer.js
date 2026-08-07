const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_master_seltruebox':
            return state=[...state,action.payload]
        case "clear_master_seltruebox":
         return state =[]
        default:
            return state
    }   
}

export default reducer;