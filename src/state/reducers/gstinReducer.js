const reducer = (gstin=[],action)=>{
    switch(action.type){
        case 'add_gstin':
            return [...gstin,action.payload];
        case "remove_gstin":
            return gstin = [];
        default:
            return gstin
    }   
}

export default reducer;