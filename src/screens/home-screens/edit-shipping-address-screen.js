import React, { useEffect, useState } from "react";
import { View, TextInput, Button, BackHandler,ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Image } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { PostUpdateShippingAddress } from "../../services/bundle-services/post-update-shipping-address";
import { GetShippingAddress } from "../../services/bundle-services/get-shipping-address";
import pincodes from '../../data/pincode';

const EditShippingAddressScreen = ({ route }) => {

    const navigation = useNavigation();

    const token = useSelector((state)=>state.token[0]);
    const dealer = useSelector((state)=>state.dealer);


    const dispatch = useDispatch();
    const { 
        clearShippingAddress,
        initShippingAddress
    } = bindActionCreators(actionCreators, dispatch);


    const { shippingItem } = route.params;
    const shippingData = shippingItem['shippingItem'];

    const [shippingAddress,setShippingAddress] = useState(shippingData['shipping_address']);
    const [pinCode,setPinCode] = useState(shippingData['pincode'].toString());
    const [city,setCity] = useState(shippingData['city']);
    const [state,setState] = useState(shippingData['state']);
    const [on,seton] = useState(false);

    const editShippingAddress =()=>{
        seton(true);
        const updateAddress={
            "shipping_address":shippingAddress,
            "state":state,
            "city":city,
            "pincode":pinCode,
            "shipping_id":shippingData['shipping_id'],
            "attached_vendor_id":dealer[0].attached_vendor_id,
            "category_id":dealer[0].category_id
        }
        PostUpdateShippingAddress(updateAddress,token).then((response)=>{
            if(response.status == 1){
                const reqData= {
                    "attached_vendor_id":dealer[0].attached_vendor_id,
                    "vendor_id":dealer[0].vendor_id,
                    "category_id":dealer[0].category_id
                }
        
                GetShippingAddress(token,reqData).then((res5)=>{
                if(res5['status'] == 1){
                    clearShippingAddress()
                    initShippingAddress(res5['data'])
                    seton(false);
                    navigation.navigate("ShippingDetailsScreen")
                }
                })

            }
        })
    }

    const Previous = () => {
        navigation.navigate("ShippingDetailsScreen")
    };

    const handleBackButtonClick = () => {
        navigation.navigate("ShippingDetailsScreen");
        return true;
    }
    
    useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );

    return () => {
      subscription.remove();
    };
  }, []);

    useEffect(()=>{
        
        let pincodeData = pincodes.filter(item => item.pincode == pinCode);
        if (pincodeData.length > 0) {
            setState(pincodeData[0].state_name);
        }
        
    },[pinCode]);

    return(
        <View style={{justifyContent:'center',alignContent:'center',padding:10,paddingTop:30}}>
            <ScrollView>
            <View style={{padding:10,marginBottom:0}}>
                <Image
                    source={require("../../assets/images/delivery.jpg")}
                    containerStyle={{width: "100%",height:200}}
                />
            </View>
            <Card containerStyle={{borderRadius:5,borderColor:'#ccc',elevation:5}}> 
                <TextInput 
                    multiline={true} 
                    maxLength={100}  
                    numberOfLines={2} 
                    style={{borderBottomWidth:0.3,padding:0}} 
                    value={shippingAddress} 
                    onChangeText={(text)=>{setShippingAddress(text)}} 
                    placeholder="Shipping Address" 
                />
                <TextInput 
                    style={{borderBottomWidth:0.3,padding:3,marginTop:10}}  
                    placeholder="Pincode" 
                    value={pinCode}
                    maxLength={6}
                    keyboardType='number-pad'
                    onChangeText={(text)=>{setPinCode(text)}} 
                />
                <TextInput 
                    style={{borderBottomWidth:0.3,padding:3,marginTop:10}}  
                    placeholder="City" 
                    value={city} 
                    onChangeText={(text)=>{setCity(text)}} 
                />
                <TextInput 
                    style={{borderBottomWidth:0.3,padding:3,marginTop:10}}  
                    placeholder="State" 
                    value={state} 
                    onChangeText={(text)=>{setState(text)}}
                    editable={false}
                />
                <View style={{flexDirection:"row",justifyContent:"space-around",paddingleft:5,marginTop:20,boderRadius:10}}>
                    <Button title="Back" onPress={Previous} style={{boderRadius:10}} color="#638ccf"/>
                    <Button title="Save" onPress={editShippingAddress} style={{boderRadius:10}} color="#638ccf" disabled={on}/>
                </View>
            </Card>
            </ScrollView>
        </View>
    )
};

export default EditShippingAddressScreen;