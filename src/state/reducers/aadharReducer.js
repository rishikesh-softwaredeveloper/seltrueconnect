const reducer = (aadhar=[],action)=>{
    switch(action.type){
        case 'add_aadhar':
            return [...aadhar,action.payload];
        case "remove_aadhar":
            return aadhar = [];
        default:
            return aadhar
    }   
}

export default reducer;