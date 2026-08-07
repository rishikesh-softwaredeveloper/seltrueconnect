import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, BackHandler, TouchableOpacity,Platform,Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import VendorListItem from "../../components/vendorList-items";
import { GetAvailableVendorList } from "../../services/bundle-services/get-availablevendor-list";
import { GetTaggedDealersList } from "../../services/bundle-services/get-taggedDealers-list";
import TaggedVendorListItem from "../../components/taggedvendorList-items";
import { GetSalesPersonsList } from "../../services/bundle-services/get-salespersons-list";

const { width,height } = Dimensions.get("screen");

const TaggedDealersScreen = () => {
  const vendorList = useSelector((state) => state.vendorList[0]);
  const salesPersonList = useSelector((state) => state.salesPersonList[0]);  

  const dealer = useSelector((state)=>state.dealer);
  const token = useSelector((state) => state.token[0]);

  const dispatch = useDispatch()
  const { 
    clearSalesPersonList, 
    initSalesPersonList, 
  } = bindActionCreators(actionCreators, dispatch)

  const navigation = useNavigation();
  
  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  }

  useEffect(()=>{

    GetSalesPersonsList(token,dealer[0].vendor_id).then((resSales)=>{
      if(resSales['status'] == 1){
        clearSalesPersonList()
        initSalesPersonList(resSales['data'])
      }
    })
  },[])
    
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
      <View style={{flex:1,margin:20}}>
        <FlatList
          data={salesPersonList}
          renderItem={({ item }) => (<TaggedVendorListItem VendorListItem={item} />)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
        />
        
      </View>
    )
};

export default TaggedDealersScreen;