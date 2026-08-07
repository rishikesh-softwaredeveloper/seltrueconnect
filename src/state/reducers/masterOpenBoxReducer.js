const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_master_openbox':
            return state=[...state,action.payload]
        case "clear_master_openbox":
         return state =[]
        default:
            return state
    }   
}

export default reducer;