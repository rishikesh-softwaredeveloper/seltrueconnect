import React, {useState, useEffect} from "react";
import { View, Text ,BackHandler, ScrollView, ActivityIndicator, Alert,TextInput, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CheckBox, Card, Button } from "react-native-elements";
import QRCode from 'react-native-qrcode-svg';
import { IconButton } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Clipboard from '@react-native-clipboard/clipboard';

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";

import { GetTcsValue } from "../../services/bundle-services/post-get-tcs-value";

import getEnvVars from "../../constants/global";
import { PostUpdateDistOrderPayment } from "../../services/bundle-services/post-update-dist-orderpaymet";
import { PostDistCreateOrder } from "../../services/bundle-services/post-dist-create-order";
import { PostDistPayment } from "../../services/bundle-services/post-dist-payment";
import { PostCreateSSSalesDispatch } from "../../services/bundle-services/post-create-ss-sales-dispatch";
import { GetBundleList } from "../../services/bundle-services/get-bundles";
import { GetDeviceListStockType } from "../../services/bundle-services/get-openbox-item-list";
import { GetTotalOrders } from "../../services/bundle-services/get-total-orders";
import { GetPurchasedOrders } from "../../services/bundle-services/get-purchased-orders";
import { GetSoldOrders } from "../../services/bundle-services/get-sold-orders";
import { GetAttachedVendorBankDetails } from "../../services/bundle-services/post-get-attachedVendorBankDetails";
import OfflinePaymentDetails from "../../components/offline-payment-details";
import { GetValidVouchers } from "../../services/bundle-services/post-get-validVouchers";

const { razorpay_key } = getEnvVars();
const razorpayKey = razorpay_key;

