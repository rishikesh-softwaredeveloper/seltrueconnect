import React, { useState, useEffect , useRef } from "react";
import { Text, View,TextInput } from "react-native";
import { PostCheckPayment } from "../services/bundle-services/post-check-payment";
import { GetTcsValue } from "../services/bundle-services/post-get-tcs-value";
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

const OfflinePaymentDetails = ({valid, ...props}) => {
  const [vocherCode, setVocherCode] = useState(''); 
  const [invalidVoucher, setInvalidVoucher] = useState(false);
  const [voucherErrMessage, setVoucherErrMessage] = useState('');
  const [tcsAmount, setTcsAmount] = useState(0);

  const vocherUseRef = useRef();

  const token = useSelector((state)=>state.token[0]);
  const dealer = useSelector((state)=>state.dealer);
  const sumprice = useSelector((state) => state.sumprice);
  const discount = useSelector((state) => state.discount);
  const order_amount= sumprice-discount;

  const dispatch = useDispatch();
  const {
    initVocherId,
    clearVocherId
  } = bindActionCreators(actionCreators, dispatch);

  useEffect(()=>{
    vocherUseRef.current.focus();
  },[])

  useEffect(()=>{
    clearVocherId();
    valid(false)
    if(vocherCode.length === 8){
      setInvalidVoucher(false);
      initVocherId(vocherCode);
      check(vocherCode);
    }else if(vocherCode.length === 0){
      setInvalidVoucher(true)
      setVoucherErrMessage('Please Enter Voucher No')
    }else{
      setInvalidVoucher(true);
      setVoucherErrMessage('Invalid Voucher No')
    }
  }, [vocherCode])

  useEffect(()=>{
    const tcsData ={
      "vendorId":dealer[0].vendor_id,
      "orderAmount":order_amount,
      "category_id":dealer[0].category_id,
      "attached_vendor_id": dealer[0].attached_vendor_id
    }
    GetTcsValue(tcsData,token).then((response)=>{
      if(response.status == 1){
        setTcsAmount(response.tcs_value)
      }
    })
  },[tcsAmount])

  const check =(id)=>{
    
    let checkVocher ={
      "vendor_id":dealer[0].vendor_id,
      "voucher_no":id,
      "order_amount":order_amount+tcsAmount
    }

    PostCheckPayment(checkVocher, token).then((response)=>{
      if(response['status'] == 0){
        if(response['data']['error_code'] == 1){
          setInvalidVoucher(true);
          setVoucherErrMessage('Voucher Amount Mismatched')
        }else if(response['data']['error_code'] == 0){
          setInvalidVoucher(true);
          setVoucherErrMessage('Invalid Voucher No')
        }
        valid(false)
      }else{
        valid(true)
        setInvalidVoucher(false);
        setVoucherErrMessage('')
      }
    });
  }
  
  return (
    <View style={{padding:10,margin:10,borderWidth:1,borderRadius:10,borderColor:'#ccc'}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <TextInput
          style={{fontSize:18,fontWeight:"600"}}
          onChangeText={(text)=>{
            setVocherCode(text)
          }}
          maxLength={8}
          autoCapitalize = {"characters"}
          ref={vocherUseRef}
          
          value={vocherCode}
          placeholder="Voucher Code"
        />
          {
          (invalidVoucher)? 
            <Text style={{color:"red",padding:5}}>{voucherErrMessage}</Text>
          : null
          }
      </View>
    </View>
  );
};

export default OfflinePaymentDetails;
