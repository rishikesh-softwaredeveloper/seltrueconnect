import React, { useState, useRef } from "react";
import { Text, View, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { PostUpdateVendor } from "../services/login-services/post-update-vendor";
import { IconButton } from "react-native-paper";

const AccountDetails = () => {
  const dealer = useSelector((state) => state.dealer[0]);
  const profileInfo = useSelector((state) => state.profile[0]);

  const dispatch = useDispatch();
  const {
    initAccountName,
    initAccountEmail,
    initAccountMobile,
    clearAccountEmail,
    clearAccountName,
    clearAccountMobile
  } = bindActionCreators(actionCreators, dispatch);

  const [nameEditable, setNameEditable] = useState(false);
  const [mobileEditable, setMobileEditable] = useState(false);
  const [emailEditable, setEmailEditable] = useState(false);
  const [vendorMobile,setVendorMobile] = useState(dealer.mobile);
  const [vendorName,setVendorName] = useState(dealer.name);
  const [vendorEmail,setVendorEmail] = useState(dealer.email);

  const nameUseRef = useRef();
  const mobileUseRef = useRef();
  const emailUseRef = useRef();

  if(nameEditable){
    nameUseRef.current.focus();
  }

  if(mobileEditable){
    mobileUseRef.current.focus();
  }

  if(emailEditable){
    emailUseRef.current.focus();
  }

  const submitName=()=>{
    setNameEditable(!nameEditable);
    clearAccountName();
    initAccountName(vendorName);
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"name","update_val":vendorName});

  }

  const submitMobile =()=>{
    setMobileEditable(!mobileEditable);
    clearAccountMobile();
    initAccountMobile(vendorMobile);
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"mobile","update_val":vendorMobile});
  }

  const submitEmail =()=>{
    setEmailEditable(!emailEditable);
    clearAccountEmail();
    initAccountEmail(vendorEmail);
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"email","update_val":vendorEmail});
  }

  return (
    <View style={{ borderWidth: 0, borderColor: "#ccc", marginTop: 0 }}>
      <View style={{flexDirection: "column",justifyContent: "space-between",padding: 5,marginTop:10}}>
        <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: "serif",color:'#000' }}>Vendor Code</Text>
        <Text style={{fontSize: 16,marginBottom: 5,fontFamily: "serif",borderBottomWidth: 0.3,color:'#000'}}>{dealer.vendor_code}</Text>
      </View>
      <View style={{flexDirection: "column",justifyContent: "space-between",padding: 5,marginTop:10}}>
        <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: "serif",color:'#000' }}>Category Name</Text>
        <Text style={{fontSize: 16,marginBottom: 5,fontFamily: "serif",borderBottomWidth: 0.3,color:'#000'}}>{profileInfo?.category_name}</Text>
      </View>
      <View style={{flexDirection: "column",justifyContent: "space-between",padding: 5,marginTop:10}}>
        <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: "serif",color:'#000' }}>Attached Vendor Name</Text>
        <Text style={{fontSize: 16,marginBottom: 5,fontFamily: "serif",borderBottomWidth: 0.3,color:'#000'}}>{profileInfo?.attched_vendor_name}</Text>
      </View>
      <View style={{ flexDirection: "column", justifyContent: "space-between",padding: 5,}}>
        <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: "serif",color:'#000' }}>Name</Text>
        <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,}}>
          <TextInput style={{fontSize: 16,marginBottom: 5,fontFamily: "serif",color:'#000'}} value={vendorName} onChangeText={(text)=>setVendorName(text)} editable={nameEditable} ref={nameUseRef}/>
          {
            nameEditable
            ?<View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <IconButton
                icon="close"
                size={20}
                color="#fc2e2b"
                onPress={()=>setNameEditable(!nameEditable)}
              />
              <IconButton
                icon="check"
                size={20}
                color="#177a10"
                onPress={submitName}
              />
            </View>
            :<IconButton
              icon="pencil"
              size={20}
              color="black"
              onPress={()=>setNameEditable(!nameEditable)}
              disabled = {nameEditable?true:false}
            />
          }
        </View>
      </View>
      <View style={{ flexDirection: "column", justifyContent: "space-between",padding: 5,}}>
        <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: "serif",color:'#000' }}>Mobile</Text>
        <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,}}>
          <TextInput style={{fontSize: 16,marginBottom: 5,fontFamily: "serif",color:'#000'}} value={vendorMobile} onChangeText={(text)=>setVendorMobile(text)} editable={mobileEditable} ref={mobileUseRef}/>
          {
            mobileEditable
            ?<View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <IconButton
                icon="close"
                size={20}
                color="#fc2e2b"
                onPress={()=>setMobileEditable(!mobileEditable)}
              />
              <IconButton
                icon="check"
                size={20}
                color="#177a10"
                onPress={submitMobile}
              />
              </View>
            :<IconButton
              icon="pencil"
              size={20}
              color="black"
              onPress={()=>setMobileEditable(!mobileEditable)}
              disabled = {mobileEditable?true:false}
            />
          }
        </View>
      </View>
      <View style={{ flexDirection: "column", justifyContent: "space-between",padding: 5,}}>
        <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: "serif",color:'#000' }}>Email</Text>
        <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3}}>
          <TextInput style={{fontSize: 16,marginBottom: 5,fontFamily: "serif",color:'#000'}} value={vendorEmail} onChangeText={(text)=>setVendorEmail(text)} editable={emailEditable} ref={emailUseRef}/>
          {
            emailEditable
            ?<View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <IconButton
                icon="close"
                size={20}
                color="#fc2e2b"
                onPress={()=>setEmailEditable(!emailEditable)}
                />
                <IconButton
                  icon="check"
                  size={20}
                  color="#177a10"
                  onPress={submitEmail}
                />
              </View>
            :<IconButton
              icon="pencil"
              size={20}
              color="black"
              onPress={()=>setEmailEditable(!emailEditable)}
              disabled = {emailEditable?true:false}
            />
          }
        </View>
      </View>
    </View>
  );
};

export default AccountDetails;
