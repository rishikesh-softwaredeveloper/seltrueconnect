const reducer = (state=false,action)=>{
    switch(action.type){
        case 'button_icon':
            return state = action.payload
        default:
            return state
    }   
}

export default reducer;