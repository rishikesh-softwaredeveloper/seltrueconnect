import React,{ useState, useRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { IconButton } from "react-native-paper";
import { PostUpdateVendor } from "../services/login-services/post-update-vendor";

const PersonalDetails = () => {
  const dealer = useSelector((state) => state.dealer[0]);

  const dispatch = useDispatch();
  const {
    initAccountAddress,
    clearAccountAddress
  } = bindActionCreators(actionCreators, dispatch);


  const [panEditable, setPanEditable] = useState(false);
  
  const [PanNo,setPanNo] = useState(dealer.pan_card);
  const [aadharEditable, setAadharEditable] = useState(false);
  const [aadhar,setAadhar] = useState(dealer.aadhar_no);
  const [gstEditable, setGstEditable] = useState(false);
  const [gst,setGst] = useState(dealer.gst_no);
  const [stateEditable, setStateEditable] = useState(false);
  const [state,setState] = useState(dealer.state);
  const [cityEditable, setCityEditable] = useState(false);
  const [city,setCity] = useState(dealer.city);
  const [addressEditable, setAddressEditable] = useState(false);
  const [address,setAddress] = useState(dealer.address);
  const [pinCodeEditable, setPinCodeEditable] = useState(false);
  const [pinCode,setPincode] = useState(dealer.pincode);
  const [bottomColor,setBottomColor] = useState('');

  const panUseRef = useRef();
  const aadharUseRef = useRef();
  const gstUseRef = useRef();
  const stateUseRef = useRef();
  const cityUseRef = useRef();
  const addressUseRef = useRef();
  const pinCodeUseRef = useRef();

  if(panEditable){
    panUseRef.current.focus();
  }

  if(aadharEditable){
    aadharUseRef.current.focus();
  }

  if(gstEditable){
    gstUseRef.current.focus();
  }

  if(stateEditable){
    stateUseRef.current.focus()
  }

  if(cityEditable){
    cityUseRef.current.focus()
  }

  if(addressEditable){
    addressUseRef.current.focus()
  }

  if(pinCodeEditable){
    pinCodeUseRef.current.focus()
  }

  const submitPan=()=>{
    const re = /^[a-zA-Z]{5}\d{4}[A-Za-z]{1}$/gm
  
    if(!re.test(PanNo)){
      setBottomColor("red");
      return false
    }

    setPanEditable(!panEditable);
    setBottomColor('#ccc');
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"pan_card","update_val":PanNo});
  }

  const closePan=()=>{
    const re = /^[a-zA-Z]{5}\d{4}[A-Za-z]{1}$/gm
    
    if(!re.test(PanNo)){
      setBottomColor("red");
      return false
    }

    setPanEditable(!panEditable);
    setBottomColor('#ccc');
  }
  
  const submitaadhar=()=>{
    const re =/^\d{12}$/gm

    if(!re.test(aadhar)) return false
    setAadharEditable(!aadharEditable);
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"aadhar_no","update_val":aadhar});
  }

  const submitgst=()=>{
    const re = /^\d{2}[a-zA-Z]{5}\d{4}[A-Za-z]{1}\d[Zz]\S$/gm
    
    if(!re.test(gst)) return false
    
    setGstEditable(!gstEditable);
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"gst_no","update_val":gst});
  }

  const submitcity=()=>{
    setCityEditable(!cityEditable);
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"city","update_val":city});
  }

  const submitaddress=()=>{
    setAddressEditable(!addressEditable);
    clearAccountAddress();
    initAccountAddress(address);
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"address","update_val":address});
  }

  const submitpincode=()=>{
    setPinCodeEditable(!pinCodeEditable);
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"pincode","update_val":pinCode});
  }

  return (
      <View style={{borderWidth:0,borderColor:'#ccc',marginTop:0}}>
        <View style={{flexDirection: "column",justifyContent: "space-between",padding: 5}}>
          <Text style={{ fontSize: 14,  fontFamily: "serif" }}>PAN</Text>
          <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,borderBottomColor:bottomColor}}>
            <TextInput style={{fontSize: 16,fontFamily: "serif",width:120}} value={PanNo} maxLength={10} onChangeText={(text)=>{setPanNo(text)}} editable={panEditable} ref={panUseRef} />
            {
              panEditable
              ?<View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <IconButton
                  icon="close"
                  size={20}
                  color="#fc2e2b"
                  onPress={closePan}
                />
                <IconButton
                  icon="check"
                  size={20}
                  color="#177a10"
                  onPress={submitPan}
                />
              </View>
              :<IconButton
                icon="pencil"
                size={20}
                color="black"
                onPress={()=>setPanEditable(!panEditable)}
                disabled = {panEditable?true:false}
              />
            }
          </View>
        </View>
        <View style={{ flexDirection: "column",justifyContent: "space-between",padding: 5, }}  >
          <Text style={{ fontSize: 14, fontFamily: "serif" }}>Aadhar</Text>
          <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,}}>
            <TextInput style={{fontSize: 16,fontFamily: "serif",}} value={aadhar} maxLength={12} onChangeText={(text)=>setAadhar(text)} editable={aadharEditable} ref={aadharUseRef}/>
            {
              aadharEditable
              ?<View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <IconButton
                  icon="close"
                  size={20}
                  color="#fc2e2b"
                  onPress={()=>setAadharEditable(!aadharEditable)}
                />
                <IconButton
                  icon="check"
                  size={20}
                  color="#177a10"
                  onPress={submitaadhar}
                />
              </View>
              :<IconButton
                icon="pencil"
                size={20}
                color="black"
                onPress={()=>setAadharEditable(!aadharEditable)}
                disabled = {aadharEditable?true:false}
              />
            }
          </View>
        </View>
        <View style={{ flexDirection: "column", justifyContent: "space-between",padding: 5,}} >
          <Text style={{ fontSize: 14, fontFamily: "serif" }}>GST</Text>
          <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,}}>
            <TextInput style={{fontSize: 16,fontFamily: "serif",}} value={gst} maxLength={15} onChangeText={(text)=>setGst(text)} editable={gstEditable} ref={gstUseRef}/>
            {
              gstEditable
              ?<View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <IconButton
                  icon="close"
                  size={20}
                  color="#fc2e2b"
                  onPress={()=>setGstEditable(!gstEditable)}
                />
                <IconButton
                  icon="check"
                  size={20}
                  color="#177a10"
                  onPress={submitgst}
                />
              </View>
              :<IconButton
                icon="pencil"
                size={20}
                color="black"
                onPress={()=>setGstEditable(!gstEditable)}
                disabled = {gstEditable?true:false}
              />
            }
          </View>
        </View>
        <View style={{ flexDirection: "column", justifyContent: "space-between",padding: 5,}}>
          <Text style={{ fontSize: 14, fontFamily: "serif"}}>State</Text>
          <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,}}>
            <TextInput style={{fontSize: 18,fontFamily: "serif",}} value={state.toUpperCase()} onChangeText={(text)=>setState(text)} editable={stateEditable} ref={stateUseRef}/>
          </View>
        </View>
        <View style={{ flexDirection: "column", justifyContent: "space-between",padding: 5,}}>
         <Text style={{ fontSize: 14, fontFamily: "serif" }}>City</Text>
         <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,}}>
            <TextInput style={{fontSize: 16,fontFamily: "serif",}} value={city} onChangeText={(text)=>setCity(text)} editable={cityEditable} ref={cityUseRef}/>
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
                  onPress={submitcity}
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
          <Text style={{ fontSize: 14, fontFamily: "serif" }}>Address</Text>
          <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,}}>
            <TextInput multiline={true} maxLength={100}  numberOfLines={2} style={{fontSize: 16,fontFamily: "serif",width:200}} value={address} onChangeText={(text)=>setAddress(text)} editable={addressEditable} ref={addressUseRef}/>
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
                  onPress={submitaddress}
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
          <Text style={{ fontSize: 14, fontFamily: "serif" }}> Pin Code </Text>
          <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,}}>
            <TextInput style={{fontSize: 16,fontFamily: "serif",}} value={pinCode} onChangeText={(text)=>setPincode(text)} editable={pinCodeEditable} ref={pinCodeUseRef}/>
            {
              pinCodeEditable
              ?<View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <IconButton
                  icon="close"
                  size={20}
                  color="#fc2e2b"
                  onPress={submitpincode}
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
    );
  };

  export default  PersonalDetails;
   
