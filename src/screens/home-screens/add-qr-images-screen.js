import React, { useEffect, useState } from "react";
// import * as Location from 'expo-location';
import { View, Text,TextInput,FlatList, Alert, BackHandler,Dimensions, TouchableOpacity,PermissionsAndroid, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Image} from "react-native-elements";
import { launchImageLibrary } from 'react-native-image-picker';

import { PostAddBankAccount } from "../../services/bundle-services/post-add-bank-account";
import { GetBankAccounts } from "../../services/bundle-services/get-bank-accounts";
import { PostUploadQrCodeImage } from "../../services/bundle-services/post-upload-payment-qr";
import { PostAddQRCode } from "../../services/bundle-services/post-add-qr-code";
import { GetQrImageList } from "../../services/bundle-services/get-qr-image-list";
import { PostUploadQrPaymentsImgs } from "../../services/bundle-services/post-upload-qrpayments-imgs";
import { PostDiscount } from "../../services/bundle-services/post-discount";
import { PostSsDiscount } from "../../services/bundle-services/post-ss-discount";
import { PostCreateOrder } from "../../services/bundle-services/post-create-order";
import { PostSpstCreateOrder } from "../../services/bundle-services/post-ss-create-order";
import { PostCreateSSSalesDispatch } from "../../services/bundle-services/post-create-ss-sales-dispatch";
import { PostDistPayment } from "../../services/bundle-services/post-dist-payment";
import { GetBundleList } from "../../services/bundle-services/get-bundles";
import { GetDeviceListStockType } from "../../services/bundle-services/get-openbox-item-list";
import { PostUpdateVocher } from "../../services/bundle-services/post-update-voucher";
import { PostCreateSalesDispatch } from "../../services/bundle-services/post-create-sales-dispatch";
import { PostUploadQrPaymentImage } from "../../services/bundle-services/post-upload-qr-payment-image";
import { PostCreatePayment } from "../../services/bundle-services/post-create-payment";
import { GetTotalOrders } from "../../services/bundle-services/get-total-orders";
import { GetPurchasedOrders } from "../../services/bundle-services/get-purchased-orders";
import { GetSoldOrders } from "../../services/bundle-services/get-sold-orders";
import { PostUpdateQRPaymentDetails } from "../../services/bundle-services/post-update-qr-payment-details";


