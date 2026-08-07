import React,{useEffect} from "react";
import { View, Text, StyleSheet,BackHandler} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

const PaymentItems = (orderItem) => {
    const navigation = useNavigation();

    const OrderDetails=(Item)=>{
        navigation.navigate('OrderListScreen', {"orderItems":Item})    
    }
    
    const handleBackButtonClick = () => {
        navigation.goBack()
        return true;
    }
    
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    for (var keys in orderItem) {
        return (
            <View style={styles.container}>
                <View style={styles.sub_container}>
                    <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 10, borderRadius: 0,width:'90%' }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', paddingBottom: 5 }}>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000" ,fontFamily:'serif'}}>{orderItem[keys].salesorder_code.toUpperCase() }</Text>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontFamily:'serif' }}>Amount:{orderItem[keys].order_amount}/-</Text>
                        </View>
                        <View>
                            <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{  fontWeight: '600', color: "#000",fontFamily:'serif' }}>Quantity {orderItem[keys].total_quantity}</Text>
                            </View>
                        </View>
                    </View>
                     <View style={{ margin: 0, padding: 0 ,borderStartWidth:1,borderColor: "#CCC",justifyContent:'center', width:"10%"}}>
                         <View style={{alignItems:'center',justifyContent:'center'}}>
                            <IconButton
                                icon="chevron-right"
                                size={40}
                                color="gray"
                                onPress={()=>OrderDetails(orderItem['orderItem'])}
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
export default PaymentItems;