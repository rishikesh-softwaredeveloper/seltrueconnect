import React from "react";
import { View, Text, StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { IconButton } from "react-native-paper";

const TotalPaymentItem = (paymentItem) => {
    const navigation = useNavigation();

    const OrderDetails=(Item)=>{
        navigation.navigate('PaymentListScreen', {"paymentItem":Item})    
    }
    
    for (var keys in paymentItem) {
        // const date = new Date(paymentItem[keys].payment_date);
        // const formattedDate = date.toISOString().split('T')[0];
        return (
            <View style={styles.container}>
                <View style={styles.sub_container}>
                    <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 10, borderRadius: 0,width:'80%' }}>
                        <View style={{ paddingBottom: 10,flexDirection:'row',justifyContent: 'space-between' }}>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontFamily:'serif' }}>Payment Ref : {paymentItem[keys].payment_reference }</Text>                     
                        </View>
                        <View style={{ paddingBottom: 10,flexDirection:'row',justifyContent: 'space-between' }}>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontFamily:'serif' }}>Payment Mode: {paymentItem[keys].receipt_no}</Text>                     
                        </View>
                        <View>
                        <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontFamily:'serif' }}>Amount: {paymentItem[keys].amount}/-</Text>
                        </View>
                        <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontFamily:'serif' }}>Paid On : {paymentItem[keys].payment_date}</Text>
                        </View>
                    </View>
                </View>
                    <View style={{ margin: 0, padding: 0 ,borderStartWidth:0,borderColor: "#CCC",justifyContent:'center', width:"10%"}}>
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <IconButton
                                icon="chevron-right"
                                size={30}
                                color="gray"
                                onPress={()=>OrderDetails(paymentItem)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
};


const styles = StyleSheet.create({
container:{
    borderWidth: 0.8, 
    borderTopWidth:0,
    margin: 0,
    padding:0, 
    borderColor: "#CCC" 
},
sub_container:{ 
    flexDirection: 'row', 
    padding: 0,
    marginVertical:0,
    justifyContent:'space-evenly'
}

});
export default TotalPaymentItem;