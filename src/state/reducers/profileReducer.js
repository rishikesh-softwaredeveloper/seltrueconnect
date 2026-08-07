const reducer = (profile=[],action)=>{
    switch(action.type){
        case 'add_profile':
            return [...profile,action.payload];
        case "remove_profile":
            return profile = [];
        default:
            return profile
    }   
}

export default reducer;