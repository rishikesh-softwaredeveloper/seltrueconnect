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

const OrderListScreen = ({ route }) => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.token[0]);

  // const [copyData, setCopyData] = useClipboard()
  const [data,setData] = useState([]);
  const [trackingData,setTrackingData] = useState([]);
  const [spinner, setSpinner] = useState(true)
  const [copyButton, setCopyButton] = useState(false)

  const [paymentdata,setPaymentData] = useState([]);

  const { orderItems } = route.params;
  
  useEffect(()=>{
    GetIndividualOrders(orderItems['salesorder_id'],token).then((Res)=>{
      if(Res.status == 1){
        GetOrderTracking(orderItems['salesorder_id'],token).then((response)=>{
          if(response['tracking_data']['status'] == 1){
            setTrackingData(response['tracking_data'])
          }
        })
        setSpinner(false);
        setData(Res['data']['bundle_info']);
        setPaymentData(Res['data']['payment_info']);
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
        spinner ? (
          <View style={{minHeight:'80%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large' color="#999999" />
          </View>
        ):(
          <View>
            <FlatList
              data={paymentdata}
              renderItem={({ item }) => <PaymentInfo paymentItem={item} />}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item + index}   
            />
            {trackingData['status'] == 1 ?(
              trackingData['data']['logistics_partner_name'] !== 'SHIPROCKET' ?(
                  <View elevation={1} style={styles.container}>
                    <View style={styles.sub_container}>
                      <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 5, borderRadius: 0, width:'90%' }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between' }}>
                          <View style={{marginBottom:10}}>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:16,fontFamily:'serif',marginTop:10 }}>Tracking No: {trackingData['data']['docket_number']}</Text>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:16,fontFamily:'serif',marginTop:10 }}>Courier Name: {trackingData['data']['logistics_partner_name']}</Text>
                          </View>
                          <View style={{ alignItems: 'center' }}>
                            <IconButton
                              icon="content-copy"
                              size={25}
                              color="green"
                              // onPress={() => {
                              //   setCopyData(trackingData['data']['docket_number'])
                              //   setCopyButton(!copyButton)
                              //   }
                              // }
                              disabled = {copyButton}
                            />
                            {copyButton ?(
                              <Text style={{color:"#38b038"}}>Copied</Text>
                            ):(<></>)}
                          </View>
                        </View>
                      {trackingData['data']['tracking_url'] != '' ?(
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom:10 }}>
                          <Button title='Track Here...' onPress={() => Linking.openURL(trackingData['data']['tracking_url'])}  />
                        </View>
                        ):(<></>)
                      }
                      </View>
                    </View>
                  </View>
                ):
                <View elevation={1} style={styles.container}>
                  <View style={styles.sub_container}>
                    <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 5, borderRadius: 0, width:'90%' }}>
                      <View style={{flexDirection:'row',justifyContent:'space-between' }}>
                          <View style={{marginBottom:10}}>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:16,fontFamily:'serif',marginTop:10 }}>Tracking No: {trackingData['data']['docket_number']}</Text>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:16,fontFamily:'serif',marginTop:10 }}>Courier Name: {trackingData['data']['logistics_partner_name']}</Text>
                          </View>
                          <View style={{ alignItems: 'center' }}>
                            <IconButton
                              icon="content-copy"
                              size={25}
                              color="green"
                              // onPress={() => {
                              //   setCopyData(trackingData['data']['docket_number'])
                              //   setCopyButton(!copyButton)
                              //   }
                              // }
                              disabled = {copyButton}
                            />
                            {copyButton ?(
                              <Text style={{color:"#38b038"}}>Copied</Text>
                            ):(<></>)}
                          </View>
                      </View>
                      {trackingData['data']['tracking_url'] != '' ?(
                        <View style={{ flexDirection: 'row', justifyContent: 'center',paddingBottom:10 }}>
                        <Button title='Track Here...' onPress={() => Linking.openURL(trackingData['data']['tracking_url']+trackingData['data']['docket_number'])}  />
                      </View>
                      ):(<></>)
                      }
                    </View>
                </View>
              </View>
            ):(
              <></>
            )}            
            <View>
              <FlatList
                data={data}
                renderItem={({ item }) => <OrderInfo bundleItem={item} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item + index}
              />      
            </View>
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
export default OrderListScreen;