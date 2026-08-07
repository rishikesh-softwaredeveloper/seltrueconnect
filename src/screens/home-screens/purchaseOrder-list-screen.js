import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,BackHandler, ActivityIndicator, StyleSheet,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { useClipboard } from '@react-native-community/hooks';
import { GetIndividualOrders } from '../../services/bundle-services/get-individual-list-orders';
import { GetOrderTracking } from '../../services/bundle-services/get-order-tracking';
import { useSelector } from "react-redux";
import OrderInfo from '../../components/order-info';
import PaymentInfo from '../../components/payment-info';
import { IconButton } from "react-native-paper";
import { Button } from 'react-native-elements';
import { GetPurchaseIndividualOrders } from '../../services/bundle-services/get-purchase-individual-list-orders';
import PurchaseBunldeItem from '../../components/purchase-bundle-item';
import { GetPurchaseDispatchAddress } from '../../services/bundle-services/get-purchase-dispatchAddress';
import { GetPurchaseOrderPayment } from '../../services/bundle-services/get-purchase-order-payment';
import DistPaymentInfo from '../../components/dist-payment-info';

const PurchaseOrderListScreen = ({ route }) => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.token[0]);

  const [data,setData] = useState([]);
  const [Dispatch,setDispatch] = useState([]);
  const [paymentdata,setPaymentData] = useState([]);
  const [spinner, setSpinner] = useState(true)
  const [spinner1, setSpinner1] = useState(true)

  const { orderItems } = route.params;
  
  useEffect(()=>{

    GetPurchaseDispatchAddress(orderItems,token).then(DispatchRes =>{
      if(DispatchRes.status == 1){
        setDispatch(DispatchRes.results)
        setSpinner1(false);
      }else if(DispatchRes.status == 0){
        setSpinner1(false);
        // alert(DispatchRes.message);
      }
    })
    GetPurchaseOrderPayment(orderItems,token).then((Res)=>{
      if(Res.status == 1){
        setPaymentData(Res.results);
      }
    })
    
    GetPurchaseIndividualOrders(orderItems,token).then((Res)=>{
      if(Res.status == 1){
        setData(Res.results)
        setSpinner(false);
      }else if(Res.status == 0){
        setSpinner(false);
        alert(Res.msg);
      }
    })
  },[])

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
  return (
    <View style={{ flex: 1 }}>
      {
        spinner1 ? (
          <View style={{minHeight:'80%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large' color="#999999" />
          </View>
        ):( 
          <View style={{flex:5,padding:10,justifyContent:'center',width:'90%',marginLeft:20}}>
            {
              paymentdata.length != 0 && <DistPaymentInfo paymentItem={paymentdata} />
            }
            <View style={{borderWidth:1,padding:10,borderRadius:20}}>
              <View style={{justifyContent:'center',alignItems:'center',borderBottomWidth:1,marginBottom:10}}>
                <Text style={{color:'#000',fontWeight:'bold'}}>SHIPPED ADDRESS</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:'#000',fontWeight:'bold'}}>Name</Text>
                <Text style={{color:'#000'}}>{Dispatch.name}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:'#000',fontWeight:'bold'}}>Company</Text>
                <Text style={{color:'#000',}}>{Dispatch.company}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:'#000',fontWeight:'bold'}}>Vendor Code</Text>
                <Text style={{color:'#000',}}>{Dispatch.vendor_code}</Text>
              </View> 
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:'#000',fontWeight:'bold'}}>Dispatch Address</Text>
                <Text style={{color:'#000',}} numberOfLines={2}>{Dispatch.dispatch_address}</Text>
              </View> 
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:'#000',fontWeight:'bold'}}>Pin Code</Text>
                <Text style={{color:'#000',}}>{Dispatch.pincode}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:'#000',fontWeight:'bold'}}>City</Text>
                <Text style={{color:'#000',}}>{Dispatch.city}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:'#000',fontWeight:'bold'}}>State</Text>
                <Text style={{color:'#000',}}>{Dispatch.state}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:'#000',fontWeight:'bold'}}>PAN No</Text>
                <Text style={{color:'#000',}}>{Dispatch.pan_card}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:'#000',fontWeight:'bold'}}>GSTIN No</Text>
                <Text style={{color:'#000',}}>{Dispatch.gst_no}</Text>
              </View>  
            </View>
            
          </View>
          
        )
      }
      {
        spinner ? (
          <View style={{minHeight:'80%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large' color="#999999" />
          </View>
        ):( 
          <View style={{flex:4}}>
            <FlatList
              data={data}
              renderItem={({ item }) => <PurchaseBunldeItem bundleItem={item} />}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item + index}
            />      
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
      borderWidth: 0, 
      marginVertical: 10, 
      marginHorizontal: 10, 
      margin: 0,
      padding:0, 
      borderRadius: 5,
      borderColor: "#CCC",
      shadowColor: "#000000",
      shadowOpacity: 0,
      shadowRadius: 2,
      shadowOffset: {
          height: 1,
          width: 1
      } 
  
  },
  sub_container:{ 
      flexDirection: 'row', 
      padding: 0,
      marginVertical:0,
      justifyContent:'space-evenly'
  }
  
});
export default PurchaseOrderListScreen;