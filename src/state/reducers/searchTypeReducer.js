const reducer = (state="",action)=>{
    switch(action.type){
        case 'init_searchType':
            return state=action.payload
        case "clear_searchType":
         return state ="";
        default:
            return state
    }   
}

export default reducer;