import React, { useEffect, useState } from "react";
// import * as Location from 'expo-location';
import { View, TextInput, Alert, BackHandler, ScrollView,PermissionsAndroid} from "react-native";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { useNavigation } from "@react-navigation/native";
import { Card, Image} from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { IconButton } from "react-native-paper";
import { PostAddShippingAddress } from "../../services/bundle-services/post-add-shipping-address";
import { GetShippingAddress } from "../../services/bundle-services/get-shipping-address";
import pincodes from '../../data/pincode';
import Geocoder from 'react-native-geocoding';
import { PostAddBankAccount } from "../../services/bundle-services/post-add-bank-account";
import { GetBankAccounts } from "../../services/bundle-services/get-bank-accounts";
import { PostAddVoucherDetails } from "../../services/bundle-services/post-add-voucher-details";
import { GetVoucherDetails } from "../../services/bundle-services/get-voucher-details";
import { GetTaggedDealersList } from "../../services/bundle-services/get-taggedDealers-list";


const AddVoucherScreen = () => {

    const navigation = useNavigation();
    const dealer = useSelector((state)=>state.dealer);
    const token = useSelector((state) => state.token[0]);
    const salesPersonList = useSelector((state) => state.salesPersonList[0]);  

    const vendor_id = dealer[0].vendor_id;

    const [amount,setAmount]= useState(0);
    const [name,setName]= useState();
    const [mobile,setMobile]= useState();
    const [email,setEmail] = useState();
    const [city,setCity] = useState();
    const [address,setAddress] = useState();
    const [salesPerson,setSalesPerson] = useState('');

    const dispatch = useDispatch();
    const { 
        initVoucherDetails,
        clearSalesPersonList,
        initSalesPersonList,
        clearVoucherDetails
    } = bindActionCreators(actionCreators,dispatch);

    useEffect(()=>{
        GetTaggedDealersList(token,dealer[0].vendor_id).then((resSales)=>{
            if(resSales['status'] == 1){
                clearSalesPersonList()
                initSalesPersonList(resSales['data'])
            }
        })
    },[])

    const AddNewBankAccount = ()=>{
            const newVoucher = {
                "vendor_id" : vendor_id,
                "voucher_to" : salesPerson.vendor_id,
                "amount" : Number(amount),
                "mobile" : salesPerson.mobile,
                "created_by":dealer[0].vendor_id
            }
            console.log(newVoucher,'newVoucher');
            PostAddVoucherDetails(newVoucher,token).then((response)=>{
                console.log(response,'Vocheer');
                if(response.status == 1){
                      GetVoucherDetails(token,vendor_id).then((resBank)=>{
                        if(resBank['status'] == 1){
                            clearVoucherDetails()
                            initVoucherDetails(resBank['data'])
                            navigation.navigate("VoucherDetails")
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
        <View style={{justifyContent:'center',alignContent:'center',padding:6,paddingTop:30}}>
            {/* <ScrollView> */}
                <View style={{padding:10,marginBottom:0}}>
                    <Image
                        source={require("../../assets/images/voucher3.jpg")}
                        containerStyle={{width: "100%",height:200}}
                    />
                </View>
                    
                <Card containerStyle={{borderRadius:25,borderColor:'#ccc',elevation:5}}> 
                    <View style={{marginVertical:'6%',padding:5,paddingBottom:0}}>
                        <SelectDropdown
                            data={salesPersonList}
                            onSelect={(selectedItem, index) => {
                                setSalesPerson(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem?.name;
                            }}
                            rowTextForSelection={(item, index) => {
                            return item?.name;
                            }}
                            renderDropdownIcon={(isOpened) => {
                            return (
                                <FontAwesome
                                name={isOpened ? "chevron-up" : "chevron-down"}
                                color={"#444"}
                                size={14}
                                />
                            );
                            }}
                            buttonStyle={{height: 35,borderRadius:15,borderWidth:1}}
                            buttonTextStyle={{fontSize:14,fontFamily:'serif'}}
                            rowTextStyle ={{fontSize:14,fontFamily:'serif'}}
                        />
                        <TextInput style={{borderBottomWidth:1,padding:3,marginTop:10,color:'#000'}}  placeholder="Amount" onChangeText={(text)=>{setAmount(text)}} />               
                        <View style={{flexDirection:"row",justifyContent:"space-around",paddingleft:5,marginTop:20,boderRadius:10,}}>
                            <Button title='Back' onPress={Previous} buttonStyle={{backgroundColor:'#638ccf',borderRadius:10}}/>
                            <Button title='Save' onPress={AddNewBankAccount} buttonStyle={{backgroundColor:'#638ccf',borderRadius:10}}/>
                        </View>
                    </View>
                </Card>
            {/* </ScrollView> */}
        </View>
    )
};

export default AddVoucherScreen;