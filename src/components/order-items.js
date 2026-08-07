import React from "react";
import { View, Text, StyleSheet} from "react-native";

const OrderItems = (orderItems) => {
    for (var keys in orderItems) {
        return (
            <View style={styles.container}>
                <View style={styles.sub_container}>
                    <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 10, borderRadius: 0,width:'90%' }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', paddingBottom: 10 }}>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif' }}>{orderItems[keys].device_name.toUpperCase() }</Text>
                        </View>
                        <View>
                            <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: '600', color: "#000",fontSize:16,fontFamily:'serif'}}>&#8377;{orderItems[keys].sale_price}/-</Text>
                                <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif' }}>Quantity ( {orderItems[keys].quantity} )</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
};


const styles = StyleSheet.create({
container:{
    borderWidth: 1, 
    marginVertical: 10, 
    marginHorizontal: 10, 
    margin: 0,
    padding:0, 
    borderRadius: 5,
    borderColor: "#CCC" 
},
sub_container:{ 
    flexDirection: 'row', 
    padding: 0,
    marginVertical:0,
    justifyContent:'space-evenly'
}

});
export default OrderItems;