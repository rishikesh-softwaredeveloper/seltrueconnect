import React, { useEffect } from "react";
import { View, Text, FlatList, BackHandler, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ShippingItem from "../../components/shipping-items";

const ShippingDetails = () => {
    const shippingAddress = useSelector((state) => state.shippingAddress[0]);
    const navigation = useNavigation();
    
  
    const handleBackButtonClick = () => {
      // navigation.navigate("CartScreen");
      navigation.goBack();
      return true;
    }
    
    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
      };
    }, []);

   

    return( 
      <View style={{flex:1}}>
        <FlatList
          data={shippingAddress}
          renderItem={({ item }) => (<ShippingItem shippingItem={item} />)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    )
};

export default ShippingDetails;