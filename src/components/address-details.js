import React, { useState, useRef } from 'react';
import { View, Text,TextInput } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { IconButton } from "react-native-paper";
import { PostUpdateVendor } from "../services/login-services/post-update-vendor";

const AddressDetails = ( ) => {
  const dealer = useSelector((state) => state.dealer[0]);

  const dispatch = useDispatch();
  const {
    initAccountAddress,
    clearAccountAddress
  } = bindActionCreators(actionCreators, dispatch);

  const [stateEditable, setStateEditable] = useState(false);
  const [state,setState] = useState(dealer.state);
  const [cityEditable, setCityEditable] = useState(false);
  const [city,setCity] = useState(dealer.city);
  const [addressEditable, setAddressEditable] = useState(false);
  const [address,setAddress] = useState(dealer.address);
  const [pinCodeEditable, setPinCodeEditable] = useState(false);
  const [pinCode,setPincode] = useState(dealer.pincode);

  const stateUseRef = useRef();
  const cityUseRef = useRef();
  const addressUseRef = useRef();
  const pinCodeUseRef = useRef();

  if(stateEditable){
    stateUseRef.current.focus();
  }

  if(cityEditable){
    cityUseRef.current.focus();
  }

  if(addressEditable){
    addressUseRef.current.focus();
  }

  if(pinCodeEditable){
    pinCodeUseRef.current.focus();
  }

  const submitCity=()=>{
    setCityEditable(!cityEditable);
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"city","update_val":city});
  }

  const submitAddress=()=>{
    setAddressEditable(!addressEditable);
    clearAccountAddress();
    initAccountAddress(address);
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"address","update_val":address});
  }

  const submitPinCode=()=>{
    setPinCodeEditable(!pinCodeEditable);
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"pincode","update_val":pinCode});
  }
  
  return(
    <View style={{borderWidth:0,borderColor:'#ccc',marginTop:0}}>
      <View style={{ flexDirection: "column", justifyContent: "space-between",padding: 5,}}>
        <Text style={{ fontSize: 14, fontFamily: "serif",color:'#000'}}>State</Text>
        <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,}}>
          <TextInput style={{fontSize: 18,fontFamily: "serif",color:'#000'}} value={state.toUpperCase()} onChangeText={(text)=>setState(text)} editable={stateEditable} ref={stateUseRef}/>
        </View>
      </View>
      <View style={{ flexDirection: "column", justifyContent: "space-between",padding: 5,}}>
        <Text style={{ fontSize: 14, fontFamily: "serif",color:'#000' }}>City</Text>
        <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,}}>
          <TextInput style={{fontSize: 16,fontFamily: "serif",color:'#000'}} value={city} onChangeText={(text)=>setCity(text)} editable={cityEditable} ref={cityUseRef}/>
          {
            cityEditable
            ?<View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <IconButton
                icon="close"
                size={20}
                color="#fc2e2b"
                onPress={()=>setCityEditable(!cityEditable)}
              />
              <IconButton
                icon="check"
                size={20}
                color="#177a10"
                onPress={submitCity}
              />
            </View>
            :<IconButton
              icon="pencil"
              size={20}
              color="black"
              onPress={()=>setCityEditable(!cityEditable)}
              disabled = {cityEditable?true:false}
            />
          }
        </View>
      </View>
      <View style={{flexDirection: "column", justifyContent: "space-between", padding: 5, }}  >
        <Text style={{ fontSize: 14, fontFamily: "serif",color:'#000' }}>Address</Text>
        <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,}}>
          <TextInput multiline={true} maxLength={100}  numberOfLines={2} style={{fontSize: 16,fontFamily: "serif",width:200,color:'#000'}} value={address} onChangeText={(text)=>setAddress(text)} editable={addressEditable} ref={addressUseRef}/>
          {
            addressEditable
            ?<View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <IconButton
                icon="close"
                size={20}
                color="#fc2e2b"
                onPress={()=>setAddressEditable(!addressEditable)}
              />
              <IconButton
                icon="check"
                size={20}
                color="#177a10"
                onPress={submitAddress}
              />
            </View>
            :<IconButton
              icon="pencil"
              size={20}
              color="black"
              onPress={()=>setAddressEditable(!addressEditable)}
              disabled = {addressEditable?true:false}
            />
          }
        </View>
      </View>
      <View style={{flexDirection: "column", justifyContent: "space-between",padding: 5, }}  >
        <Text style={{ fontSize: 14, fontFamily: "serif",color:'#000' }}> Pin Code </Text>
        <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,}}>
          <TextInput style={{fontSize: 16,fontFamily: "serif",color:'#000'}} value={pinCode} onChangeText={(text)=>setPincode(text)} editable={pinCodeEditable} ref={pinCodeUseRef}/>
          {
            pinCodeEditable
            ?<View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <IconButton
                icon="close"
                size={20}
                color="#fc2e2b"
                onPress={submitPinCode}
              />
              <IconButton
                icon="check"
                size={20}
                color="#177a10"
                onPress={()=>setPinCodeEditable(!pinCodeEditable)}
              />
            </View>
            :<IconButton
              icon="pencil"
              size={20}
              color="black"
              onPress={()=>setPinCodeEditable(!pinCodeEditable)}
              disabled = {pinCodeEditable?true:false}
            />
          }
        </View>
      </View>
    </View>
  )
};

export default AddressDetails;