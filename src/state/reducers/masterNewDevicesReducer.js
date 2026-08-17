const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_master_newdevices':
            return state=[...state,action.payload]
        case "clear_master_newdevices":
         return state =[]
        default:
            return state
    }   
}

export default reducer;