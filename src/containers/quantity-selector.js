import React from 'react'
import { View, TextInput,Text, Pressable } from 'react-native'
import { StyleSheet } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

const QuantitySelector = ({quantity, setQuantity, maxlimit,minlimit,item}) => {
    const cartlist = useSelector((state)=>state.cartlist);
    const dispatch = useDispatch()
    const { addQnty,removeQnty,addPrice,removePrice} = bindActionCreators(actionCreators, dispatch)
    
    const onMinus = () => {
        setQuantity(Math.max(0, quantity - 1))
        removeQnty(1)
        removePrice(item['sales_price']*1)
    }

    const onPlus = () => {
        setQuantity(quantity + 1)
        addQnty(1)
        addPrice(item['sales_price']*1)
    }
    return (
        <View style={styles.container}>
            <Pressable onPress={onMinus} style={styles.quantityButton}disabled={minlimit}>
                <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>
            <TextInput maxLength={2} keyboardType='number-pad'  style={styles.quantityText}>{quantity}</TextInput>
            <Pressable onPressIn={onPlus} style={styles.quantityButton} disabled={maxlimit}>
                <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        width:110
    },
    quantityText: {
        fontSize: 20,
        color: "#007EB9",
        textAlign:'center'
    },
    quantityButton: {
        width: 30,
        // height: "70%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ddd",
    },
    quantityButtonText: {
        fontSize: 20,
    }
});
export default QuantitySelector