const QrRouteScreen = ({ route }) => {
  const { address_info } = route.params;
  const navigation = useNavigation();
  const token = useSelector((state)=>state.token[0]);
  const dealer = useSelector((state)=>state.dealer);
  const cartlist = useSelector((state) => state.cartlist);
  const sumprice = useSelector((state) => state.sumprice);
  const discount = useSelector((state) => state.discount);
  const order_amount= sumprice-discount;
  const [tcsAmount, setTcsAmount] = useState(0);
  const [attachedVendorBank, setAttachedVendorBank] = useState();
  const [validVouchers, setValidVouchers] = useState([]);
  const [salesVoucher, setSalesVoucher] = useState();
  const [spinner, setSpinner] = useState(false);
  const [changeText, setChangeText] = useState('')
  const [changeText1, setChangeText1] = useState('')
  const [text, setText] = useState('')
  const [copyButton, setCopyButton] = useState(false)
  const [paymentType, setPaymentType] = useState("VOUCHER")
  const [checkOffline, setCheckOffline] = useState(true);
  const [checkOnline, setCheckOnline] = useState(false);

  const types = ["NET BANKING", "UPI"];

  const dispatch = useDispatch();
  const {  
    clearCart,
    clearPrice,
    clearQnty,
    clearOrder,
    // clearPurchaseOrder,
    // clearSoldOrder,
    clearOpenBox,
    clearSeltrueBox,
    clearMasterOpenBox,
    clearMasterSeltrueBox,
    clearBrands,
    clearGrades,
    initBrands,
    initGrades,
    initOpenBox,
    initSeltrueBox,
    initMasterOpenBox,
    initMasterSeltrueBox,
    initOrder,
    // initPurchaseOrder,
    // initSoldOrder,
    clearBundle,
    initBundle,} = bindActionCreators(actionCreators, dispatch);


  const handleBackButtonClick = () => {
    // navigation.navigate("ShippingAddressScreen");
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

  useEffect(()=>{
    setSpinner(true);
    const tcsData ={
      "vendorId":dealer[0].vendor_id,
      "orderAmount":order_amount,
      "category_id":dealer[0].category_id,
      "attached_vendor_id": dealer[0].attached_vendor_id
    }
    GetTcsValue(tcsData,token).then((response)=>{
      if(response.status == 1){
        setTcsAmount(response.tcs_value)
        setSpinner(false);
      }
    })
    GetAttachedVendorBankDetails(dealer[0].attached_vendor_id,token).then((res)=>{
      if(res.status == 1){
        setAttachedVendorBank(res.data)
      }
    })
    GetValidVouchers(dealer[0].vendor_id,token).then((res)=>{
      if(res.status == 1){
        setValidVouchers(res.data)
      }
    })

  },[])

  
  const salesDispatchNewcommon =(orderIds)=>{
    const salesDispatchData = {
      "vendor_id": dealer[0]?.vendor_id,
      "salesorder_id":orderIds,
      "dispatch_address": address_info['shippingItem']['shipping_address'],
      "city":address_info['shippingItem']['city'],
      "state": address_info['shippingItem']['state'],
      "pincode": address_info['shippingItem']['pincode']
    };
    console.log(salesDispatchData,'salesDispatchData');
    PostCreateSSSalesDispatch(salesDispatchData, token).then((salesDispatchResponse)=>{
      console.log(salesDispatchResponse,'salesDispatchResponse');
      if(salesDispatchResponse['status'] == 1){
        clearCart();
        clearPrice();
        clearQnty();
        clearBundle();

        GetBundleList(dealer[0].vendor_id,token).then((Res) => {
          if (Res['status'] == 1) {
            initBundle(Res.data);
          }
        })
        
        GetDeviceListStockType({"stock_type":"OPEN BOX","vendor_id":dealer[0].vendor_id},token).then((Res2)=>{
          clearOpenBox()
          clearMasterOpenBox()
          if(Res2.status == 1){
            GetDeviceListStockType({"stock_type":"PREXO","vendor_id":dealer[0].vendor_id},token).then((Res)=>{
              clearSeltrueBox()
              clearMasterSeltrueBox()
              if(Res.status == 1){
                initSeltrueBox((Res.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
                initMasterSeltrueBox((Res.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
              }
            })
            clearBrands()
            clearGrades()
            for(var i=0;i<Res2['data'].length;i++){
              initBrands(Res2['data'][i]['product_brand'])
              initGrades(Res2['data'][i]['certification_grade'])
            }
            initOpenBox((Res2.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
            initMasterOpenBox((Res2.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
          }
        })

        GetTotalOrders(dealer[0].vendor_id,token).then((res)=>{
            if(res['status'] == 1){
            clearOrder();
            for(var i=0;i<res['total_orders'];i++){
              initOrder(res['order_items'][i]);
            }
            }
        })

        // GetPurchasedOrders(dealer[0].vendor_id,token).then((res4)=>{

        //     if(res4?.['status'] == 1){
        //     clearPurchaseOrder()
        //     for(var i=0;i<res4['results'].length;i++){
        //       initPurchaseOrder(res4['results'][i])
        //     }
        //     }
            
        // })

        // GetSoldOrders(dealer[0].vendor_id,token).then((res4)=>{
        //   if(res4?.['status'] == 1){
        //   clearSoldOrder()
        //   for(var i=0;i<res4['results'].length;i++){
        //     initSoldOrder(res4['results'][i])
        //   }
        //   }
        // })

        navigation.navigate('MainScreen',{screen:'OrderScreen'});
    }
    }).catch((e)=>{
        console.log(e,"PostCreateSSSalesDispatch")
    })
  }
  
  const checkout = ()=>{
    const bundleItems=[];
    const spstbundles =[];
    const openboxItems=[];
    const seltrueboxItems=[];
    const orderData = [];
    const bundleIds=[];

    var deviceQty = 0;
    var deviceAmount = 0;
    var stock_type = '';
    
    for(var i=0; i<cartlist.length;i++){
    if(cartlist[i].bundle_no){
        const standard ={
        "bundle_id": cartlist[i].bundle_id
        }
        const bundle_discount_data ={
        "quantity":cartlist[i]['quantity'],
        "amount": cartlist[i]['amount'],
        "saleType": 'bundle',
        "bundleType":"ALL"
        }
        orderData.push(bundle_discount_data);
        bundleItems.push(standard);
        spstbundles.push(cartlist[i].bundle_id);
        bundleIds.push(cartlist[i].bundle_id);

    }else if(cartlist[i].stock_type == 'OPEN BOX'){
        const devices ={
        "grnreport_id": cartlist[i].grnreport_id
        }
        deviceQty= deviceQty + 1;
        deviceAmount = deviceAmount + cartlist[i]['amount'];
        stock_type = cartlist[i]['stock_type'];
        
        if(stock_type == 'OPEN BOX'){
        stock_type = 'openbox';
        }
        openboxItems.push(devices);
    }else if(cartlist[i].stock_type == 'PREXO'){
        const prexoDevices ={
        "grnreport_id": cartlist[i].grnreport_id
        }
        deviceQty= deviceQty + 1;
        deviceAmount = deviceAmount + cartlist[i]['amount'];
        stock_type = cartlist[i]['stock_type'];
        
        if(stock_type == 'OPEN BOX'){
          stock_type = 'openbox';
        }
        seltrueboxItems.push(prexoDevices);
    }
    }

    const distbutorCreateReqData ={
      "bundle_id": spstbundles ,
      "vendor_id": dealer[0].vendor_id,
      "order_discount":discount,
      "attached_vendor_id":dealer[0].attached_vendor_id,
      "category_id":dealer[0].category_id,
      "tcs_value":tcsAmount
    }

    if(spstbundles.length != 0){
      console.log(distbutorCreateReqData);
      PostDistCreateOrder(distbutorCreateReqData,token).then(DistRes =>{
        console.log(DistRes,"PlaceOrderAPI");
        if(DistRes.status == 1){
          const orderIds = [];
          orderIds.push(DistRes?.data?.['order_id']);
          salesDispatchNewcommon(orderIds)
          
          const addPaymentData={
            "payment_reference_no" : changeText,
            "payment_type" : paymentType,
            "vendor_id" : dealer[0].vendor_id,
            "order_id" : DistRes?.data?.['order_id'],
            "payment_to" : dealer[0].attached_vendor_id,
            "amount" : order_amount+tcsAmount,
            // "transaction_amount":changeText1,
            "updated_by" : dealer[0].vendor_id,
            "remarks" : text,
            "status" : "PENDING"
          }
          console.log(addPaymentData,'addPaymentData');
          PostDistPayment(addPaymentData,token).then((res1)=>{
            console.log(res1,"distPayment");
          })
          
        }else{
          alert(DistRes?.message)
        }
      })        
    }

  }

  return( 
    spinner ? (
      <View style={{minHeight:'90%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size='large' color="#999999" />
      </View>
      ):(
        <View style={{flex:1,margin:5}}>
        <ScrollView>
          <View style={{marginBottom:0,alignItems:'center',flexDirection:'row'}}>
            <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:8, elevation:3,padding:0}}>
              <View style={{padding:10,margin:10}}>
                <Text style={{ fontWeight: '500',fontFamily:'serif',color:'#000',fontSize:13,marginBottom:5 }}>Order Amount       :    &#8377;{((order_amount).toString().replace(/\B(?=(\d{5})+(?!\d))/g, ",")).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</Text>
                {tcsAmount != 0 ?(  
                  <Text style={{ fontWeight: '500',fontFamily:'serif',color:'#000',fontSize:13,marginBottom:5 }}>TCS Amount           :    &#8377;{(tcsAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                ):(<></>)} 
                <View style={{borderBottomWidth:1,width:'100%',marginBottom:5}}></View>
                <Text style={{ fontWeight: '700',fontFamily:'serif',color:'#000',fontSize:13 }}>Total Amount       :    &#8377;{((order_amount+tcsAmount).toString().replace(/(\d)(?=(\d{5})+(?!\d))/g, "$1,")).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</Text>
              </View>
            </Card>
            <View style={{alignItems:'flex-start'}}>
              {/* <GifImage
                source={require('../../assets/images/onlineGIF.gif')}
                style={{width: 120,height: 150}}
                resizeMode={'cover'}
              /> */}
          </View>
          </View>
          {/* {dealer[0].category_id != 3 ? */}
            <View style={{marginBottom:20}}>
              <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:8, elevation:5,padding:0}}>
                <CheckBox
                  title='Offline Payment'
                  checked={checkOffline}
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  onPress={()=>{
                    setCheckOffline(true);
                    setCheckOnline(false);
                    setPaymentType('VOUCHER')
                  }}
                  containerStyle={{borderRadius:0,backgroundColor:'#fff',borderColor:'#fff'}}
                />
                {/* <View>{checkOffline && <OfflinePaymentDetails valid = {setOfflinePaymentValid} />}</View> */}
              </Card>
              {(dealer[0].category_id != 3 && dealer[0].category_id != 4)?
              <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:8, elevation:5,padding:0}}>
                <View>   
                  <CheckBox
                    title='Online Payment'
                    checked={checkOnline}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    // checkedColor='#000'
                    onPress={()=>{
                      setCheckOnline(true);
                      setPaymentType('NET BANKING')
                      setCheckOffline(false);
                    }}
                    containerStyle={{borderRadius:0,backgroundColor:'#fff',borderColor:'#fff'}}
                  />
                </View>
              </Card> 
              :<></>
              }
            </View>
            {/* :<></>
          }  */}
          
          {
            checkOnline ?
            <View>
              <View style={{marginBottom:20,alignItems:'center',marginTop:20}}>
                {/* {dealer[0].attached_vendor_upi &&
                  <QRCode
                  value={dealer[0].attached_vendor_upi}
                  size={200}
                />
                } */}
              
                <View style={{width:"90%",borderWidth:2,borderColor:'#ccc',borderRadius:10,padding:10}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>Account No</Text>
                    <Text>{attachedVendorBank?.account_no}</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>Bank</Text>
                    <Text>{attachedVendorBank?.bank_name}</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>Branch</Text>
                    <Text>{attachedVendorBank?.branch}</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>IFSC Code</Text>
                    <Text>{attachedVendorBank?.ifsc_code}</Text>
                  </View>
                </View>
      
                <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
                  <Text>UPI Code : {dealer[0].attached_vendor_upi}</Text>
                  <IconButton
                    icon="content-copy"
                    size={25}
                    color="green"
                    onPress={() => {
                      Clipboard.setString(dealer[0].attached_vendor_upi)
                      setCopyButton(!copyButton)
                      }
                    }
                    disabled = {copyButton}
                  />
                </View>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <View>
                  <TextInput 
                    style={{ fontSize:13,height:40,borderWidth:1,borderRadius:5,marginBottom:10 }}
                    placeholder="Please Enter Transaction ID"
                    value={changeText}
                    onChangeText={(e)=>setChangeText(e)}
                    placeholderTextColor='#9a9a9a'
                  />
                  <TextInput 
                    style={{ fontSize:13,height:40,borderWidth:1,borderRadius:5 }}
                    placeholder="Transaction Amount"
                    value={changeText1}
                    onChangeText={(e)=>setChangeText1(e)}
                    placeholderTextColor='#9a9a9a'
                  />
                </View>
                
                <SelectDropdown
                  data={types}
                  onSelect={(selectedItem, index) => {
                    setPaymentType(selectedItem)
                  }}
                  defaultButtonText={paymentType}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonTextStyle={{fontSize:13,fontFamily:'serif'}}
                  rowTextStyle ={{fontSize:10,fontFamily:'serif'}}
                  renderDropdownIcon={()=><MaterialCommunityIcons name="arrow-left" color={'#ffff'} size={25} />
                }
                  buttonStyle={{borderRadius:5,height:40,width:130,backgroundColor:"#fff",borderWidth:1}}
                />
              </View>
              <TextInput
                style={{ fontSize:14,marginLeft:30,marginRight:30,borderWidth:1,marginTop:20,borderRadius:10}}
                placeholder="Add Description"
                label="Add Description (Upto 300 words)"
                multiline={true}
                numberOfLines={4}
                mode="outlined"
                value={text}
                onChangeText={setText}
              />
            </View>
            :
            <View style={{padding:20}}>
              <SelectDropdown
                data={validVouchers}
                onSelect={(selectedItem, index) => {
                  setSalesVoucher(selectedItem.voucher_no)
                  
                  if(Number(selectedItem.amount) === Number(order_amount+tcsAmount)){
                    setChangeText(selectedItem.voucher_no)
                    setChangeText1(selectedItem.amount)
                  }else{
                    setChangeText('')
                  }
                }}
                defaultButtonText={validVouchers.valid_voucher}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.valid_voucher;
                }}
                rowTextForSelection={(item, index) => {
                    return item.valid_voucher;
                }}
                buttonTextStyle={{fontSize:13,fontFamily:'serif'}}
                rowTextStyle ={{fontSize:10,fontFamily:'serif'}}
                buttonStyle={{borderRadius:5,height:40,width:'100%',backgroundColor:"#fff",borderWidth:1}}
              />
            </View>
          }
         
            <Button 
              title="Next"
              titleStyle={{color:'#000'}}
              containerStyle={{elevation:5,justifyContent:'center',margin:40,borderWidth:1,borderColor:'#bcbcbc'}}
              buttonStyle={{backgroundColor:'#f5932a'}}
              disabled={changeText!= '' ? false : true}
              // onPress={()=>{alert(vocherId)}}
              onPress={checkout}
            />
        </ScrollView>
      </View>   
    )
  );
};

export default QrRouteScreen;