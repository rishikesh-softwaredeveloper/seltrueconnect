import React, { useState, useEffect} from "react";
import { Text,View,Image,TouchableOpacity , StyleSheet} from "react-native";
import CheckBox from "@react-native-community/checkbox";

import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

const CheckBoxComponent = ({item})=>{
    const dealerIdReducer = useSelector((state) => state.dealerIdReducer);

    const dispatch = useDispatch()
    const { 
        initDealerIds,
        removeDealerIds
    } = bindActionCreators(actionCreators,dispatch)


    const [passFlag, setPassFlag] = useState(false)

    // useEffect(()=>{
        
    //     if(item.selectAll != true){
    //         for (const iterator of parentIdsReducer) {
    //             if(iterator === item?._id){
    //                 setPassFlag(!passFlag)        
    //             }
    //         }
    //     }else{
    //         initParentIds(item._id)
    //     }
    // },[])

    const present =(item)=>{
        if(passFlag == false){
            initDealerIds(item?.vendor_id)
        }else{
            removeDealerIds(item?.vendor_id)
        }        
        setPassFlag(!passFlag)
    }

    
    return(
        <View>
            <CheckBox
                value={passFlag}
                onValueChange={() => present(item)}
            />  
        </View>        
    )
}

const styles = StyleSheet.create({

    data7:{
        backgroundColor:'#5cb85c', 
        // opacity:.65,
        borderColor:'#4cae4c',
        marginTop:5, 
        marginBottom:5, 
        padding:7,
        marginRight:0,
        borderRadius:5, 
        alignItems:'center'
    },
    data8:{
        backgroundColor:'#EC3A26',
        // opacity:.55,
        color:'#fffff',
        borderWidth:1,
        borderColor:'#4cae4c',
        marginTop:5, 
        marginBottom:5, 
        padding:7,
        marginRight:0,
        borderRadius:5, 
        alignItems:'center'
    },
})
export default CheckBoxComponent;