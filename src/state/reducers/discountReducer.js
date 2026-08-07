const reducer = (state=0,action)=>{
    switch(action.type){
        case 'init_discount':
            return state+=action.payload;
        case 'add_discount':
            return state+action.payload;
        case "remove_discount":
         return  state-action.payload;
        case "clear_discount":
         return state =0;
        default:
            return state
    }   
}

export default reducer;