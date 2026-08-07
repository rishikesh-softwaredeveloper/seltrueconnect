import React, { useEffect, useState } from "react";
// import * as Location from 'expo-location';
import { View, TextInput, Alert, BackHandler, ScrollView,PermissionsAndroid} from "react-native";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { useNavigation } from "@react-navigation/native";
import { Card, Image} from "react-native-elements";
import { IconButton } from "react-native-paper";
import { PostAddShippingAddress } from "../../services/bundle-services/post-add-shipping-address";
import { GetShippingAddress } from "../../services/bundle-services/get-shipping-address";
import pincodes from '../../data/pincode';
import Geocoder from 'react-native-geocoding';
import { PostAddBankAccount } from "../../services/bundle-services/post-add-bank-account";
import { GetBankAccounts } from "../../services/bundle-services/get-bank-accounts";


const AddBankScreen = () => {

   
    
    const navigation = useNavigation();
    const dealer = useSelector((state)=>state.dealer);
    const token = useSelector((state) => state.token[0]);
    const vendor_id = dealer[0].vendor_id;

    const [bankName,setBankName]= useState();
    const [Branch,setBranch]= useState();
    const [ifscCode,setIfscCode]= useState();
    const [accountNo,setAccountNo] = useState();

    const dispatch = useDispatch();
    const { 
        initBankAccounts,
        clearBankAccounts
    } = bindActionCreators(actionCreators,dispatch);

    const AddNewBankAccount = ()=>{
            const newAccount = {
                "vendor_id" : vendor_id,
                "bank_name" : bankName,
                "branch" : Branch,
                "ifsc_code" : ifscCode,
                "account_no" : accountNo
            }
            PostAddBankAccount(newAccount,token).then((response)=>{
                if(response.status == 1){
                    GetBankAccounts(token,vendor_id).then((resBank)=>{
                        if(resBank['status'] == 1){
                            clearBankAccounts()
                            initBankAccounts(resBank['data'])
                            navigation.navigate("BankDetails")
                        }
                    })
                }else{
                    Alert.alert(response.message)
                }
            })
    }

    


    const Previous = () => {
        navigation.goBack()
    };

    const handleBackButtonClick = () => {
        navigation.goBack();
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

 

    return(
        <View style={{justifyContent:'center',alignContent:'center',padding:6,paddingTop:40}}>
            <ScrollView>
                <View style={{padding:10,marginBottom:0}}>
                    <Image
                        source={require("../../assets/images/bank.jpg")}
                        containerStyle={{width: "100%",height:200}}
                    />
                </View>
                <Card containerStyle={{borderRadius:25,borderColor:'#ccc',elevation:5}}> 
                    <View style={{marginVertical:'6%',padding:5,paddingBottom:0}}>
                        <TextInput style={{borderBottomWidth:0.3,padding:3,marginTop:10,color:'#000'}}  placeholder="Account No" value={accountNo} onChangeText={(text)=>{setAccountNo(text)}}/>
                        <TextInput style={{borderBottomWidth:0.3,padding:3,marginTop:10,color:'#000'}}  placeholder="Bank Name" value={bankName} onChangeText={(text)=>{setBankName(text)}} />
                        <TextInput style={{borderBottomWidth:0.3,padding:3,marginTop:10,color:'#000'}}  placeholder="Branch" value={Branch} onChangeText={(text)=>{setBranch(text)}} />
                        <TextInput style={{borderBottomWidth:0.3,padding:3,marginTop:10,color:'#000'}}  placeholder="IFSC Code" value={ifscCode} onChangeText={(text)=>{setIfscCode(text)}} />               
                        <View style={{flexDirection:"row",justifyContent:"space-around",paddingleft:5,marginTop:20,boderRadius:10,}}>
                            <Button title='Back' onPress={Previous} buttonStyle={{backgroundColor:'#638ccf',borderRadius:10}}/>
                            <Button title='Save' onPress={AddNewBankAccount} buttonStyle={{backgroundColor:'#638ccf',borderRadius:10}}/>
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </View>
    )
};

export default AddBankScreen;