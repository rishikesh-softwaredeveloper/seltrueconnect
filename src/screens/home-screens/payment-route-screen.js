import React, {useState, useEffect} from "react";
import { View, Text ,BackHandler, ScrollView, ActivityIndicator, Dimensions,  TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Modal from 'react-native-modal';
import { CheckBox, Card, Button, Image } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { PostCreateOrder } from "../../services/bundle-services/post-create-order";
import { PostCreatePayment } from "../../services/bundle-services/post-create-payment";
import { GetBundleList } from "../../services/bundle-services/get-bundles";
import { GetDeviceListStockType } from "../../services/bundle-services/get-openbox-item-list";
import { PostCancelOrder } from "../../services/bundle-services/post-cancel-order";
import { GetTotalOrders } from "../../services/bundle-services/get-total-orders";
import { PostCheckPayment } from "../../services/bundle-services/post-check-payment";
import { GetTcsValue } from "../../services/bundle-services/post-get-tcs-value";
import { PostUpdateVocher } from "../../services/bundle-services/post-update-voucher";
import { PostCreateSalesDispatch } from "../../services/bundle-services/post-create-sales-dispatch";
import { PostCreateOfflinePayment } from "../../services/bundle-services/post-create-offline-payments";
import { PostDiscount } from "../../services/bundle-services/post-discount";
// import GifImage from '@lowkey/react-native-gif';
import OfflinePaymentDetails from "../../components/offline-payment-details";
import RazorpayCheckout from 'react-native-razorpay';
import getEnvVars from "../../constants/global";
import SplashScreen from "../splash-screen";
import { GetPurchasedOrders } from "../../services/bundle-services/get-purchased-orders";
import { PostSpstCreateOrder } from "../../services/bundle-services/post-ss-create-order";
import { GetSoldOrders } from "../../services/bundle-services/get-sold-orders";
import { PostDistCreateOrder } from "../../services/bundle-services/post-dist-create-order";
import { PostCreateSSSalesDispatch } from "../../services/bundle-services/post-create-ss-sales-dispatch";
import { PostSsDiscount } from "../../services/bundle-services/post-ss-discount";
import { PostDistPayment } from "../../services/bundle-services/post-dist-payment";
import { GetUpiVendorPayment } from "../../services/bundle-services/get-upi-vendor-payment";
import { GetSloydQrCode } from "../../services/bundle-services/get-sloyd-qr-img";

const { razorpay_key } = getEnvVars();
const razorpayKey = razorpay_key;
const { width,height } = Dimensions.get("screen");


const PaymentRouteScreen = ({ route }) => {
  const { address_info } = route.params;
  
  const navigation = useNavigation();
  const vocherId = useSelector((state) => state.vocherId);
  const token = useSelector((state)=>state.token[0]);
  const dealer = useSelector((state)=>state.dealer);
  const cartlist = useSelector((state) => state.cartlist);
  const sumprice = useSelector((state) => state.sumprice);
  const discount = useSelector((state) => state.discount);
  const [offlinePaymentValid, setOfflinePaymentValid] = useState(true)
  const order_amount= sumprice-discount;
  const [tcsAmount, setTcsAmount] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [vendorQr, setVendorQr] = useState();
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
      addOrder,
      clearBundle,
      initBundle,
      clearVocherId
    } = bindActionCreators(actionCreators, dispatch);

  const [checkOffline, setCheckOffline] = useState(false);
  const [checkOnline, setCheckOnline] = useState(true);
  const [checkUpi, setCheckUpi] = useState(false);
  const [isVisible, setisVisible] = useState(false);

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
      console.log(response,"tcs amount");
      if(response.status == 1){
        setTcsAmount(response.tcs_value)
        setSpinner(false);
      }
    })

  },[])

  const salesDispatchcommon =(orderIds)=>{
    const salesDispatchData = {
      "vendor_id": dealer[0]?.vendor_id,
      "salesorder_id":orderIds,
      "dispatch_address": address_info['shippingItem']['shipping_address'],
      "city": address_info['shippingItem']['city'],
      "state": address_info['shippingItem']['state'],
      "pincode": address_info['shippingItem']['pincode']
    };
    console.log(salesDispatchData,"salesDispatchData");
    
    PostCreateSalesDispatch(salesDispatchData, token).then((salesDispatchResponse)=>{
      console.log(salesDispatchResponse,"salesDispatchResponse");
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
        if(checkOffline == true){
          const updateVocher = {
            "vendor_id":dealer[0].vendor_id,
            "voucher_no":vocherId[0]
          } 
          
          PostUpdateVocher(updateVocher,token).then((response)=>{
            if(response['status'] == 1){
              clearVocherId();
              navigation.navigate('MainScreen',{screen:'OrderScreen'});
              // alert(response['message'])
            }
          })
        }else{
          navigation.navigate('MainScreen',{screen:'OrderScreen'});
        }
       
      }
    }).catch((e)=>{
    })
  }


  const salesDispatchNewcommon =(orderIds)=>{
    const salesDispatchData = {
      "vendor_id": dealer[0]?.vendor_id,
      "salesorder_id":orderIds,
      "dispatch_address": address_info['shippingItem']['shipping_address'],
      "city": address_info['shippingItem']['city'],
      "state": address_info['shippingItem']['state'],
      "pincode": address_info['shippingItem']['pincode']
    };
    console.log(salesDispatchData,'salesDispatchData');
    PostCreateSSSalesDispatch(salesDispatchData, token).then((salesDispatchResponse)=>{
      console.log(salesDispatchResponse,"salesDispatchResponse");
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
        if(checkOffline == true){
          const updateVocher = {
            "vendor_id":dealer[0].vendor_id,
            "voucher_no":vocherId[0]
          } 
          
          PostUpdateVocher(updateVocher,token).then((response)=>{
            if(response['status'] == 1){
              clearVocherId();
              navigation.navigate('MainScreen',{screen:'OrderScreen'});
              // alert(response['message'])
            }
          })
        }else{
          navigation.navigate('MainScreen',{screen:'OrderScreen'}); 
        }
      }
    }).catch((e)=>{
    })
  }


  const offlineDiscount =(res,cartlistAPI,spstCreateReqData,OrderAmt)=>{
    if(res?.['status'] == 1){
      
      if(dealer[0].category_id == 2 || dealer[0].attached_vendor_id == null || dealer[0].attached_vendor_id == ''){
        PostCreateOrder(cartlistAPI,token).then((response)=>{
          if(response.status == 1){
            if(dealer[0].category_id == 2){
              PostSpstCreateOrder(spstCreateReqData,token).then(SpstRes =>{
                console.log(SpstRes,"SPSTRES OFFLINE");
                if(SpstRes.status == 1){
                  const orderIds = [];
                  
                  orderIds.push(SpstRes?.data?.['order_id']);
                  
                  const salesDispatchData = {
                    "vendor_id": dealer[0]?.vendor_id,
                    "salesorder_id":orderIds,
                    "dispatch_address": address_info['shippingItem']['shipping_address'],
                    "city": address_info['shippingItem']['city'],
                    "state": address_info['shippingItem']['state'],
                    "pincode": address_info['shippingItem']['pincode']
                  };

                  PostCreateSSSalesDispatch(salesDispatchData, token).then((salesDispatchResponse)=>{
                    console.log(salesDispatchResponse);
                  })

                  const addPaymentData={
                    "payment_reference_no" : vocherId,
                    "payment_type" : "OFFLINE",
                    "vendor_id" : dealer[0].vendor_id,
                    "order_id" : SpstRes?.data?.['order_id'],
                    "payment_to" : dealer[0].attached_vendor_id,
                    "amount" : OrderAmt,
                    "updated_by" : dealer[0].vendor_id,
                    "remarks" : "",
                    "status" : "PENDING"
                  }
                  PostDistPayment(addPaymentData,token).then((res1)=>{
                    console.log(res1,"distPayment,Rishikesh");
                  })
                }
              })
            }
            var orderIds = [];
            var netPayment = [];
            var order_amount = [];

            for(var i=0; i<response.data.length;i++){
              orderIds.push(response.data[i]['salesorder_id']);
              netPayment.push(response.data[i]['net_payment']);
              order_amount.push(response.data[i]['order_amount'] + response.data[i]['tcs_value']);
            }

            const OfflinePaymentData = {
              "vendor_id":dealer[0].vendor_id,
              "voucher_no": vocherId[0],
              "order_id":orderIds,
              "order_amount":order_amount
            };

          

            PostCreateOfflinePayment(OfflinePaymentData, token).then((offlineResponse)=>{
              console.log(offlineResponse,'offlineResponse');
              if(offlineResponse['status'] == 1){
                salesDispatchcommon(orderIds)
              }
            })
            for(var i=0;i<response.data.length;i++){
              addOrder(response.data[i]);
              GetTotalOrders(dealer[0].vendor_id,token).then((res)=>{
                if(res['status'] == 1){
                  clearOrder();
                  for(var i=0;i<res['total_orders'];i++){
                    initOrder(res['order_items'][i]);
                  }
                }
              })
              // GetPurchasedOrders(dealer[0].vendor_id,token).then((res4)=>{
  
              //   if(res4?.['status'] == 1){
              //     clearPurchaseOrder()
              //     for(var i=0;i<res4['results'].length;i++){
              //       initPurchaseOrder(res4['results'][i])
              //     }
              //   }
                
              // })
              // GetSoldOrders(dealer[0].vendor_id,token).then((res4)=>{
              //   if(res4?.['status'] == 1){
              //     clearSoldOrder()
              //     for(var i=0;i<res4['results'].length;i++){
              //       initSoldOrder(res4['results'][i])
              //     }
              //   }
              // })
            }  
          }else if(response.status == 0){
            clearVocherId();
            alert(response.message);
            navigation.navigate('MainScreen',{screen:'CartScreen'});

          }
        })
      }
    }
  }


  const onlineDiscount =(res,cartlistAPI,spstCreateReqData)=>{
    if(res['status'] == 1){
    console.log(cartlistAPI,'cartlistAPI');
      if(dealer[0].category_id == 2 || dealer[0].attached_vendor_id == null || dealer[0].attached_vendor_id == ''){
        PostCreateOrder(cartlistAPI,token).then((response)=>{
          console.log(response,"createOrder Online");
          if(response.status == 1){
            // if(dealer[0].category_id == 2){
            //   PostSpstCreateOrder(spstCreateReqData,token).then(SpstRes =>{
            //     console.log(SpstRes,'SpstRes');
            //     if(SpstRes.status == 1){
            //       const orderIds = [];
            //       orderIds.push(SpstRes?.data?.['order_id']);
            //       salesDispatchNewcommon(orderIds)
            //       const salesDispatchData = {
            //         "vendor_id": dealer[0]?.vendor_id,
            //         "salesorder_id":orderIds,
            //         "dispatch_address": address_info['shippingItem']['shipping_address'],
            //         "city": address_info['shippingItem']['city'],
            //         "state": address_info['shippingItem']['state'],
            //         "pincode": address_info['shippingItem']['pincode']
            //       };
            //       PostCreateSSSalesDispatch(salesDispatchData, token).then((salesDispatchResponse)=>{
            //         console.log(salesDispatchResponse);
            //       })
            //       const addPaymentData={
            //         "payment_reference_no" : "ONLINE",
            //         "payment_type" : "ONLINE",
            //         "vendor_id" : dealer[0].vendor_id,
            //         "order_id" : SpstRes?.data?.['order_id'],
            //         "payment_to" : dealer[0].attached_vendor_id,
            //         "amount" : order_amount+tcsAmount,
            //         "updated_by" : dealer[0].vendor_id,
            //         "remarks" : "",
            //         "status" : "PENDING"
            //       }
            //       console.log(addPaymentData,"addPaymentData");
            //       PostDistPayment(addPaymentData,token).then((res1)=>{
            //         console.log(res1,"distPayment");
            //       })
            //     }
            //   })
            // }
              
              var orderIds = [];
              var netPayment = [];
              
              for(var i=0; i<response.data.length;i++){
                orderIds.push(response.data[i]['salesorder_id']);
                netPayment.push(response.data[i]['order_amount']+response.data[i]['tcs_value']);
              }

              var options = {
                // description: 'Credits towards consultation',
                image: 'https://erp.sloyd.in/assets/img/logo_invoice.png',
                currency: 'INR',
                key: razorpayKey,
                amount: (order_amount+tcsAmount)*100,
                name: 'Sloyd Ventures Pvt LTD.',
                // order_id: response.data[0]['salesorder_id'],
                prefill: {
                  email: dealer[0].email,
                  contact: dealer[0].mobile,
                  name: dealer[0].name
                },
                theme: {color: '#1194f6'}
              }

              RazorpayCheckout.open(options).then((data)=>{
                if(data.razorpay_payment_id !==''){
                  data.order_id = orderIds;
                  data.vendor_id = dealer[0].vendor_id;
                  data.netPayment = netPayment;
                  data.amount = order_amount+tcsAmount;
                  data.currency = 'INR';
                  console.log(data,'PostCreatePayment req');
                  PostCreatePayment(data,token).then((Response)=>{
                    console.log(Response,"pOSTcREATEpAMENT");
                    if(Response.status == 1){
                      if(dealer[0].category_id == 2){
                        PostSpstCreateOrder(spstCreateReqData,token).then(SpstRes =>{
                          console.log(SpstRes,'SpstRes');
                          if(SpstRes.status == 1){
                            const orderIds = [];
                            orderIds.push(SpstRes?.data?.['order_id']);
                            salesDispatchNewcommon(orderIds)
                            const salesDispatchData = {
                              "vendor_id": dealer[0]?.vendor_id,
                              "salesorder_id":orderIds,
                              "dispatch_address": address_info['shippingItem']['shipping_address'],
                              "city": address_info['shippingItem']['city'],
                              "state": address_info['shippingItem']['state'],
                              "pincode": address_info['shippingItem']['pincode']
                            };
                            PostCreateSSSalesDispatch(salesDispatchData, token).then((salesDispatchResponse)=>{
                              console.log(salesDispatchResponse);
                            })
                            const addPaymentData={
                              "payment_reference_no" : "ONLINE",
                              "payment_type" : "ONLINE",
                              "vendor_id" : dealer[0].vendor_id,
                              "order_id" : SpstRes?.data?.['order_id'],
                              "payment_to" : dealer[0].attached_vendor_id,
                              "amount" : order_amount+tcsAmount,
                              "updated_by" : dealer[0].vendor_id,
                              "remarks" : "",
                              "status" : "PENDING"
                            }
                            console.log(addPaymentData,"addPaymentData");
                            PostDistPayment(addPaymentData,token).then((res1)=>{
                              console.log(res1,"distPayment");
                            })
                          }
                        })
                      }
                      salesDispatchcommon(orderIds)
                    }
                    else if(Response.status == 0){
                      alert(Response.message);
                      navigation.navigate('MainScreen',{screen:'CartScreen'});
                    }
                  })
                }else{
                  const cancelorder ={
                    "vendor_id":dealer[0].vendor_id,
                    "order_id":orderIds
                  }

                  PostCancelOrder(cancelorder,token).then((cancelResponse)=>{
                      if(cancelResponse['status'] == 1){
                        GetTotalOrders(dealer[0].vendor_id,token).then((res)=>{
                          if(res['status'] == 1){
                            clearOrder();
                            for(var i=0;i<res['total_orders'];i++){
                              initOrder(res['order_items'][i]);
                            }
                          }
                        })
                        // GetPurchasedOrders(dealer[0].vendor_id,token).then((res4)=>{
                        //   if(res4?.['status'] == 1){
                        //     clearPurchaseOrder()
                        //     for(var i=0;i<res4['results'].length;i++){
                        //       initPurchaseOrder(res4['results'][i])
                        //     }
                        //   }
                        // })

                        // GetSoldOrders(dealer[0].vendor_id,token).then((res4)=>{
                        //   if(res4?.['status'] == 1){
                        //     clearSoldOrder()
                        //     for(var i=0;i<res4['results'].length;i++){
                        //       initSoldOrder(res4['results'][i])
                        //     }
                        //   }
                        // })
                        navigation.navigate('MainScreen',{screen:'CartScreen'});
                      }
                  })
                }
              }).catch((error) => {
                const cancelorder ={
                  "vendor_id":dealer[0].vendor_id,
                  "order_id":orderIds
                }

                PostCancelOrder(cancelorder,token).then((cancelResponse)=>{
                  if(cancelResponse['status'] == 1){
                    GetTotalOrders(dealer[0].vendor_id,token).then((res)=>{
                      if(res['status'] == 1){
                        clearOrder();
                        for(var i=0;i<res['total_orders'];i++){
                          initOrder(res['order_items'][i]);
                        }
                      }
                    })
                    // GetPurchasedOrders(dealer[0].vendor_id,token).then((res4)=>{
      
                    //   if(res4?.['status'] == 1){
                    //     clearPurchaseOrder()
                    //     for(var i=0;i<res4['results'].length;i++){
                    //       initPurchaseOrder(res4['results'][i])
                    //     }
                    //   }
                      
                    // })
                    // GetSoldOrders(dealer[0].vendor_id,token).then((res4)=>{
                    //   if(res4?.['status'] == 1){
                    //     clearSoldOrder()
                    //     for(var i=0;i<res4['results'].length;i++){
                    //       initSoldOrder(res4['results'][i])
                    //     }
                    //   }
                    // })
                    navigation.navigate('MainScreen',{screen:'CartScreen'});
                  }
                })
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
              });
              //if success 
              for(var i=0;i<response.data.length;i++){
                addOrder(response.data[i]);
                GetTotalOrders(dealer[0].vendor_id,token).then((res)=>{
                  if(res['status'] == 1){
                    clearOrder();
                    for(var i=0;i<res['total_orders'];i++){
                      initOrder(res['order_items'][i]);
                    }
                  }
                })
                // GetPurchasedOrders(dealer[0].vendor_id,token).then((res4)=>{
      
                //   if(res4?.['status'] == 1){
                //     clearPurchaseOrder()
                //     for(var i=0;i<res4['results'].length;i++){
                //       initPurchaseOrder(res4['results'][i])
                //     }
                //   }
                  
                // })
                // GetSoldOrders(dealer[0].vendor_id,token).then((res4)=>{
                //   if(res4?.['status'] == 1){
                //     clearSoldOrder()
                //     for(var i=0;i<res4['results'].length;i++){
                //       initSoldOrder(res4['results'][i])
                //     }
                //   }
                // })
                navigation.navigate('MainScreen',{screen:'OrderScreen'});
              }   
          }else if(response.status == 0){
            alert(response.message);
            navigation.navigate('MainScreen',{screen:'CartScreen'});
          }
        })
      }
    }
  }

  const checkout = ()=>{
    if(checkOnline){
      // navigation.navigate("SplashScreen")

      const bundleItems = [];
      const spstbundles =[];
      const openboxItems = [];
      const seltrueboxItems=[];
      const bundleIds = [];
      const orderData = [];

      var deviceQty = 0;
      var deviceAmount =0;
      var stock_type = '';

      for(let i = 0; i < cartlist.length; i++){
        if(cartlist[i].bundle_no){
            const standard = {
              "bundle_id": cartlist[i].bundle_id
            }

            const bundle_discount_data ={
              "quantity":cartlist[i]['quantity'],
              "amount": Number(cartlist[i]['amount']),
              "saleType": 'bundle',
              "bundleType":"ALL"
            }
            deviceQty= deviceQty+10;
            deviceAmount = deviceAmount+Number(cartlist[i]['amount']);

            orderData.push(bundle_discount_data);
            bundleItems.push(standard);
            spstbundles.push(cartlist[i].bundle_id);
            bundleIds.push(cartlist[i].bundle_id);
        }else if(cartlist[i].stock_type =='OPEN BOX'){
            const devices = {
              "grnreport_id": cartlist[i].grnreport_id
            }
            const bundle_discount_data ={
              "quantity":cartlist[i]['quantity'],
              "amount": cartlist[i]['amount'],
              "saleType": 'openbox',
              "bundleType":"ALL"
            }
            orderData.push(bundle_discount_data);

            deviceQty= deviceQty+1;
            deviceAmount = deviceAmount+Number(cartlist[i]['amount']);
            stock_type = cartlist[i]['stock_type'];
                
            if(stock_type == 'OPEN BOX'){
              stock_type = 'openbox';
            }
            openboxItems.push(devices);
        }else if(cartlist[i].stock_type =='PREXO'){
          const prexoDevices = {
            "grnreport_id": cartlist[i].grnreport_id
          }
          const bundle_discount_data ={
            "quantity":cartlist[i]['quantity'],
            "amount": cartlist[i]['amount'],
            "saleType": 'prexo',
            "bundleType":"ALL"
          }
          orderData.push(bundle_discount_data);

          deviceQty= deviceQty+1;
          deviceAmount = deviceAmount+Number(cartlist[i]['amount']);
          stock_type = cartlist[i]['stock_type'];
              
            if(stock_type == 'PREXO'){
                stock_type = 'prexo';
            }
          seltrueboxItems.push(prexoDevices);
        }
      }

      // const deviceDiscount ={
      //   "quantity":deviceQty,
      //   "amount": deviceAmount,
      //   "saleType":stock_type.toLowerCase(),
      //   "bundleType":''
      // }

      const ssDeviceDiscount ={
        "category_id" : dealer[0].category_id,
        "orderData": [
          {
            "quantity"  : deviceQty,
            "amount"    : deviceAmount,
            "saleType" : "bundle",
            "bundleType" : "ALL"
          }
        ]
      }

      // orderData.push(deviceDiscount);
  
      if(cartlist.length !== 0){
        dealer[0].attached_vendor_id == null || dealer[0].attached_vendor_id == '' ?
        PostDiscount({"orderData":orderData},token).then((res)=>{
         console.log(res,"Res_1");
         
          const cartlistAPI = {
            "vendor_id": dealer[0].vendor_id,
            "bundle_data": bundleItems,
            "prexo_data":seltrueboxItems,
            "open_box_data": openboxItems,
            "bundle_discount": res['data']['bundleDcAmount'],
            "openbox_discount": res['data']['openboxDcAmount']
          };
    
          const spstCreateReqData ={
            "bundle_id": spstbundles ,
            "order_discount":discount,
            "vendor_id": dealer[0].vendor_id,
            "attached_vendor_id":dealer[0].attached_vendor_id,
            "tcs_value":tcsAmount,
            'discount_percent': res['data']['discount_percent']
          }
          onlineDiscount(res,cartlistAPI,spstCreateReqData)
        })
        :
        PostSsDiscount(ssDeviceDiscount,token).then((res)=>{
          console.log(res,"Res_2");
          const cartlistAPI = {
            "vendor_id": dealer[0].vendor_id,
            "bundle_data": bundleItems,
            "prexo_data":seltrueboxItems,
            "open_box_data": openboxItems,
            "bundle_discount": res['data']['bundleDcAmount'],
            "openbox_discount": res['data']['openboxDcAmount']
          };
    
          const spstCreateReqData ={
            "bundle_id": spstbundles ,
            "order_discount":discount,
            "vendor_id": dealer[0].vendor_id,
            "attached_vendor_id":dealer[0].attached_vendor_id,
            "tcs_value":tcsAmount,
            'discount_percent': res['data']['discount_percent']
          }

          onlineDiscount(res,cartlistAPI,spstCreateReqData)
        })
      }
    }else if(checkOffline){
      // navigation.navigate("SplashScreen");

      let checkVocher ={
        "vendor_id":dealer[0].vendor_id,
        "voucher_no":vocherId[0],
        "order_amount":order_amount+tcsAmount
      }
      
      PostCheckPayment(checkVocher, token).then((response)=>{
        if(response['status'] == 1){

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
              deviceQty= deviceQty+10;
              deviceAmount = deviceAmount+Number(cartlist[i]['amount']);
              console.log(bundle_discount_data,'bundle_discount_data');
              
              orderData.push(bundle_discount_data);
              bundleItems.push(standard);
              spstbundles.push(cartlist[i].bundle_id);
              bundleIds.push(cartlist[i].bundle_id);

            }else if(cartlist[i].stock_type == 'OPEN BOX'){
              const devices ={
                "grnreport_id": cartlist[i].grnreport_id
              }
              
              const bundle_discount_data ={
                "quantity":cartlist[i]['quantity'],
                "amount": cartlist[i]['amount'],
                "saleType": 'openbox',
                "bundleType":"ALL"
              }
              orderData.push(bundle_discount_data);

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
              const bundle_discount_data ={
                "quantity":cartlist[i]['quantity'],
                "amount": cartlist[i]['amount'],
                "saleType": 'prexo',
                "bundleType":"ALL"
              }
              orderData.push(bundle_discount_data);
              deviceQty= deviceQty + 1;
              deviceAmount = deviceAmount + cartlist[i]['amount'];
              stock_type = cartlist[i]['stock_type'];
                
              if(stock_type == 'PREXO'){
                  stock_type = 'prexo';
              }
              seltrueboxItems.push(prexoDevices);
            }
          }

          // const deviceDiscount ={
          //   "quantity": deviceQty ,
          //   "amount": deviceAmount,
          //   "saleType":stock_type.toLowerCase(),
          //   "bundleType":''
          // }

          const ssDeviceDiscount ={
            "category_id" : dealer[0].category_id,
            "orderData": [
              {
                "quantity"  : deviceQty,
                "amount"    : deviceAmount,
                "saleType" : "bundle",
                "bundleType" : "ALL"
              }
            ]
          }

          // orderData.push(deviceDiscount);
          if(cartlist.length !== 0){
            console.log(orderData,"OrderData");
            
            dealer[0].attached_vendor_id == null || dealer[0].attached_vendor_id == '' ?
            PostDiscount({"orderData":orderData},token).then((res)=>{              
              console.log(res,"Res_3");
              const cartlistAPI = {
                "vendor_id": dealer[0].vendor_id,
                "bundle_data": bundleItems,
                "prexo_data":seltrueboxItems,
                "open_box_data": openboxItems,
                "bundle_discount": res['data']['bundleDcAmount'],
                "openbox_discount": res['data']['openboxDcAmount']
              };
        
              const spstCreateReqData ={
                "bundle_id": spstbundles ,
                "order_discount":discount,
                "vendor_id": dealer[0].vendor_id,
                "attached_vendor_id":dealer[0].attached_vendor_id,
                "tcs_value":tcsAmount,
                'discount_percent': res['data']['discount_percent']
              }
              const OrderAmt = order_amount+tcsAmount;
              offlineDiscount(res,cartlistAPI,spstCreateReqData,OrderAmt)
            })
            :
            PostSsDiscount(ssDeviceDiscount,token).then((res)=>{
              console.log(res,"Res_4");
              const cartlistAPI = {
                "vendor_id": dealer[0].vendor_id,
                "bundle_data": bundleItems,
                "prexo_data":seltrueboxItems,
                "open_box_data": openboxItems,
                "bundle_discount": res['data']['bundleDcAmount'],
                "openbox_discount": res['data']['openboxDcAmount']
              };
        
              const spstCreateReqData ={
                "bundle_id": spstbundles ,
                "order_discount":discount,
                "vendor_id": dealer[0].vendor_id,
                "attached_vendor_id":dealer[0].attached_vendor_id,
                "tcs_value":tcsAmount,
                'discount_percent': res['data']['discount_percent']
              }
              const OrderAmt = order_amount+tcsAmount;
              offlineDiscount(res,cartlistAPI,spstCreateReqData,OrderAmt)
            })
          }
        }else if(response['status'] === 0){
          clearVocherId();
          navigation.navigate('MainScreen',{screen:'CartScreen'});
        }
      })
    }
  }


  const upiCheckout = (UpdateQRData)=>{
    const bundleItems = [];
    const spstbundles =[];
    const openboxItems = [];
    const seltrueboxItems=[];
    const bundleIds = [];
    const orderData = [];

    var deviceQty = 0;
    var deviceAmount =0;
    var stock_type = '';

    for(let i = 0; i < cartlist.length; i++){
      if(cartlist[i].bundle_no){
          const standard = {
            "bundle_id": cartlist[i].bundle_id
          }

          const bundle_discount_data ={
            "quantity":cartlist[i]['quantity'],
            "amount": Number(cartlist[i]['amount']),
            "saleType": 'bundle',
            "bundleType":"ALL"
          }
          deviceQty= deviceQty+10;
          deviceAmount = deviceAmount+Number(cartlist[i]['amount']);

          orderData.push(bundle_discount_data);
          bundleItems.push(standard);
          spstbundles.push(cartlist[i].bundle_id);
          bundleIds.push(cartlist[i].bundle_id);
      }else if(cartlist[i].stock_type =='OPEN BOX'){
          const devices = {
            "grnreport_id": cartlist[i].grnreport_id
          }
          deviceQty= deviceQty+1;
          deviceAmount = deviceAmount+Number(cartlist[i]['amount']);
          stock_type = cartlist[i]['stock_type'];
              
          if(stock_type == 'OPEN BOX'){
            stock_type = 'openbox';
          }
          openboxItems.push(devices);
      }else if(cartlist[i].stock_type =='PREXO'){
        const prexoDevices = {
          "grnreport_id": cartlist[i].grnreport_id
        }
        deviceQty= deviceQty+1;
        deviceAmount = deviceAmount+Number(cartlist[i]['amount']);
        stock_type = cartlist[i]['stock_type'];
            
          if(stock_type == 'OPEN BOX'){
              stock_type = 'openbox';
          }
        seltrueboxItems.push(prexoDevices);
      }
    }

    const ssDeviceDiscount ={
      "category_id" : dealer[0].category_id,
      "orderData": [
        {
          "quantity"  : deviceQty,
          "amount"    : deviceAmount,
          "saleType" : "bundle",
          "bundleType" : "ALL"
        }
      ]
    }

    if(cartlist.length !== 0){
      dealer[0].attached_vendor_id == null || dealer[0].attached_vendor_id == '' ?
      PostDiscount({"orderData":orderData},token).then((res)=>{
       console.log(res,"Res_5");
        const cartlistAPI = {
          "vendor_id": dealer[0].vendor_id,
          "bundle_data": bundleItems,
          "prexo_data":seltrueboxItems,
          "open_box_data": openboxItems,
          "bundle_discount": res['data']['bundleDcAmount'],
          "openbox_discount": res['data']['openboxDcAmount']
        };
  
        const spstCreateReqData ={
          "bundle_id": spstbundles ,
          "order_discount":discount,
          "vendor_id": dealer[0].vendor_id,
          "attached_vendor_id":dealer[0].attached_vendor_id,
          "tcs_value":tcsAmount,
          'discount_percent': res['data']['discount_percent']
        }
        navigation.navigate("AddQRImagesScreen",{"address_info":address_info,"res":res,"cartlistAPI":cartlistAPI,"spstCreateReqData":spstCreateReqData,'vendorQr':vendorQr})
        // upiDiscount(res,cartlistAPI,spstCreateReqData)
      })
      :
      PostSsDiscount(ssDeviceDiscount,token).then((res)=>{
        console.log(res,"Res_6");
        const cartlistAPI = {
          "vendor_id": dealer[0].vendor_id,
          "bundle_data": bundleItems,
          "prexo_data":seltrueboxItems,
          "open_box_data": openboxItems,
          "bundle_discount": res['data']['bundleDcAmount'],
          "openbox_discount": res['data']['openboxDcAmount']
        };
  
        const spstCreateReqData ={
          "bundle_id": spstbundles ,
          "order_discount":discount,
          "vendor_id": dealer[0].vendor_id,
          "attached_vendor_id":dealer[0].attached_vendor_id,
          "tcs_value":tcsAmount,
          'discount_percent': res['data']['discount_percent']
        }
        navigation.navigate("AddQRImagesScreen",{"address_info":address_info,"discountRes":res,"cartlistAPI":cartlistAPI,"spstCreateReqData":spstCreateReqData,'vendorQr':vendorQr})
        // upiDiscount(res,cartlistAPI,spstCreateReqData)
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
                <Text style={{ fontWeight: '500',fontFamily:'serif',color:'#000',fontSize:13,marginBottom:5 }}>Order Amount       :    &#8377;{(parseFloat(order_amount.toFixed(2)).toString().replace(/\B(?=(\d{5})+(?!\d))/g, ",")).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</Text>
                {tcsAmount != 0 ?(  
                  <Text style={{ fontWeight: '500',fontFamily:'serif',color:'#000',fontSize:13,marginBottom:5 }}>TCS Amount           :    &#8377;{(parseFloat(tcsAmount.toFixed(2))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                ):(<></>)} 
                <View style={{borderBottomWidth:1,width:'100%',marginBottom:5}}></View>
                <Text style={{ fontWeight: '700',fontFamily:'serif',color:'#000',fontSize:13 }}>Total Amount       :   &#8377;{(parseFloat((order_amount + tcsAmount).toFixed(2)).toString().replace(/\B(?=(\d{5})+(?!\d))/g, ",")).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</Text>
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
          <View style={{marginBottom:20}}>
            <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:8, elevation:5,padding:0}}>
              <View>   
                <CheckBox
                  title='Online-Razorpay'
                  checked={checkOnline}
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  // checkedColor='#000'
                  onPress={()=>{
                    setCheckOnline(true);
                    setCheckUpi(false);
                    setCheckOffline(false);
                    setOfflinePaymentValid(!offlinePaymentValid);
                  }}
                  containerStyle={{borderRadius:0,backgroundColor:'#fff',borderColor:'#fff'}}
                />
              </View>
            </Card> 
            {/* <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:8, elevation:5,padding:0}}>
              <View>   
                <CheckBox
                  title='Online-QRcode'
                  checked={checkUpi}
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  // checkedColor='#000'
                  onPress={()=>{
                    // GetUpiVendorPayment(dealer[0].vendor_id,token).then((res)=>{
                    //   console.log(res,'vendorQR');
                    //   if(res.status == 1){
                    //     setVendorQr(res.data)
                    //     setisVisible(true);
                    //   }else{
                    //     alert(res.message)
                    //   }
                    // })
                    GetSloydQrCode(token).then((res)=>{
                      console.log(res,'GetSloydQrCode');
                      if(res.status == 1){
                        setVendorQr(res.data)
                        setisVisible(true);
                      }else{
                        alert(res.message)
                      }
                    })

                    setCheckUpi(true);
                    setCheckOnline(false);
                    setCheckOffline(false);
                    setOfflinePaymentValid(!offlinePaymentValid);
                  }}
                  containerStyle={{borderRadius:0,backgroundColor:'#fff',borderColor:'#fff'}}
                />
              </View>
            </Card> */}
            {(dealer[0].category_id == 2 || dealer[0].attached_vendor_id == null || dealer[0].attached_vendor_id == '' )?
              <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:8, elevation:5,padding:0}}>
              <CheckBox
                title='Offline-Voucher'
                checked={checkOffline}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={()=>{
                  setCheckOffline(true);
                  setCheckOnline(false);
                  setCheckUpi(false);
                }}
                containerStyle={{borderRadius:0,backgroundColor:'#fff',borderColor:'#fff'}}
              />
              <View>{checkOffline && <OfflinePaymentDetails valid = {setOfflinePaymentValid} />}</View>
              </Card>
                :<></>
            }

            
          </View>
          <Modal
            isVisible={isVisible}
            animationIn='fadeIn'
            animationOut='fadeOut'
            style={{ justifyContent: 'center', alignItems: 'center',padding:0,margin:0 }}
          >
              <View style={{ backgroundColor:'#ffffff', width:width-60,borderRadius:5}}>
                  <View style={{backgroundColor:'#dddddd',padding:10,margin:0,borderTopLeftRadius:5,borderTopRightRadius:5}}>
                      <Text style={{ color:'#333333',fontWeight:'700'}}>UPI PAYMENT</Text>
                  </View>
                  <View style={{padding:20,width:"90%"}}>
                      
                      <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20,alignItems:'center'}}>
                        <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
                          {vendorQr != undefined &&
                          <Image source={{ uri: vendorQr.image_url}} style={{ width: 100, height: 100 }} />
                          }
                          </View>
                        <View style={{marginLeft:0,backgroundColor:'#2596be',borderColor:'#4cae4c',marginTop:5, marginBottom:5, padding:7,borderRadius:5,marginLeft:20, alignItems:'center'}}>    
                          <TouchableOpacity onPress={() => {
                            setisVisible(false)
                            upiCheckout()
                           }}>
                              <Text style={{ color:'#333333',fontWeight:'700'}}>UPLOAD SCREENSHOTS</Text>
                          </TouchableOpacity>
                        </View>
                      </View>                             
                  </View>
                  
                  <View style={{backgroundColor:'#dddddd',padding:2, flexDirection:'row', justifyContent:'center'}}>
                      <View style={{marginLeft:0,backgroundColor:'#5cb85c',borderColor:'#4cae4c',marginTop:5, marginBottom:5, padding:7,borderRadius:5,width:80, alignItems:'center'}}>
                          <TouchableOpacity onPress={() => setisVisible(false) }>
                              <Text style={{color:'#ffffff'}}>Close</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </Modal>
          <View>
            <Button 
              title="Next"
              containerStyle={{elevation:5,justifyContent:'center',margin:20}}
              buttonStyle={{backgroundColor:'#f5932a'}}
              // disabled={!offlinePaymentValid}
              // onPress={()=>{alert(vocherId)}}
              onPress={checkout}
            />
          </View>
        </ScrollView>
      </View>   
    )
  );
};

export default PaymentRouteScreen;