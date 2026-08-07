import React, { useRef, useState,useEffect } from 'react';
import { StyleSheet, View, TextInput, Text,BackHandler } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { PostVerifyOTP } from '../../services/login-services/post-verify-otp';

const CodeAfterForgotScreen = ({ route }) => {
  const navigation = useNavigation();
  const { vendor_id } = route.params;
  const { mobile } = route.params;

  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');

  const verifyOtp = () => {
    const checkotp ={
      "mobile":mobile,
      "otp":pin1+''+pin2+''+pin3+''+pin4
    }
    PostVerifyOTP(checkotp).then((Res)=>{
      if(Res.status ==1){
        navigation.navigate('ResetPinScreen', {"vendor_id":vendor_id});
      }else{
        alert(Res.message);
      }
    });
  }

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

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonsContainer}></View>
        <Text style={{ fontSize: 40,fontFamily:'serif', fontWeight: 'bold', marginVertical: 20, marginHorizontal: 20 }}>4-digit code{"\n"}
        <Text style={{ fontSize: 15,fontFamily:'serif', marginVertical: 20, marginHorizontal: 20 }}>Please enter the code we've sent to {mobile} </Text></Text>
      <View style={{ flex: 0.3, justifyContent: "space-evenly", flexDirection: 'row' }}>
        <TextInput
          autoFocus={true}
          ref={pin1Ref}
          maxLength={1}
          value={pin1}
          keyboardType='number-pad'
          onChangeText={(item) => {
            setPin1(item)
            item && pin2Ref.current.focus();
          }}
          style={styles.inputstyle}
        />
        <TextInput
          ref={pin2Ref}
          maxLength={1}
          value={pin2}
          keyboardType='number-pad'
          style={styles.inputstyle}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === 'Backspace' && pin2.length === 0) {
              pin1Ref.current.focus();
            }
          }}
          onChangeText={(item) => {
            setPin2(item)
            if (item.length === 0) {
              pin2Ref.current.focus();
            } else {
              pin3Ref.current.focus();
            }
          }}
        />
        <TextInput
          ref={pin3Ref}
          maxLength={1}
          value={pin3}
          keyboardType='number-pad'
          style={styles.inputstyle}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === 'Backspace' && pin3.length === 0) {
              pin2Ref.current.focus();
            }
          }}
          onChangeText={(item) => {
            setPin3(item)
            if (item.length === 0) {
              pin3Ref.current.focus();
            } else {
              pin4Ref.current.focus();
            }
          }}
        />
        <TextInput
          ref={pin4Ref}
          maxLength={1}
          value={pin4}
          keyboardType='number-pad'
          style={styles.inputstyle}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === 'Backspace' && pin4.length === 0) {
              pin3Ref.current.focus();
            }
          }}
          onChangeText={(item) => {
            setPin4(item)
          }}
        />
      </View>
      <Button
        title="Verify"
        buttonStyle={{
          backgroundColor: '#1194f6',
          borderRadius: 5
        }}
        titleStyle={{ fontWeight: 'bold', fontSize: 23,fontFamily:'serif' }}
        containerStyle={styles.buttonstyles}
        onPress={verifyOtp}
      />
    </View>
  );
}

export default CodeAfterForgotScreen;

const styles = StyleSheet.create({
  inputstyle: {
    backgroundColor: "#f5f4f2",
    fontWeight: "600",
    alignSelf: "center",
    fontSize: 20, height: 55,
    width: "10%",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "grey",
    alignContent: "center",
    textAlign: "center",
    fontFamily:'serif'
  },
  buttonstyles: {
    marginHorizontal: 50,
    marginVertical: 10,
    height: 50,
    marginTop:50
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5
  }
})