const AddQRImagesScreen = ({ route }) => {
  const { address_info } = route.params;
  const { discountRes } = route.params;
  const { cartlistAPI } = route.params;
  const { spstCreateReqData } = route.params;
  const { vendorQr } = route.params;

    const [images, setImages] = useState([]);
    const [qrImageList, setQrImageList] = useState([]);
    const navigation = useNavigation();
    const dealer = useSelector((state)=>state.dealer);
    const cartlist = useSelector((state) => state.cartlist);
    const token = useSelector((state) => state.token[0]);
    const sumprice = useSelector((state) => state.sumprice);
    const discount = useSelector((state) => state.discount);
    const vendor_id = dealer[0].vendor_id;
    const order_amount= sumprice-discount;
    const [tcsAmount, setTcsAmount] = useState(0);

    const dispatch = useDispatch();
    const { 
      initQrImage,
      clearQrImage,
      clearCart,
      clearPrice,
      clearQnty,
      clearOrder,
      // clearPurchaseOrder,
      clearSoldOrder,
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
      initSoldOrder,
      addOrder,
      clearBundle,
      initBundle,
      clearVocherId
    } = bindActionCreators(actionCreators,dispatch);


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
          
          navigation.navigate('MainScreen',{screen:'OrderScreen'});
              
        }
      }).catch((e)=>{
      })
    }


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
          
          navigation.navigate('MainScreen',{screen:'OrderScreen'});
              
        }
      }).catch((e)=>{
      })
    }


    const upiDiscount =(res,cartlistAPI,spstCreateReqData,UpdateQRData)=>{
      if(res['status'] == 1){
      console.log(cartlistAPI,'cartlistAPI');
        if(dealer[0].category_id == 2 || dealer[0].attached_vendor_id == null || dealer[0].attached_vendor_id == ''){
          PostCreateOrder(cartlistAPI,token).then((response)=>{
            console.log(response,"createOrder Online");
            if(response.status == 1){
                
                var orderIds = [];
                var netPayment = [];
                
                for(var i=0; i<response.data.length;i++){
                  orderIds.push(response.data[i]['salesorder_id']);
                  netPayment.push(response.data[i]['order_amount']+response.data[i]['tcs_value']);
                }
  
                const images_names = [];
                UpdateQRData.forEach(e=>images_names.push(e.filename));
                const data = {
                  "order_id" : orderIds,
                  "qrcode_id" : vendorQr.qr_id,
                  "image_names" :images_names
                }
                
                console.log(data,'PostCreatePayment req');
                PostUpdateQRPaymentDetails(data,token).then((Response)=>{
                  console.log(Response,"PostUpdateQRPaymentDetails");
                  
                  if(Response.status == 1){
                    const payData = {
                      "razorpay_payment_id": "pay_Jvv2TjJ74HfxvJ",
                      "order_id": orderIds,
                      "vendor_id": dealer[0]?.vendor_id,
                      "netPayment": netPayment,
                      "amount": order_amount+tcsAmount,
                      "currency": "INR"
                    }

                    PostCreatePayment(payData,token).then((payRes)=>{
                      if(payRes.status == 1){
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
                      
                    })
                  }
                  else if(Response.status == 0){
                    alert(Response.message);
                    navigation.navigate('MainScreen',{screen:'CartScreen'});
                  }
                })
                

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

    const handlePickImage = async () => {
      try {
        const pickedImages = await pickImage();
        setImages(pickedImages);
      } catch (error) {
        console.error(error);
      }
    };

    const handleUploadImage = async () => {
      if (images.length > 0) {
        await uploadImages(images);
        setImages([])
      } else {
        console.error('No image selected');
      }
    };
    
    const pickImage = async () => {

      let options = {
        mediaType: 'photo',
        maxWidth: 400,
        maxHeight: 400,
        quality: 1,
        selectionLimit: 5
      };
      
      return new Promise((resolve, reject) => {
        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            reject('User cancelled image picker');
          } else if (response.error) {
            reject('ImagePicker Error: ' + response.error);
          } else if (response.customButton) {
            reject('User tapped custom button: ' + response.customButton);
          } else {
            // const source = { uri: response.assets[0].uri };
            resolve(response.assets);
          }
        });
      });
    };
    
    const uploadImages = async (mulipleImages) => {
      const formData = new FormData();
      mulipleImages.forEach((image, index) => {
          formData.append('images', {
            uri: image.uri,
            type: image.type,
            name: image.fileName || `image_${index}.jpg`,
          });
      });
      console.log(formData,"formdata");
      await  PostUploadQrPaymentsImgs(formData,token).then((res)=>{

          if(res.status == 1 || res.status != undefined){
            console.log(res);
            upiDiscount(discountRes,cartlistAPI,spstCreateReqData,res.image_data)
          }else{
            Alert.alert(res.message)
          }
        })
    };

    


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
        <View style={{flex:1}}>
        
        <View style={{flexDirection:'row',justifyContent:'flex-start',borderBottomWidth:0,paddingBottom:10,marginTop:36,padding:20,backgroundColor:'#1194f6'}}>
            <TouchableOpacity style={{marginLeft:5}} onPress={Previous}>
                <MaterialCommunityIcons name="arrow-left" color={'#ffff'} size={25} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'left',marginLeft:"33%" ,fontSize: 20,color:'#ffff' }}>QR Images</Text>
        </View>
        <View style={{justifyContent:'center',alignContent:'center',padding:6,paddingTop:40,flex:1}}>

            <View style={{flexDirection:"row",justifyContent:"space-around",paddingleft:5,marginTop:20,boderRadius:10,}}>
                <Button title='Pick an Image' onPress={handlePickImage} buttonStyle={{backgroundColor:'#638ccf',borderRadius:10}}/>
                {images.length > 0 ?
                  <Button title='Upload Image' onPress={handleUploadImage} buttonStyle={{backgroundColor:'#638ccf',borderRadius:10}}/>
                :<></>
                }
            </View>
            <FlatList
              data={images}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Image source={{ uri: item.uri }} style={styles.image} />
              )}
              numColumns={3} // Number of columns in the grid
              contentContainerStyle={styles.flatListContent}
            />

        </View>
            
        </View>
    )
};

const styles = StyleSheet.create({
  
  flatListContent: {
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginTop:40
  },
  image: {
    width: (Dimensions.get('window').width / 3) - 10,
    height: (Dimensions.get('window').width / 3) - 10,
    margin: 5,
  },
});

export default AddQRImagesScreen;