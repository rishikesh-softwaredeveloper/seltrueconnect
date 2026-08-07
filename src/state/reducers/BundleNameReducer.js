const reducer = (state="",action)=>{
    switch(action.type){
        case 'init_bundleName':
            return state=action.payload
        case "clear_bundleName":
         return state ="";
        default:
            return state
    }   
}

export default reducer;