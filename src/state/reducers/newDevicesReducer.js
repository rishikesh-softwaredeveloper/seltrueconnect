const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_newdevices':
            return state=[...state,action.payload]
        case 'add_newdevices':
            return [...state,action.payload];
        case "clear_newdevices":
         return state = []
        default:
            return state
    }   
}

export default reducer;