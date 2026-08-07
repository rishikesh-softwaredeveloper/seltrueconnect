const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_qrImage':
            return state=[...state,action.payload]
        case 'add_qrImage':
            return [...state,action.payload];
        case "clear_qrImage":
         return state =[]
        default:
            return state
    }   
}

export default reducer;