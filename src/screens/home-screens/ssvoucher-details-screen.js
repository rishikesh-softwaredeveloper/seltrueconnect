import React, { useEffect } from "react";
import { View, Text, FlatList, BackHandler, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BankAccountItem from "../../components/bankAccount-items";
import VocherItem from "../../components/vocher-items";
import { GetVoucherDetails } from "../../services/bundle-services/get-voucher-details";

const SSVoucherDetails = () => {
    const voucherDetails = useSelector((state) => state.voucherDetails[0]);
    const token = useSelector((state) => state.token[0]);
    const dealer = useSelector((state)=>state.dealer);

    const navigation = useNavigation();

    const dispatch = useDispatch()
    const { 
      clearVoucherDetails, 
      initVoucherDetails,
    } = bindActionCreators(actionCreators, dispatch)
    
    const previous = () => {
      navigation.goBack();
      return true;
    }

    const handleBackButtonClick = () => {
      navigation.goBack();
      return true;
    }
    
    useEffect(()=>{
      GetVoucherDetails(token,dealer[0].vendor_id).then((resVochers)=>{
        if(resVochers['status'] == 1){
          clearVoucherDetails()
          initVoucherDetails(resVochers['data'])
        }
      })
    },[])

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
      };
    }, []);

    const add = () => {
      navigation.navigate("AddSSVoucherScreen");
    };

    return( 
      <View style={{flex:1}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:0,paddingBottom:10,marginTop:36,padding:20,backgroundColor:'#1194f6'}}>
          <TouchableOpacity style={{marginLeft:1}} onPress={previous}>
            <MaterialCommunityIcons name="arrow-left" color={'#ffff'} size={25} />
          </TouchableOpacity>
          <Text style={{ textAlign: 'left',fontSize: 18,color:'#ffff',fontFamily:'serif',justifyContent:'center' }}>Voucher Details</Text>
          <TouchableOpacity style={{marginLeft:20}} onPress={add} >
            <MaterialCommunityIcons name="plus-circle-outline" color={"#ffff"} size={30} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={voucherDetails}
          renderItem={({ item }) => (<VocherItem voucherItem={item} />)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    )
};

export default SSVoucherDetails;