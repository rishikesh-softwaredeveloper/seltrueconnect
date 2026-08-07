import React,{useEffect, useState} from 'react';
import { View,Text, FlatList,RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import ElementButton from '../../containers/button';



const OrderScreen =()=>{
    const navigation = useNavigation();
    const dealer = useSelector((state)=>state.dealer);
    return (
        
        <View style={{ flex: 1,justifyContent:'center'}}>
            {
                //spss
                dealer[0].category_id == 2 ?
                <>
                    <ElementButton
                        title="Total Orders"
                        style={{
                            backgroundColor: "#1194f6",
                            borderRadius: 5,
                        }}
                        containerStyle={styles.buttonstyles}
                        onPress={()=>navigation.navigate('TotalOrderScreen')}
                    />
                    <ElementButton
                        title="Purchase Orders"
                        style={{
                            backgroundColor: "#1194f6",
                            borderRadius: 5,
                        }}
                        containerStyle={styles.buttonstyles}
                        onPress={()=>navigation.navigate('PurchasedOrderScreen')}
                    />
                    
                    <ElementButton
                        title="Sold Orders"
                        style={{
                            backgroundColor: "#1194f6",
                            borderRadius: 5,
                        }}
                        containerStyle={styles.buttonstyles}
                        onPress={()=>navigation.navigate('SoldOrderScreen')}
                    />
                </>
                
                :
                //dist
                dealer[0].category_id == 3 ?
                <>
                    <ElementButton
                        title="Purchase Orders"
                        style={{
                            backgroundColor: "#1194f6",
                            borderRadius: 5,
                        }}
                        containerStyle={styles.buttonstyles}
                        onPress={()=>navigation.navigate('PurchasedOrderScreen')}
                    />
                    
                    <ElementButton
                        title="Sold Orders"
                        style={{
                            backgroundColor: "#1194f6",
                            borderRadius: 5,
                        }}
                        containerStyle={styles.buttonstyles}
                        onPress={()=>navigation.navigate('SoldOrderScreen')}
                    />
                </>
                :
                //attachedDealer
                dealer[0].category_id == 4 ?
                dealer[0].attached_vendor_id == "" || dealer[0].attached_vendor_id == null ?
                    <ElementButton
                        title="Total Orders"
                        style={{
                            backgroundColor: "#1194f6",
                            borderRadius: 5,
                        }}
                        containerStyle={styles.buttonstyles}
                        onPress={()=>navigation.navigate('TotalOrderScreen')}
                    />
                    :
                    <ElementButton
                        title="Purchase Orders"
                        style={{
                            backgroundColor: "#1194f6",
                            borderRadius: 5,
                        }}
                        containerStyle={styles.buttonstyles}
                        onPress={()=>navigation.navigate('PurchasedOrderScreen')}
                    />
                :<></>
            }
            
            

        </View>
    )
}
const styles = StyleSheet.create({
    buttonstyles: {
      marginHorizontal: "10%",
      marginVertical: "3%",
      height: 50,
      width: "80%",
    }
});

export default OrderScreen;