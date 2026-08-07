import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, BackHandler, TouchableOpacity,Platform,Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import { Icon } from "react-native-elements";
import { Button, Image } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BankAccountItem from "../../components/bankAccount-items";
import VendorListItem from "../../components/vendorList-items";
import { GetVendorList } from "../../services/bundle-services/get-vendor-list";
import { GetSalesPersonsList } from "../../services/bundle-services/get-salespersons-list";
import { PostTagDealers } from "../../services/bundle-services/post-tag-dealers";
import { GetAvailableVendorList } from "../../services/bundle-services/get-availablevendor-list";

const { width,height } = Dimensions.get("screen");

const VendorListDetails = () => {
  const vendorList = useSelector((state) => state.vendorList[0]);
  const salesPersonList = useSelector((state) => state.salesPersonList[0]);
  const dealerIdReducer = useSelector((state) => state.dealerIdReducer);

  const dealer = useSelector((state)=>state.dealer);
  const token = useSelector((state) => state.token[0]);

  const [salesPersonId, setSalesPersonId] = useState('')
  const [refreshing, setRefreshing] = useState(false);

  const ItemRef = useRef();

  const dispatch = useDispatch()
  const { 
    clearVendorList, 
    initVendorList, 
    clearSalesPersonList,
    initSalesPersonList,
    clearDealerIds
  } = bindActionCreators(actionCreators, dispatch)

  const navigation = useNavigation();
  
  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  }

  useEffect(()=>{

    GetAvailableVendorList(token,dealer[0].vendor_id).then((resVendor)=>{
      if(resVendor['status'] == 1){
        clearVendorList()
        clearDealerIds()
        initVendorList(resVendor['data'])
      }
    })
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

  const onRefresh = React.useCallback(() => {
    ItemRef.current.reset();
    setSalesPersonId('')
  }, [])

  const TagDealer =async()=>{
    let Ids = [...new Set(dealerIdReducer)]
   
    const data={
      "distributor_id" : dealer[0].vendor_id,
      "sales_person_id" : salesPersonId,
      "dealer_ids" : Ids
    }
    PostTagDealers(data,token).then((response)=>{
      if(response.status == 1){
        GetAvailableVendorList(token,dealer[0].vendor_id).then((resVendor)=>{
          if(resVendor['status'] == 1){
            clearVendorList()
            clearDealerIds()
            initVendorList(resVendor['data'])
          }
        })
      }
    })
  }

    return( 
      <View style={{flex:1,margin:20}}>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
          <SelectDropdown
            ref={ItemRef}
            data={salesPersonList}
            onSelect={(selectedItem, index) => {
              setSalesPersonId(selectedItem?.vendor_id)
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
            buttonStyle={{height: 35,borderRadius:15}}
            buttonTextStyle={{fontSize:14,fontFamily:'serif'}}
            rowTextStyle ={{fontSize:14,fontFamily:'serif'}}
          />
          <TouchableOpacity style={{padding:6,borderWidth:1,borderRadius:5,backgroundColor:'#2596be'}} onPress={onRefresh}>
            <Text style={{color:'#fff',fontWeight:'bold',fontFamily:'serif'}}>Reset</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={vendorList}
          renderItem={({ item }) => (<VendorListItem VendorListItem={item} />)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
        />
        <View style={{width: "100%",justifyContent:'center'}}>
          <TouchableOpacity  onPress={()=>TagDealer()} style={{padding:10,borderWidth:1,borderRadius:5,borderColor:salesPersonId !=""?'#2596be':"#ccc",backgroundColor:salesPersonId !=""?'#2596be':"#ccc"}} disabled={salesPersonId !=""?false:true}>
            <Text style={{textAlign:'center',fontSize:16,fontWeight:"bold",fontFamily:'serif',color:'#fff'}}>Submit</Text>
          </TouchableOpacity>
      </View>
      </View>
    )
};

export default VendorListDetails;