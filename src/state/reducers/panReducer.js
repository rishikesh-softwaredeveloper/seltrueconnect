const reducer = (pan=[],action)=>{
    switch(action.type){
        case 'add_pan':
            return [...pan,action.payload];
        case "remove_pan":
            return pan = [];
        default:
            return pan
    }   
}

export default reducer;