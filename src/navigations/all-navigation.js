import 'react-native-gesture-handler';
import React,{useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert, Linking, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme,useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Searchbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//login screens
import HomeScreen from '../screens/login-screens/home-screen'
import LoginScreen from '../screens/login-screens/login-screen'
import RegNavigationScreen from '../screens/login-screens/register-navigation-screen';
import SearchScreen from '../screens/login-screens/search-screen'
import VendorListScreen from '../screens/login-screens/vendor-list-screen'
import WorkInProgress from '../screens/work-in-process-screen';
import SplashScreen from '../screens/splash-screen';
import ResetPinScreen from '../screens/login-screens/reset-pin-screen';
import ForgotPinScreen from '../screens/login-screens/forgot-pin-screen';
import GeneratePinScreen from '../screens/login-screens/generate-pin-screen';
import GeneratePinAfterRegScreen from '../screens/login-screens/generate-pin-after-reg-screen';
import CodeScreen from '../screens/login-screens/code-screen';
import CodeAfterRegScreen from '../screens/login-screens/code-after-reg-screen';
import CodeAfterForgotScreen from '../screens/login-screens/code-after-forgot-screen';
import SendOtpScreen from '../screens/login-screens/send-otp-screen';
import SendOtpAfterRegScreen from '../screens/login-screens/send-otp-after-reg-screen';
import RegistrationScreen from '../screens/login-screens/registration-screen';

//after login screens
import AccountScreen from '../screens/home-screens/account-screen';
import BundleScreen from '../screens/home-screens/bundle-screen';
import OpenBoxScreen from '../screens/home-screens/open-box-screen';
import NewDevicesScreen from '../screens/home-screens/new-devices-screen';
import SeltrueBoxScreen from '../screens/home-screens/seltrue-box-screen';
import BundleListScreen from '../screens/home-screens/bundle-list-screen'
import BundleCartListScreen from '../screens/home-screens/bundle-cart-list-screen'
import BundleOrderListScreen from '../screens/home-screens/bundle-order-list-screen'
import CartScreen from '../screens/home-screens/cart-screen';
import OrderScreen from '../screens/home-screens/orders-screen';
import OrderListScreen from '../screens/home-screens/order-list-screen'
import ShippingAddressScreen from '../screens/home-screens/shipping-address-screen';
import ShippingDetailsScreen from '../screens/home-screens/shipping-details-screen';
import EditShippingAddressScreen from '../screens/home-screens/edit-shipping-address-screen';
import PaymentRouteScreen from '../screens/home-screens/payment-route-screen';
import { PostCheckBuildNo } from '../services/login-services/post-check-build-no';

import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

import { getData } from '../helpers/get-data';
// import * as Updates from 'expo-updates' // Updates*
// import checkVersion from 'react-native-store-version';

import getEnvVars from "../constants/global";
import TotalOrderScreen from '../screens/home-screens/Total-orders-screen';
import PurchasedOrderScreen from '../screens/home-screens/Purchased-orders-screen';
import PurchaseOrderListScreen from '../screens/home-screens/purchaseOrder-list-screen';
import SoldOrderScreen from '../screens/home-screens/Sold-orders-screen';
import PurchaseBundleOrderListScreen from '../screens/home-screens/Purchase-bundle-order-list-screen';
import SoldBundleOrderListScreen from '../screens/home-screens/Sold-bundle-order-list-screen';
import SoldOrderListScreen from '../screens/home-screens/soldOrder-list-screen';
import QrRouteScreen from '../screens/home-screens/qr-route-screen';
import BankDetails from '../screens/home-screens/bank-details-screen';
import AddBankScreen from '../screens/home-screens/add-bank-screen';
import VoucherDetails from '../screens/home-screens/voucher-details-screen';
import AddVoucherScreen from '../screens/home-screens/add-voucher-screen';
import VendorListDetails from '../screens/home-screens/vendorlist-details-screen';
import TaggedDealersScreen from '../screens/home-screens/tagged-dealers-screen';
import TaggedItemScreen from '../screens/home-screens/tagged-item-screen';
import SalesDealersScreen from '../screens/home-screens/sales-dealers-screen';
import MyDealersScreen from '../screens/home-screens/my-dealers-screen';
import SSVoucherDetails from '../screens/home-screens/ssvoucher-details-screen';
import AddSSVoucherScreen from '../screens/home-screens/add-ssvoucher-screen';
import PaymentQRScreen from '../screens/home-screens/payment_qr-screen';
import AddQRScreen from '../screens/home-screens/add-qr-screen';
import AddQRImagesScreen from '../screens/home-screens/add-qr-images-screen';

const { build_no } = getEnvVars();
const buildNo = build_no;

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'white'
  },
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DrawerRoutes = () => {
  const cartlist = useSelector((state) => state.cartlist);
  const dealer = useSelector((state) => state.dealer);


  const masterDataSource = useSelector((state) => state.masteropenbox[0]);
  const masterSeltrueDataSource = useSelector((state) => state.masterseltruebox[0]);
  
  const [search, setSearch] = useState('');
  const [searchSeltrue, setSearchSeltrue] = useState('');
  
  const dispatch = useDispatch();
  const { initOpenBox, clearOpenBox, initSeltrueBox, clearSeltrueBox } = bindActionCreators(actionCreators,dispatch);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.device_name
            ? item.device_name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData)
      clearOpenBox();
      initOpenBox(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      // setFilteredDataSource(masterDataSource);
      clearOpenBox();
      initOpenBox(masterDataSource);
      setSearch(text);
    }
  };

  const searchSeltrueFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterSeltrueDataSource.filter(
        function (item) {
          const itemData = item.device_name
            ? item.device_name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData)
      clearSeltrueBox();
      initSeltrueBox(newData);
      setSearchSeltrue(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      // setFilteredDataSource(masterDataSource);
      clearSeltrueBox();
      initSeltrueBox(masterSeltrueDataSource);
      setSearchSeltrue(text);
    }
  };

  return (
    <Tab.Navigator initialRouteName='BundleScreen' screenOptions={{ tabBarActiveTintColor: '#EC650A',tabBarLabelStyle:{padding:0,marginBottom:6},tabBarStyle:{borderTopWidth:0,backgroundColor:"#fcfdff"} }}>
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          )
        }}
      />
      {
        dealer[0]?.attached_vendor_id == null || dealer[0]?.attached_vendor_id == '' ?
        <Tab.Screen
          name="OpenBoxScreen"
          component={OpenBoxScreen}
          options={{
            tabBarLabel: 'OpenBox',
            ...BottomScreenHeaderOptions,
            headerTitle:'OpenBox',
            // header:()=>(
            // <View style={{alignItems:'center',padding:5,backgroundColor:'#1194f6'}}>
            //   <Searchbar 
            //     value={search}
            //     style={{marginTop:40,width:"90%",marginBottom:0}}
            //     onChangeText={(text) => searchFilterFunction(text)}
            //     placeholder="Search open box"
            //   />
            // </View>),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="package-variant" color={color} size={size} />
            )
          }}
        />
        :<></>
      }
      {
        dealer[0]?.attached_vendor_id == null || dealer[0]?.attached_vendor_id == '' ?
        <Tab.Screen
          name="NewDevicesScreen"
          component={NewDevicesScreen}
          options={{
            tabBarLabel: 'New Devices',
            ...BottomScreenHeaderOptions,
            headerTitle:'New Devices',
            // header:()=>(
            // <View style={{alignItems:'center',padding:5,backgroundColor:'#1194f6'}}>
            //   <Searchbar 
            //     value={search}
            //     style={{marginTop:40,width:"90%",marginBottom:0}}
            //     onChangeText={(text) => searchFilterFunction(text)}
            //     placeholder="Search new devices"
            //   />
            // </View>),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cellphone-check" color={color} size={size} />
            )
          }}
        />
        :<></>
      }
      {/* {
        dealer[0]?.attached_vendor_id == null || dealer[0]?.attached_vendor_id == '' ?
        <Tab.Screen
          name="Seltrue"
          component={SeltrueBoxScreen}
          options={{
            tabBarLabel: 'Seltrue',
            ...BottomScreenHeaderOptions,
            headerTitle:'Seltrue',
            // header:()=>(
            // <View style={{alignItems:'center',padding:5,backgroundColor:'#1194f6'}}>
            //   <Searchbar 
            //     value={searchSeltrue}
            //     style={{marginTop:40,width:"90%",marginBottom:5}}
            //     onChangeText={(text) => searchSeltrueFilterFunction(text)}
            //     placeholder="Search Seltrue"
            //   />
            // </View>),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cellphone" color={color} size={size} />
            )
          }}
        />
        :
        <></>
      } */}
      
      <Tab.Screen
        name="BundleScreen"
        component={BundleScreen}
        options={{
          ...BottomScreenHeaderOptions,
          tabBarLabel: 'Bundles',
          headerTitle:'Bundles',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="apps-box" color={color} size={size} />
          )
        }}
      />
      {dealer[0]?.dealer_type != 'SALES PERSON' &&
        <Tab.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            ...BottomScreenHeaderOptions,
            tabBarLabel: 'Cart',
            headerTitle:'Cart',
            tabBarBadge: cartlist.length,
            tabBarBadgeStyle:{backgroundColor:'#EC650A',color:'#fff'},
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cart" color={color} size={size} />
            )
          }}
        />
      }
      {dealer[0]?.dealer_type != 'SALES PERSON' &&
        <Tab.Screen
          name="OrderScreen"
          component={dealer[0]?.attached_vendor_id == "" ||  dealer[0]?.attached_vendor_id == null ? TotalOrderScreen :OrderScreen}
          options={{
            ...BottomScreenHeaderOptions,
            tabBarLabel: 'My Orders',
            headerTitle:'My Orders',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="order-bool-descending-variant" color={color} size={size} />
            )
          }}
        />
      }
    </Tab.Navigator>
  )
}

