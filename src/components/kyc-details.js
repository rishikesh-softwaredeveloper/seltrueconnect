import React, { useState, useRef } from 'react';
import {View, Text, TextInput } from 'react-native';
import { useSelector } from "react-redux";
import { IconButton } from "react-native-paper";
import { PostUpdateVendor } from "../services/login-services/post-update-vendor";


const KycDetails = () => {
  const dealer = useSelector((state) => state.dealer[0]);

  const [panEditable, setPanEditable] = useState(false);
  const [upiEditable, setUpiEditable] = useState(false);
  const [PanNo,setPanNo] = useState(dealer.pan_card);
  const [UpiId, setUPiId] = useState(dealer.upi_id);
  const [aadharEditable, setAadharEditable] = useState(false);
  const [aadhar,setAadhar] = useState(dealer.aadhar_no);
  const [gstEditable, setGstEditable] = useState(false);
  const [gst,setGst] = useState(dealer.gst_no);
  
  const [panBottomColor,setPanBottomColor] = useState('');
  const [upiBottomColor,setUpiBottomColor] = useState('');
  const [aadharBottomColor,setAadharBottomColor] = useState('');
  const [gstBottomColor,setGstBottomColor] = useState('');

  const panUseRef = useRef();
  const upiUseRef = useRef();
  const aadharUseRef = useRef();
  const gstUseRef = useRef();
 

  if(panEditable){
    panUseRef.current.focus();
  }

  if(upiEditable){
    upiUseRef.current.focus();
  }

  if(aadharEditable){
    aadharUseRef.current.focus();
  }

  if(gstEditable){
    gstUseRef.current.focus();
  }
 
  const submitPan=()=>{
    const re = /^[a-zA-Z]{5}\d{4}[A-Za-z]{1}$/gm

    if(!re.test(PanNo)){
      setPanBottomColor("red");
      return false
    }

    setPanEditable(!panEditable);
    setPanBottomColor('#ccc');
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"pan_card","update_val":PanNo});
  }
  const closePan=()=>{
    const re = /^[a-zA-Z]{5}\d{4}[A-Za-z]{1}$/gm
    
    setPanEditable(!panEditable);
    setPanBottomColor("#ccc");
    if(PanNo == ''){
      setPanEditable(!panEditable);
      setPanBottomColor("#ccc");
    }else if(!re.test(PanNo)){
      setPanBottomColor("red");
      return false
    }

  }

  const submitUpi=()=>{
    // const re = /^[a-zA-Z]{5}\d{4}[A-Za-z]{1}$/gm

    // if(!re.test(UpiId)){
    //   setUpiBottomColor("red");
    //   return false
    // }

    setUpiEditable(!upiEditable);
    setUpiBottomColor('#ccc');
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"upi_id","update_val":UpiId});
  }
  const closeUpi=()=>{
    // const re = /^[a-zA-Z]{5}\d{4}[A-Za-z]{1}$/gm

    setUpiEditable(!upiEditable);
    setUpiBottomColor('#ccc');
    if(UpiId == ''){
      setUpiEditable(!upiEditable);
      setUpiBottomColor("#ccc");
    }
    // else if(!re.test(UpiId)){
    //   setUpiBottomColor("red");
    //   return false
    // }

  }
  
  const submitAadhar=()=>{
    const re =/^\d{12}$/gm

    if(!re.test(aadhar)){
      setAadharBottomColor("red");
      return false
    } 

    setAadharEditable(!aadharEditable);
    setAadharBottomColor("#ccc");
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"aadhar_no","update_val":aadhar});
  }

  const closeAadhar=()=>{
    const re =/^\d{12}$/gm
    
    setAadharEditable(!aadharEditable);
    setAadharBottomColor("#ccc");
    if(aadhar == ''){
      setAadharEditable(!aadharEditable);
      setAadharBottomColor("#ccc");
    }else if(!re.test(aadhar)){
      setAadharBottomColor("red");
      return false
    }

  }


  const submitGst=()=>{
    const re = /^\d{2}[a-zA-Z]{5}\d{4}[A-Za-z]{1}\d[Zz]\S$/gm

    if(!re.test(gst)){
      setGstBottomColor("red");
      return false
    }

    setGstEditable(!gstEditable);
    setGstBottomColor("#ccc");
    PostUpdateVendor({"vendor_id":dealer.vendor_id,"type":"gst_no","update_val":gst});
  }

  const closeGst=()=>{
    const re =/^\d{2}[a-zA-Z]{5}\d{4}[A-Za-z]{1}\d[Zz]\S$/gm

    setGstEditable(!gstEditable);
    setGstBottomColor("#ccc");
    if(gst == ''){
      setGstEditable(!gstEditable);
      setGstBottomColor("#ccc");
    }else if(!re.test(gst)){
      setGstBottomColor("red");
      return false
    }

  }
 
  return (
      <View style={{borderWidth:0,borderColor:'#ccc',marginTop:0}}>
        <View style={{flexDirection: "column",justifyContent: "space-between",padding: 5}}>
          <Text style={{ fontSize: 14,  fontFamily: "serif",color:'#000' }}>PAN</Text>
          <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,borderBottomColor:panBottomColor}}>
            <TextInput style={{fontSize: 16,fontFamily: "serif",width:120,color:'#000'}} value={PanNo} maxLength={10} onChangeText={(text)=>{setPanNo(text)}}  ref={panUseRef} />
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
        <View style={{flexDirection: "column",justifyContent: "space-between",padding: 5}}>
          <Text style={{ fontSize: 14,  fontFamily: "serif" ,color:'#000'}}>UPI</Text>
          <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,borderBottomColor:upiBottomColor}}>
            <TextInput style={{fontSize: 16,fontFamily: "serif",width:280,color:'#000'}} value={UpiId} onChangeText={(text)=>{setUPiId(text)}}  ref={upiUseRef} />
            {
              upiEditable
              ?<View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:-20}}>
                <IconButton
                  icon="close"
                  size={20}
                  color="#fc2e2b"
                  onPress={closeUpi}
                />
                <IconButton
                  icon="check"
                  size={20}
                  color="#177a10"
                  onPress={submitUpi}
                />
              </View>
              :<IconButton
                icon="pencil"
                size={20}
                color="black"
                onPress={()=>setUpiEditable(!upiEditable)}
                disabled = {upiEditable?true:false}
              />
            }
          </View>
        </View>
        <View style={{ flexDirection: "column",justifyContent: "space-between",padding: 5, }}  >
          <Text style={{ fontSize: 14, fontFamily: "serif",color:'#000' }}>Aadhar</Text>
          <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,borderBottomColor:aadharBottomColor}}>
            <TextInput style={{fontSize: 16,fontFamily: "serif",color:'#000'}} value={aadhar} maxLength={12} onChangeText={(text)=>setAadhar(text)}  ref={aadharUseRef}/>
            {
              aadharEditable
              ?<View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <IconButton
                  icon="close"
                  size={20}
                  color="#fc2e2b"
                  onPress={closeAadhar}
                />
                <IconButton
                  icon="check"
                  size={20}
                  color="#177a10"
                  onPress={submitAadhar}
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
          <Text style={{ fontSize: 14, fontFamily: "serif",color:'#000' }}>GST</Text>
          <View style={{flexDirection: "row",justifyContent: "space-between",borderBottomWidth: 0.3,borderBottomColor:gstBottomColor}}>
            <TextInput style={{fontSize: 16,fontFamily: "serif",color:'#000'}} value={gst} maxLength={15} onChangeText={(text)=>setGst(text)}  ref={gstUseRef}/>
            {
              gstEditable
              ?<View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <IconButton
                  icon="close"
                  size={20}
                  color="#fc2e2b"
                  onPress={closeGst}
                />
                <IconButton
                  icon="check"
                  size={20}
                  color="#177a10"
                  onPress={submitGst}
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
      </View>
    );
  }

  export default  KycDetails;
   
