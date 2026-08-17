import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, ScrollView, BackHandler } from "react-native";
import { Button, ThemeProvider, Image } from "react-native-elements";
import ElementButton from "../../containers/button";
import TextInput from "../../containers/text-input";
import { PostLogin } from "../../services/login-services/post-submit-login";
import { GetBundleList } from "../../services/bundle-services/get-bundles";
import { GetDeviceListStockType } from "../../services/bundle-services/get-openbox-item-list";
import { GetCartList } from "../../services/bundle-services/get-cartlist";
import { GetTotalOrders } from "../../services/bundle-services/get-total-orders";
import { GetBundleTypes } from "../../services/bundle-services/get-bundle-types";
import { GetShippingAddress } from "../../services/bundle-services/get-shipping-address";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FieldValidator from "../../helpers/fieldValidator";

//redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { GetPurchasedOrders } from "../../services/bundle-services/get-purchased-orders";
import { GetSoldOrders } from "../../services/bundle-services/get-sold-orders";
import { GetProfile } from "../../services/bundle-services/get-profile";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState({ value: "", error: "" });
  const [pin, setPin] = useState({ value: "", error: "" });

  const dispatch = useDispatch();
  const {
    addDealer,
    addProfile,
    addPan,
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
    clearShippingAddress,
    removeDealer,
    removeProfile,
    removePan,
  } = bindActionCreators(actionCreators, dispatch);

  const forgotpress = () => {
    navigation.navigate("ForgotPinScreen", mobile);
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      console.error("Error storing data:", e);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
    }catch (e) {
      console.error("Error clearing storage:", e);
    }
  };
  

  const loginpress = () => {
    dispatch({ type: 'LOGOUT' });
    clearStorage();
    const pin_error = FieldValidator.pinValidator(pin.value, "Pin");
    const mobile_error = FieldValidator.mobilenoValidator(
      mobile.value,
      "Mobile"
    );
    try {
      if (pin_error.length > 0 || mobile_error.length > 0) {
        setPin({ ...pin, error: pin_error });
        setMobile({ ...mobile, error: mobile_error });
        return false;
      } else {
        setPin({ ...pin, error: "" });
        setMobile({ ...mobile, error: "" });
      }
    } catch (error) {}

    const logindata = {
      mobile: mobile.value,
      pin: pin.value,
    };
    console.log(logindata,'logingData');

    if (mobile.error == "" || pin.error == "") {
      // navigation.navigate("SplashScreen");
      PostLogin(logindata).then((Response) => {
        console.log(Response,"Login");
        
        if(Response.status == 1) {
        
          removeProfile();
          removePan();
          clearAccountName();
          clearAccountEmail();
          clearAccountMobile();
          clearAccountAddress();
          clearToken();
          clearShippingAddress();
          clearRefreshToken();
          addDealer(Response.data);
          initAccountName(Response.data.name);
          initAccountEmail(Response.data.email);
          initAccountMobile(Response.data.mobile);
          initAccountAddress(Response.data.address);
          addPan(Response.data.pan_card);
          initToken(Response.accessToken);
          initRefreshToken(Response.refreshToken);

          storeData(Response);

          navigation.navigate("MainScreen");
          GetProfile(Response.data["vendor_id"], Response.accessToken).then(
            (ProfileRes) => {
                removeProfile();
              if(ProfileRes.status == 1) {
                addProfile(ProfileRes.data)
              }
            }
          );

          GetBundleList(Response.data["vendor_id"], Response.accessToken).then(
            (Res1) => {
              clearBundle();
              if (Res1.status == 1) {
                initBundle(
                  Res1.data.sort((a, b) =>
                    a.bundle_no.localeCompare(b.bundle_no)
                  )
                );
              }
            }
          );
          const vendor_id = Response.data["vendor_id"];
          const category_id = Response.data['category_id'];
          const attached_vendor_id = Response.data['attached_vendor_id'];

          GetDeviceListStockType({"stock_type":"NEW","vendor_id":vendor_id},Response.accessToken).then((Re)=>{
            clearNewDevices()
            clearMasterNewDevices()
            if(Re.status == 1){
              clearBrands()
              clearGrades()
              for(var i=0;i<Re['data'].length;i++){
                initBrands(Re['data'][i]['product_brand'])
                initGrades(Re['data'][i]['certification_grade'])
              }
              initNewDevices((Re.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
              initMasterNewDevices((Re.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
            }
          })

          GetDeviceListStockType({ stock_type: "OPEN BOX", vendor_id: vendor_id },Response.accessToken).then((Res2) => {
            clearOpenBox();
            clearMasterOpenBox();
            if (Res2.status == 1) {
              GetDeviceListStockType({ stock_type: "PREXO", vendor_id: vendor_id },Response.accessToken).then((Res7) => {
                clearSeltrueBox();
                clearMasterSeltrueBox();
                if (Res7.status == 1) {
                  // clearBrands();
                  // clearGrades();
                  // for (var i = 0; i < Res7["data"].length; i++) {
                  //   initBrands(Res7["data"][i]["product_brand"]);
                  //   initGrades(Res7["data"][i]["certification_grade"]);
                  // }
                  initSeltrueBox(
                    Res7.data.sort((a, b) => a.device_id.localeCompare(b.device_id))
                  );
                  initMasterSeltrueBox(
                    Res7.data.sort((a, b) => a.device_id.localeCompare(b.device_id))
                  );
                }
              });
              clearBrands();
              clearGrades();
              for (var i = 0; i < Res2["data"].length; i++) {
                initBrands(Res2["data"][i]["product_brand"]);
                initGrades(Res2["data"][i]["certification_grade"]);
              }
              initOpenBox(
                Res2.data.sort((a, b) => a.device_id.localeCompare(b.device_id))
              );
              initMasterOpenBox(
                Res2.data.sort((a, b) => a.device_id.localeCompare(b.device_id))
              );
            }
          });

          GetCartList(vendor_id, Response.accessToken).then((res3) => {
            if (res3["status"] == 1) {
              clearCart();
              clearPrice();
              clearQnty();
              for (var i = 0; i < res3["data"].length; i++) {
                initItem(res3["data"][i]);
                initPrice(Number(res3['data'][i].amount));
              }
              initQnty(res3["data"].length);
            }
          });

          GetTotalOrders(vendor_id, Response.accessToken).then((res4) => {
            if (res4["status"] == 1) {
              clearOrder();
              for (var i = 0; i < res4["total_orders"]; i++) {
                initOrder(res4["order_items"][i]);
              }
            }
          });

          GetPurchasedOrders(vendor_id, Response.accessToken).then((res4)=>{
          
            if(res4?.['status'] == 1){
              clearPurchaseOrder()
              for(var i=0;i<res4['results'].length;i++){
                initPurchaseOrder(res4['results'][i])
              }
            }
            
          })

          GetSoldOrders(vendor_id, Response.accessToken).then((res4)=>{
          
            if(res4?.['status'] == 1){
              clearSoldOrder()
              for(var i=0;i<res4['results'].length;i++){
                initSoldOrder(res4['results'][i])
              }
            }
            
          })

          const reqData= {
            "attached_vendor_id":Response.data['attached_vendor_id'],
            "vendor_id":vendor_id,
            "category_id":Response.data['category_id']
          }

          GetShippingAddress(Response.accessToken,reqData).then((res5) => {
            if(res5?.["status"] == 1) {
              clearShippingAddress();
              initShippingAddress(res5["data"]);
            }
          });

          GetBundleTypes(Response.accessToken).then((res6) => {
            if (res6.status == 1) {
              clearTypes();
              for (var i = 0; i < res6["data"].length; i++) {
                initTypes(res6["data"][i]);
              }
            }
          });
        } else if (Response.status == 0) {
          navigation.navigate("LoginScreen");
          setPin({ ...pin, error: "Invalid Pin" });
          setMobile({ ...mobile, error: "Invalid Mobile" });
        }
      });
    }
  };

  // const handleBackButtonClick = () => {
  //   navigation.navigate("HomeScreen");
  //   return true;
  // };

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener(
  //       "hardwareBackPress",
  //       handleBackButtonClick
  //     );
  //   };
  // }, []);

  return (
    <ThemeProvider>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <View style={styles.buttonsContainer}></View>
          <Image
            source={require("../../assets/images/login.jpg")}
            containerStyle={styles.imagestyles}
          />
          <TextInput
            label="Mobile"
            placeholder="MOBILE"
            style={styles.input}
            maxLength={10}
            onChangeText={(text) => setMobile({ value: text, error: "" })}
            value={mobile.value}
            error={!!mobile.error}
            errorText={mobile.error}
            keyboardType="number-pad"
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
          <TextInput
            label="Pin"
            placeholder="PIN"
            style={styles.input}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            keyboardType="number-pad"
            onChangeText={(text) => setPin({ value: text, error: "" })}
            value={pin.value}
            error={!!pin.error}
            errorText={pin.error}
            secureTextEntry={true}
            maxLength={4}
          />
        </View>
        <ElementButton
          title="Submit"
          style={{
            backgroundColor: "#1194f6",
            borderRadius: 5,
          }}
          containerStyle={styles.buttonstyles}
          onPress={loginpress}
        />
        <View
          flexDirection="row"
          justifyContent="space-between"
          style={{ marginHorizontal: "10%" }}
        >
          <Button
            title="Register"
            onPress={() => navigation.navigate("RegNavigationScreen")}
            titleStyle={{
              color: "#039BE5",
              fontFamily: "serif",
            }}
            type="clear"
          />
          <Button
            title="Forgot Password?"
            onPress={forgotpress}
            titleStyle={{
              color: "#039BE5",
              fontFamily: "serif",
            }}
            type="clear"
          />
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonstyles: {
    marginHorizontal: "10%",
    marginVertical: "3%",
    height: 50,
    width: "80%",
  },
  input: {
    marginHorizontal: 30,
    marginVertical: 10,
    height: 50,
    margin: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontFamily: "serif",
  },
  imagestyles: {
    marginVertical: 10,
    height: 200,
    width: 200,
  },
});

export default LoginScreen;