const All = () => {
  const dealer = useSelector((state) => state.dealer);
  const bundleName = useSelector((state) => state.bundleName);

  const dispatch = useDispatch()
  const navigationContainerRef = useRef()
  
  useEffect(()=>{
    getData(dispatch);
  },[])

  useEffect(()=>{
    PostCheckBuildNo().then((response)=>{
      if(response.status == 1){
        
        if(buildNo < response.build_no){
          
          Alert.alert(
            'Updates Available', 
            'Please update app for better use.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Accept', 
                    onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=in.sloyd.seltrue_app'),
                    style: 'default'
                },
            ]
        );
        }
      }
    })
},[]);

const add = () => {
  navigationContainerRef.current.navigate("ShippingAddressScreen");
};

const previous = () => {
  navigationContainerRef.current.navigate('MainScreen');
  return true;
}


  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer theme={MyTheme} ref={navigationContainerRef}>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          {/* {
            dealer.length == 0 
            ? <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{ headerShown: false }} 
              />
            : <Stack.Screen 
                name="MainScreen" 
                component={DrawerRoutes} 
                options={{headerShown: false }} 
              />
          } */}
          <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="MainScreen" 
            component={DrawerRoutes} 
            options={{headerShown: false }} 
          />
          <Stack.Screen 
            name="LoginScreen" 
            component={LoginScreen} 
            options={{...screenHeaderOptions, title:"Login"}}
          />
          <Stack.Screen 
            name="ForgotPinScreen" 
            component={ForgotPinScreen} 
            options={{...screenHeaderOptions, title:"Forgot Pin"}}
          />
          <Stack.Screen 
            name="ResetPinScreen" 
            component={ResetPinScreen} 
            options={{...screenHeaderOptions, title:"Reset PIN"}}
          />
          <Stack.Screen 
            name="GeneratePinAfterRegScreen" 
            component={GeneratePinAfterRegScreen} 
            options={{...screenHeaderOptions, title:"Generate PIN"}}
          />
          <Stack.Screen 
            name="GeneratePinScreen" 
            component={GeneratePinScreen} 
            options={{...screenHeaderOptions, title:"Generate PIN"}}
          />
          <Stack.Screen 
            name="RegNavigationScreen" 
            component={RegNavigationScreen} 
            options={{...screenHeaderOptions, title:"Register"}} 
          />
          <Stack.Screen 
            name="SearchScreen" 
            component={SearchScreen} 
            options={{...screenHeaderOptions, title:"Register"}}
          />
          <Stack.Screen 
            name="RegistrationScreen" 
            component={RegistrationScreen} 
            options={{...screenHeaderOptions, title:"Register"}}
          />
          <Stack.Screen 
            name="VendorListScreen" 
            component={VendorListScreen} 
            options={{...screenHeaderOptions, title:""}} 
          />
          <Stack.Screen 
            name="SendOtpScreen" 
            component={SendOtpScreen} 
            options={{...screenHeaderOptions, title:""}} 
          />
          <Stack.Screen 
            name="SendOtpAfterRegScreen" 
            component={SendOtpAfterRegScreen} 
            options={{...screenHeaderOptions, title:""}} 
          />
          <Stack.Screen 
            name="CodeScreen" 
            component={CodeScreen} 
            options={{...screenHeaderOptions, title:""}}
          />
          <Stack.Screen 
            name="CodeAfterRegScreen" 
            component={CodeAfterRegScreen} 
            options={{...screenHeaderOptions, title:""}}
          />
          <Stack.Screen 
            name="CodeAfterForgotScreen" 
            component={CodeAfterForgotScreen} 
            options={{...screenHeaderOptions, title:""}}
          />
          <Stack.Screen 
            name="WorkInProgress" 
            component={WorkInProgress} 
            options={{...screenHeaderOptions, title:"Work In Progress"}}
          />
          <Stack.Screen 
            name="SplashScreen" 
            component={SplashScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="BundleListScreen" 
            component={BundleListScreen} 
            options={{ 
              header:()=>(
              <>
              <StatusBar backgroundColor="#1194f6" barStyle="light-content" />
              <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',borderBottomWidth:0,paddingBottom:10,marginTop:10,padding:Platform.OS != 'ios'?20:10,backgroundColor:'#1194f6'}}>
                <TouchableOpacity style={{marginLeft:5}} onPress={previous}>
                  <MaterialCommunityIcons name="arrow-left" color={'#ffff'} size={25} />
                </TouchableOpacity>
                <Text style={{ textAlign: 'left',marginLeft:"33%" ,fontSize: 20,color:'#ffff' }}>{bundleName}</Text>
              </View>
              </>
               )
              // header:()=>(
              // <View style={{flexDirection:'row',justifyContent:'flex-start',borderBottomWidth:0,paddingBottom:10,marginTop:Platform.OS != 'ios'?36:0,padding:Platform.OS != 'ios'?20:10,backgroundColor:'#1194f6'}}>
              //   <TouchableOpacity style={{marginLeft:5}} onPress={previous}>
              //     <MaterialCommunityIcons name="arrow-left" color={'#ffff'} size={25} />
              //   </TouchableOpacity>
              //   <Text style={{ textAlign: 'left',marginLeft:"33%" ,fontSize: 20,color:'#ffff' }}>{bundleName}</Text>
              // </View>
              // )
            }} 
          />
          <Stack.Screen 
            name="BundleCartListScreen" 
            component={BundleCartListScreen} 
            options={{ 
              header:()=>(
              <>
              <StatusBar backgroundColor="#1194f6" barStyle="light-content" />
              <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',borderBottomWidth:0,paddingBottom:10,marginTop:10,padding:Platform.OS != 'ios'?20:10,backgroundColor:'#1194f6'}}>
                <TouchableOpacity style={{marginLeft:5}} onPress={previous}>
                  <MaterialCommunityIcons name="arrow-left" color={'#ffff'} size={25} />
                </TouchableOpacity>
                <Text style={{ textAlign: 'left',marginLeft:"33%" ,fontSize: 20,color:'#ffff' }}>{bundleName}</Text>
              </View>
              </>
               )
              // header:()=>(
              // <View style={{flexDirection:'row',justifyContent:'flex-start',borderBottomWidth:0,paddingBottom:10,marginTop:Platform.OS != 'ios'?36:0,padding:Platform.OS != 'ios'?20:10,backgroundColor:'#1194f6'}}>
              //   <TouchableOpacity style={{marginLeft:5}} onPress={previous}>
              //     <MaterialCommunityIcons name="arrow-left" color={'#ffff'} size={25} />
              //   </TouchableOpacity>
              //   <Text style={{ textAlign: 'left',marginLeft:"33%" ,fontSize: 20,color:'#ffff' }}>{bundleName}</Text>
              // </View>
              // )
            }} 
          />
          {/* <Stack.Screen 
            name="BundleCartListScreen" 
            component={BundleCartListScreen} 
            options={{ headerShown: false }} 
          /> */}
          <Stack.Screen 
            name="BundleOrderListScreen" 
            component={BundleOrderListScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="PurchaseBundleOrderListScreen" 
            component={PurchaseBundleOrderListScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="SoldBundleOrderListScreen" 
            component={SoldBundleOrderListScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="OrderListScreen" 
            component={OrderListScreen}
            options={{...screenHeaderOptions, title:"Order Info"}}
          />
          <Stack.Screen 
            name="PurchaseOrderListScreen" 
            component={PurchaseOrderListScreen}
            options={{...screenHeaderOptions, title:"Order Info"}}
          />
           <Stack.Screen 
            name="SoldOrderListScreen" 
            component={SoldOrderListScreen}
            options={{...screenHeaderOptions, title:"Order Info"}}
          />
          <Stack.Screen 
            name="TotalOrderScreen" 
            component={TotalOrderScreen}
            options={{...screenHeaderOptions, title:"Total Orders"}}
          />
          <Stack.Screen 
            name="PurchasedOrderScreen" 
            component={PurchasedOrderScreen}
            options={{...screenHeaderOptions, title:"Purchased Orders"}}
          />
          {/* <Stack.Screen 
            name="SoldOrderScreen" 
            component={SoldOrderScreen}
            options={{...screenHeaderOptions, title:"Sold Orders"}}
          /> */}
          <Stack.Screen 
            name="PaymentRouteScreen" 
            component={PaymentRouteScreen}
            options={{...screenHeaderOptions, title:"Payment"}}
          />
          <Stack.Screen 
            name="QrRouteScreen" 
            component={QrRouteScreen}
            options={{...screenHeaderOptions, title:"Payment"}}
          />
          <Stack.Screen 
            name="ShippingAddressScreen" 
            component={ShippingAddressScreen} 
            options={{headerShown:false}}
          />
          <Stack.Screen 
            name="AddBankScreen" 
            component={AddBankScreen} 
            options={{headerShown:false}}
          />
          <Stack.Screen 
            name="AddQRScreen" 
            component={AddQRScreen} 
            options={{headerShown:false}}
          />
          <Stack.Screen 
            name="AddQRImagesScreen" 
            component={AddQRImagesScreen} 
            options={{headerShown:false}}
          />
          <Stack.Screen 
            name="AddVoucherScreen" 
            component={AddVoucherScreen} 
            options={{headerShown:false}}
          />
          <Stack.Screen 
            name="AddSSVoucherScreen" 
            component={AddSSVoucherScreen} 
            options={{headerShown:false}}
          />
          <Stack.Screen 
            name="EditShippingAddressScreen" 
            component={EditShippingAddressScreen} 
            options={{headerShown:false}}
            // options={{...screenHeaderOptions, title:"Edit Shipping Address"}}
          />
          <Stack.Screen 
            name="ShippingDetailsScreen" 
            component={ShippingDetailsScreen} 
            // options={{ ...screenHeaderOptions,title: 'Shipping Details'}}
            options={{
              header:()=>(
                <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:0,paddingBottom:10,marginTop:Platform.OS != 'ios'?36:0,padding:Platform.OS != 'ios'?20:10,backgroundColor:'#1194f6'}}>
                  <TouchableOpacity style={{marginLeft:1}} onPress={previous}>
                    <MaterialCommunityIcons name="arrow-left" color={'#ffff'} size={25} />
                  </TouchableOpacity>
                  <Text style={{ textAlign: 'left',fontSize: 18,color:'#ffff',fontFamily:'serif',justifyContent:'center' }}>Shipping Address</Text>
                  <TouchableOpacity style={{marginLeft:20}} onPress={add} >
                    <MaterialCommunityIcons name="plus-circle-outline" color={"#ffff"} size={30} />
                  </TouchableOpacity>
                </View>
              )
            }}
            // options ={{headerShown:false}}
          />
          <Stack.Screen 
            name="BankDetails" 
            component={BankDetails} 
            options ={{headerShown:false}}
          />
          <Stack.Screen 
            name="PaymentQRScreen" 
            component={PaymentQRScreen} 
            options ={{headerShown:false}}
          />
          <Stack.Screen 
            name="VendorListDetails" 
            component={VendorListDetails} 
            options={{...screenHeaderOptions, title:"Tag Dealer"}}
          />
          <Stack.Screen 
            name="TaggedDealersScreen" 
            component={TaggedDealersScreen} 
            options={{...screenHeaderOptions, title:"Sales Persons"}}
          />
          <Stack.Screen 
            name="MyDealersScreen" 
            component={MyDealersScreen} 
            options={{...screenHeaderOptions, title:"My Dealers"}}
          />
          <Stack.Screen 
            name="SalesDealersScreen" 
            component={SalesDealersScreen} 
            options={{...screenHeaderOptions, title:"Dealers"}}
          />
          <Stack.Screen 
            name="TaggedItemScreen" 
            component={TaggedItemScreen} 
            options={{...screenHeaderOptions, title:"Tagged Dealers"}}
          />
          <Stack.Screen 
            name="VoucherDetails" 
            component={VoucherDetails} 
            options ={{headerShown:false}}
          />
          <Stack.Screen 
            name="SSVoucherDetails" 
            component={SSVoucherDetails} 
            options ={{headerShown:false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>   
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

const screenHeaderOptions = { 
  headerTitleAlign: 'left', 
  headerStyle: { backgroundColor: '#1194f6' }, 
  headerTintColor: 'white',
  headerTitleStyle:{fontFamily:'serif'} 
};

const BottomScreenHeaderOptions ={
  headerTitleAlign: 'center',
  headerTitleStyle:{fontFamily:'serif'},
  headerStyle: { backgroundColor: '#1194f6'},
  headerTintColor:'white'
}

export default All;
