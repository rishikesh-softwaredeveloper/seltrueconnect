const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_soldorder':
            return state=[...state,action.payload]
        case 'add_soldorder':
            return [...state,action.payload];
        case "remove_soldorder":
         return  state.filter(item=>item.bundle_id !== action.payload.bundle_id)
        case "clear_soldorder":
         return state =[]
        default:
            return state
    }   
}

export default reducer;