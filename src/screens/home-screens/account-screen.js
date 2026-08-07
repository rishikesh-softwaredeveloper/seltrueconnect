import React, { useEffect, useState } from "react";
import { View, Text, BackHandler, Alert, Pressable, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountDetails from "../../components/account-details";
import KycDetails from "../../components/kyc-details";
import AddressDetails from "../../components/address-details";
import getEnvVars from "../../constants/global";

const { version } = getEnvVars();
const versionNo = version;

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  }catch (e) {
  }
};

const AccountScreen = () => {
  const navigation = useNavigation();

  const AcctName = useSelector((state) => state.AcctName[0]);
  const AcctEmail = useSelector((state) => state.AcctEmail[0]);
  const AcctMobile = useSelector((state) => state.AcctMobile[0]);
  const AcctAddress = useSelector((state) => state.AcctAddress[0]);
  const dealer = useSelector((state)=>state.dealer);

  const dispatch = useDispatch();

  const {
    removeDealer,
    clearOrder,
    clearSoldOrder,
    clearPurchaseOrder,
    clearCart,
    clearPrice,
    clearQnty,
    clearBundle,
    clearRefreshToken,
    clearToken,
    clearPrimaryShipping,
    clearVoucherDetails
  } = bindActionCreators(actionCreators, dispatch);

  const logOut = () => {
    dispatch({ type: 'LOGOUT' });
    // removeDealer();
    // clearPrimaryShipping();
    // clearOrder();
    // clearVoucherDetails()
    // clearPurchaseOrder();
    // clearSoldOrder();
    // clearCart();
    // clearPrice();
    // clearBundle();
    // clearQnty();
    // clearRefreshToken();
    // clearToken();
    clearStorage();
    // navigation.navigate("HomeScreen");
    navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
    });
  };

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to Exit App?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  let backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  useEffect(() => {
    backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [backHandler]);

  const [accountShow, setAccountShow] = useState(false);
  const [personalShow, setPersonalShow] = useState(false);
  const [addressShow, setAddressShow] = useState(false);
  
  const windowWidth = Dimensions.get('window').width/2-50;
  
  const accountDetails=()=>{
    setAccountShow(!accountShow);
    setPersonalShow(false);
  }

  const KYCDetails=()=>{
    setPersonalShow(!personalShow);
    setAccountShow(false);
    setAddressShow(false);
  }

  const addressDetails=()=>{
    setAddressShow(!addressShow);
    setAccountShow(false);
    setPersonalShow(false);
  }

 return(
  <ScrollView>
    <View>
      <View style={{ marginTop: 30, paddingHorizontal: 10 }}>
  <Card
    containerStyle={{
      borderRadius: 12,
      elevation: 5,
      backgroundColor: '#1194f6',
      borderWidth: 0,
      padding: 15,
      margin: 0,
    }}>
      
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>

      {/* User Details */}
      <View style={{ flex: 1, paddingRight: 15 }}>
        <Text
          numberOfLines={2}
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: 5,
          }}>
          {AcctName ? AcctName.toUpperCase() : '--'}
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: '#f5f7fa',
            marginBottom: 3,
          }}>
          {AcctEmail || '--'}
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: '#f5f7fa',
            marginBottom: 3,
          }}>
          {AcctMobile || '--'}
        </Text>

        <Text
          numberOfLines={2}
          style={{
            fontSize: 13,
            color: '#f5f7fa',
          }}>
          {AcctAddress || '--'}
        </Text>
      </View>

      {/* Profile & Logout */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>

        <View
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            backgroundColor: '#ff4d4f',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 28,
              fontWeight: 'bold',
            }}>
            {AcctName ? AcctName.charAt(0).toUpperCase() : '?'}
          </Text>
        </View>

        <TouchableOpacity
          onPress={logOut}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color="#fff"
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              marginLeft: 5,
              fontWeight: '600',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Card>
