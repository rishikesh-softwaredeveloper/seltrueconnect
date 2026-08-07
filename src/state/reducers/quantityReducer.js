const reducer = (state=0,action)=>{
    switch(action.type){
        case 'init_qnty':
            return state+=action.payload;
        case 'add_qnty':
            return state+action.payload;
        case "remove_qnty":
         return  state-action.payload;
        case "clear_qnty":
         return state =0;
        default:
            return state
    }   
}

export default reducer;