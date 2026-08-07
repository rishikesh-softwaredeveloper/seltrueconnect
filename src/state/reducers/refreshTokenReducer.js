const reducer = (state="",action)=>{
    switch(action.type){
        case 'init_refreshToken':
            return state=action.payload
        case "clear_refreshToken":
         return state ="";
        default:
            return state
    }   
}

export default reducer;