</View>
      <View>
        <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:10, elevation:10,}}>
          <Pressable onPress={() => accountDetails() }>                    
            <View  style={{shadowColor: "#ccc",marginTop: 0,flexDirection: "row",justifyContent: "space-between",borderColor:"#ccc",}}>
              <MaterialCommunityIcons color={"#000"} name='badge-account-horizontal-outline' size={20}/>
              <Text style={{ marginRight:170, fontSize: 14,padding:0,fontFamily:"serif",color:"#000" }}>Account Info</Text>
              <MaterialCommunityIcons color={"#000"} name="chevron-down" size={20} style={{ marginBottom: 0 }} />
            </View>
          </Pressable>
          <View>{accountShow && <AccountDetails/>}</View>
        </Card> 
        <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:10, elevation:10,marginBottom:0}}>
          <Pressable onPress={() => KYCDetails()}>
            <View  style={{shadowColor: "#ccc",marginTop: 0,flexDirection: "row",justifyContent: "space-between",borderColor:"#ccc"}}>
              <MaterialCommunityIcons color={"#000"} name="bank" size={20}  style={{marginLeft:0}}/>
              <Text style={{ marginRight: 200, fontSize: 14,padding:0,fontFamily:'serif',color:"#000" }}>KYC Info</Text>
              <MaterialCommunityIcons color={"#000"}  name="chevron-down" size={20}  style={{ marginBottom: 0 }}/>              
            </View>
          </Pressable>
          <View>{personalShow && <KycDetails/>}</View>
        </Card>
        <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:10, elevation:10,marginBottom:0}}>
          <Pressable onPress={() => addressDetails()}>
            <View  style={{shadowColor: "#ccc",marginTop: 0,flexDirection: "row",justifyContent: "space-between",borderColor:"#ccc"}}>
              <MaterialCommunityIcons color={"#000"} name="home-account" size={20}  style={{marginLeft:0}}/>
              <Text style={{ marginRight: 180, fontSize: 14,padding:0,fontFamily:'serif',color:"#000" }}>Address Info</Text>
              <MaterialCommunityIcons color={"#000"}  name="chevron-down" size={20}  style={{ marginBottom: 0 }}/>              
            </View>
          </Pressable>
          <View>{addressShow && <AddressDetails/>}</View>
        </Card>
        {dealer[0]?.dealer_type != 'SALES PERSON' &&
          <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:10, elevation:10,marginBottom:10}}>
            <Pressable onPress={()=>navigation.navigate("OrderScreen")}>
              <View  style={{shadowColor: "#ccc",marginTop: 0,flexDirection: "row",justifyContent: "space-between",borderColor:"#ccc",}}>
                <MaterialCommunityIcons color={"#000"} name="order-bool-descending-variant"  size={20} />
                <Text style={{ marginRight: 185, fontSize: 14,padding:0,fontFamily:'serif',color:"#000" }}>My Orders</Text>
                <MaterialCommunityIcons color={"#000"}  name="chevron-right" size={20}  style={{ marginBottom: 0 }}/>              
              </View>  
            </Pressable>      
          </Card>
        }
        {(dealer[0]?.dealer_type == 'SALES PERSON') &&
          <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:10, elevation:10,marginBottom:10}}>
            <Pressable onPress={()=>navigation.navigate("VoucherDetails")}>
              <View  style={{shadowColor: "#ccc",marginTop: 0,flexDirection: "row",justifyContent: "space-between",borderColor:"#ccc",}}>
                <MaterialCommunityIcons color={"#000"} name="ticket-percent"  size={20} />
                <Text style={{ marginRight: 185, fontSize: 14,padding:0,fontFamily:'serif',color:"#000" }}>My Voucher</Text>
                <MaterialCommunityIcons color={"#000"}  name="chevron-right" size={20}  style={{ marginBottom: 0 }}/>              
              </View>  
            </Pressable>      
          </Card>
        }
        {(dealer[0]?.category_id == 2) &&
          <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:10, elevation:10,marginBottom:10}}>
            <Pressable onPress={()=>navigation.navigate("SSVoucherDetails")}>
              <View  style={{shadowColor: "#ccc",marginTop: 0,flexDirection: "row",justifyContent: "space-between",borderColor:"#ccc",}}>
                <MaterialCommunityIcons color={"#000"} name="ticket-percent"  size={20} />
                <Text style={{ marginRight: 185, fontSize: 14,padding:0,fontFamily:'serif',color:"#000" }}>My Voucher</Text>
                <MaterialCommunityIcons color={"#000"}  name="chevron-right" size={20}  style={{ marginBottom: 0 }}/>              
              </View>  
            </Pressable>      
          </Card>
        }
        {(dealer[0]?.category_id == 3) &&
          <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:10, elevation:10,marginBottom:10}}>
            <Pressable onPress={()=>navigation.navigate("VendorListDetails")}>
              <View  style={{shadowColor: "#ccc",marginTop: 0,flexDirection: "row",justifyContent: "space-between",borderColor:"#ccc",}}>
                <MaterialCommunityIcons color={"#000"} name="distribute-horizontal-center"  size={20} />
                <Text style={{ marginRight: 185, fontSize: 14,padding:0,fontFamily:'serif',color:"#000" }}>Tag Dealer</Text>
                <MaterialCommunityIcons color={"#000"}  name="chevron-right" size={20}  style={{ marginBottom: 0 }}/>              
              </View>  
            </Pressable>      
          </Card>
        }
        {(dealer[0]?.category_id == 3) &&
          <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:10, elevation:10,marginBottom:10}}>
            <Pressable onPress={()=>navigation.navigate("TaggedDealersScreen")}>
              <View  style={{shadowColor: "#ccc",marginTop: 0,flexDirection: "row",justifyContent: "space-between",borderColor:"#ccc",}}>
                <MaterialCommunityIcons color={"#000"} name="distribute-horizontal-center"  size={20} />
                <Text style={{ marginRight: 185, fontSize: 14,padding:0,fontFamily:'serif',color:"#000" }}>Sales Persons</Text>
                <MaterialCommunityIcons color={"#000"}  name="chevron-right" size={20}  style={{ marginBottom: 0 }}/>              
              </View>  
            </Pressable>      
          </Card>
        }
        {(dealer[0]?.category_id == 4 && dealer[0]?.dealer_type == 'SALES PERSON') &&
          <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:10, elevation:10,marginBottom:10}}>
            <Pressable onPress={()=>navigation.navigate("SalesDealersScreen")}>
              <View  style={{shadowColor: "#ccc",marginTop: 0,flexDirection: "row",justifyContent: "space-between",borderColor:"#ccc",}}>
                <MaterialCommunityIcons color={"#000"} name="distribute-horizontal-center"  size={20} />
                <Text style={{ marginRight: 185, fontSize: 14,padding:0,fontFamily:'serif',color:"#000" }}>My Dealers</Text>
                <MaterialCommunityIcons color={"#000"}  name="chevron-right" size={20}  style={{ marginBottom: 0 }}/>              
              </View>  
            </Pressable>      
          </Card>
        }
        {(dealer[0]?.category_id == 2 ) &&
          <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:10, elevation:10,marginBottom:10}}>
            <Pressable onPress={()=>navigation.navigate("MyDealersScreen")}>
              <View  style={{shadowColor: "#ccc",marginTop: 0,flexDirection: "row",justifyContent: "space-between",borderColor:"#ccc",}}>
                <MaterialCommunityIcons color={"#000"} name="distribute-horizontal-center"  size={20} />
                <Text style={{ marginRight: 165, fontSize: 14,padding:0,fontFamily:'serif',color:"#000" }}>My Distributors</Text>
                <MaterialCommunityIcons color={"#000"}  name="chevron-right" size={20}  style={{ marginBottom: 0 }}/>              
              </View>  
            </Pressable>      
          </Card>
        }
        
        {/* {(dealer[0]?.category_id == 2 || dealer[0]?.category_id == 3) &&
          <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:10, elevation:10,marginBottom:10}}>
            <Pressable onPress={()=>navigation.navigate("PaymentQRScreen")}>
              <View  style={{shadowColor: "#ccc",marginTop: 0,flexDirection: "row",justifyContent: "space-between",borderColor:"#ccc",}}>
                <MaterialCommunityIcons color={"#000"} name="bank-transfer-in"  size={20} />
                <Text style={{ marginRight: 145, fontSize: 14,padding:0,fontFamily:'serif',color:"#000" }}>Payment QR</Text>
                <MaterialCommunityIcons color={"#000"}  name="chevron-right" size={20}  style={{ marginBottom: 0 }}/>              
              </View>  
            </Pressable>      
          </Card>
        } */}
        {(dealer[0]?.category_id == 2 || dealer[0]?.category_id == 3) &&
          <Card containerStyle={{borderBottomWidth:1, borderColor:"#CCC", borderRadius:10, elevation:10,marginBottom:30}}>
            <Pressable onPress={()=>navigation.navigate("BankDetails")}>
              <View  style={{shadowColor: "#ccc",marginTop: 0,flexDirection: "row",justifyContent: "space-between",borderColor:"#ccc",}}>
                <MaterialCommunityIcons color={"#000"} name="bank-transfer-in"  size={20} />
                <Text style={{ marginRight: 145, fontSize: 14,padding:0,fontFamily:'serif',color:"#000" }}>My Bank Accounts</Text>
                <MaterialCommunityIcons color={"#000"}  name="chevron-right" size={20}  style={{ marginBottom: 0 }}/>              
              </View>  
            </Pressable>      
          </Card>
        }
        
      </View>
    </View>
    <View style={{alignItems:'center',justifyContent:'flex-end'}}>
      <Text style={{color:'#ccc'}}>Version {versionNo}</Text>
    </View>
  </ScrollView>
)};

export default AccountScreen;