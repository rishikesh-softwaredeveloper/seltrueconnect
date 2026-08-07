const reducer = (dealer=[],action)=>{
    switch(action.type){
        case 'add_dealer':
            return [...dealer,action.payload];
        case "remove_dealer":
        //  return  dealer.filter(item=>item.vendor_id !== action.payload.vendor_id)
        return dealer = [];
        default:
            return dealer
    }   
}

export default reducer;