const reducer = (upi=[],action)=>{
    switch(action.type){
        case 'add_upi':
            return [...upi,action.payload];
        case "remove_upi":
            return upi = [];
        default:
            return upi
    }   
}

export default reducer;