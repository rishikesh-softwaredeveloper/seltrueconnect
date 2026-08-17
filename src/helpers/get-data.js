
//API
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetBundleList } from '../services/bundle-services/get-bundles';
import { GetDeviceListStockType } from '../services/bundle-services/get-openbox-item-list'
import {GetCartList} from '../services/bundle-services/get-cartlist'
import { GetTotalOrders } from '../services/bundle-services/get-total-orders';
import { GetBundleTypes } from "../services/bundle-services/get-bundle-types";
import { GetShippingAddress } from '../services/bundle-services/get-shipping-address';

import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { GetPurchasedOrders } from '../services/bundle-services/get-purchased-orders';
import { GetSoldOrders } from '../services/bundle-services/get-sold-orders';
import { GetProfile } from '../services/bundle-services/get-profile';
import { GetBankAccounts } from '../services/bundle-services/get-bank-accounts';
import { GetVoucherDetails } from '../services/bundle-services/get-voucher-details';
import { GetVendorList } from '../services/bundle-services/get-vendor-list';

export const getData = async (dispatch) => {  
  const {
    addDealer,
    removeDealer,
    addProfile,
    removeProfile,
    addPan,
    addUpi,
    initBundle,
    initOpenBox,
    initNewDevices,
    initMasterNewDevices,
    initSeltrueBox,
    initMasterOpenBox,
    initMasterSeltrueBox,
    initAccountName,
    initAccountEmail,
    initAccountMobile,
    initAccountAddress,
    initItem,
    initPrice,
    initQnty,
    initOrder,
    initPurchaseOrder,
    initSoldOrder,
    initTypes,
    initBrands,
    initGrades,
    initToken,
    initRefreshToken,
    initShippingAddress,
    initBankAccounts,
    initVendorList,
    initVoucherDetails,
    clearBundle,
    clearAccountName,
    clearAccountEmail,
    clearAccountMobile,
    clearAccountAddress,
    clearOpenBox,
    clearNewDevices,
    clearMasterNewDevices,
    clearSeltrueBox,
    clearMasterOpenBox,
    clearMasterSeltrueBox,
    clearCart,
    clearShippingAddress,
    clearBankAccounts,
    clearVendorList,
    clearVoucherDetails,
    clearOrder,
    clearPurchaseOrder,
    clearSoldOrder,
    clearPrice,
    clearQnty,
    clearTypes,
    clearBrands,
    clearGrades,
    clearToken,
    clearRefreshToken,
    removePan,
    removeUpi
  } = bindActionCreators(actionCreators, dispatch)
  
    try {
      const value = await AsyncStorage.getItem('@storage_Key')

      if(value !== null) {
        const temp = JSON.parse(value); 
        console.log(temp,'Persisted Data');
        
        removeDealer();
        addDealer(temp['data'])
        removePan()
        removeUpi()
        clearAccountName()
        clearAccountEmail()
        clearAccountMobile()
        clearAccountAddress()
        clearToken()
        clearRefreshToken()
        initAccountName(temp['data']['name'])
        initAccountEmail(temp['data']['email'])
        initAccountMobile(temp['data']['mobile'])
        initAccountAddress(temp['data']['address'])
        addPan(temp['data']['pan_card'])
        addUpi(temp['data']['upi_id'])
        initToken(temp['accessToken'])
        initRefreshToken(temp['refreshToken'])


        GetProfile(temp['data']['vendor_id'],temp['accessToken']).then(
          (ProfileRes) => {
            removeProfile();
            if(ProfileRes.status == 1) {
              addProfile(ProfileRes.data)
            }
          }
        );

        GetBundleList(temp['data']['vendor_id'],temp['accessToken']).then((Res1)=>{
          clearBundle()
          if(Res1.status == 1){
            initBundle((Res1.data).sort((a,b)=>a.bundle_no.localeCompare(b.bundle_no)));
          }
        })
        const vendor_id = temp['data']['vendor_id'];
        const category_id = temp['data']['category_id'];
        const attached_vendor_id = temp['data']['attached_vendor_id'];
        

        GetDeviceListStockType({"stock_type":"NEW","vendor_id":vendor_id},temp['accessToken']).then((Res2)=>{
          clearNewDevices()
          clearMasterNewDevices()
          if(Res2.status == 1){
            clearBrands()
            clearGrades()
            for(var i=0;i<Res2['data'].length;i++){
              initBrands(Res2['data'][i]['product_brand'])
              initGrades(Res2['data'][i]['certification_grade'])
            }
            initNewDevices((Res2.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
            initMasterNewDevices((Res2.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
          }
        })

        GetDeviceListStockType({"stock_type":"OPEN BOX","vendor_id":vendor_id},temp['accessToken']).then((Res2)=>{
          clearOpenBox()
          clearMasterOpenBox()
          if(Res2.status == 1){
            GetDeviceListStockType({"stock_type":"PREXO","vendor_id":vendor_id},temp['accessToken']).then((Res)=>{
              clearSeltrueBox()
              clearMasterSeltrueBox()
              if(Res.status == 1){
                initSeltrueBox((Res.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
                initMasterSeltrueBox((Res.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
              }
            });
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

        GetCartList(vendor_id,temp['accessToken']).then((res3)=>{
          
          if(res3['status'] == 1){
            clearCart()
            clearPrice()
            clearQnty()
            for(var i=0;i<res3['data'].length;i++){
              initItem(res3['data'][i])
              // initPrice(Number(res3['data'][i].amount.split('.')[0]))
              initPrice(Number(res3['data'][i].amount))
            }  
            initQnty(res3['data'].length)
          }
        })
        
        const reqData= {
          "attached_vendor_id":attached_vendor_id,
          "vendor_id":vendor_id,
          "category_id":category_id
        }

        GetShippingAddress(temp['accessToken'],reqData).then((res5)=>{
          if(res5['status'] == 1){
            clearShippingAddress()
            initShippingAddress(res5['data'])
          }
        })

        // GetBankAccounts(temp['accessToken'],vendor_id).then((resBank)=>{
        //   if(resBank['status'] == 1){
        //     clearBankAccounts()
        //     initBankAccounts(resBank['data'])
        //   }
        // })

        // GetVendorList(temp['accessToken'],vendor_id).then((resVendor)=>{
        //   if(resVendor['status'] == 1){
        //     clearVendorList()
        //     initVendorList(resVendor['data'])
        //   }
        // })

        // GetVoucherDetails(temp['accessToken'],vendor_id).then((resVochers)=>{
        //   if(resVochers['status'] == 1){
        //     clearVoucherDetails()
        //     initVoucherDetails(resVochers['data'])
        //   }
        // })

        
        GetTotalOrders(vendor_id,temp['accessToken']).then((res4)=>{
          
          if(res4?.['status'] == 1){
            clearOrder()
            for(var i=0;i<res4['total_orders'];i++){
              initOrder(res4['order_items'][i])
            }
          }
        })
        
        // GetPurchasedOrders(vendor_id,temp['accessToken']).then((res4)=>{
          
        //   if(res4?.['status'] == 1){
        //     clearPurchaseOrder()
        //     for(var i=0;i<res4['results'].length;i++){
        //       initPurchaseOrder(res4['results'][i])
        //     }
        //   }
          
        // })

        // GetSoldOrders(vendor_id,temp['accessToken']).then((res5)=>{
        //   if(res5?.['status'] == 1){
        //     clearSoldOrder()
        //     for(var i=0;i<res5['results'].length;i++){
        //       initSoldOrder(res5['results'][i])
        //     }
        //   }
          
        // })

        GetBundleTypes(temp['accessToken']).then((res6)=>{
          if(res6.status == 1){
            clearTypes()
            for(var i=0;i<res6['data'].length;i++){
              initTypes(res6['data'][i])
            }
          }
        })
      }
    } catch(e) {
      console.error("Error reading value:", e);
    }
  }
