const reducer = (state=0,action)=>{
    switch(action.type){
        case 'init_price':
            return state+=action.payload;
        case 'add_price':
            return state+action.payload;
        case "remove_price":
         return  state-action.payload;
        case "clear_price":
         return state =0;
        default:
            return state
    }   
}

export default reducer;