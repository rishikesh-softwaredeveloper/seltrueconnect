import React, { useState,useEffect } from 'react';
import { StyleSheet, View,BackHandler } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import TextInput from '../../containers/text-input';
import { PostCheckMobile } from '../../services/login-services/post-check-mobile';
import { PostSendOTP } from '../../services/login-services/post-send-otp';
import * as FieldValidator from '../../helpers/fieldValidator';

const ForgotPinScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState({ value: '', error: '' });

  const Forgotpress = () => {
    const mobile_error = FieldValidator.mobilenoValidator(mobile.value, 'Mobile')
    try {
      if (mobile_error.length > 0) {
        setMobile({ ...mobile, 'error': mobile_error });
        return false
      }
      else {
        setMobile({ ...mobile, 'error': '' });
      }
    } catch (error) {}

    const checkmobiledata = {
      "mobile": mobile.value
    }
    const checkmobile ={
      "mobile": mobile.value
    }
    
    if (mobile.error == "") {
      PostCheckMobile(checkmobiledata).then((Response) => {

        if (Response.status == 1) {
          PostSendOTP(checkmobile).then((Res)=>{
            if(Res.status == 1){
              navigation.navigate('CodeAfterForgotScreen', { 'vendor_id': Response.vendor_id,"mobile":mobile.value });
            }
          })
        } else if (Response.status == 0) {
          setMobile({ ...mobile, 'error': "No Records Available" });
        }

      })
    }
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
    <ThemeProvider>
      <View style={{ alignItems: 'center', marginVertical: 200 }}>
        <View style={styles.buttonsContainer}></View>
        <TextInput
          label='Mobile'
          placeholder='MOBILE'
          style={styles.input}
          maxLength={10}
          keyboardType='number-pad'
          onChangeText={(text) => setMobile({ 'value': text, error: '' })}
          value={mobile.value}
          error={!!mobile.error}
          errorText={mobile.error}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
        <Button
          title="Submit"
          buttonStyle={{
            backgroundColor: '#1194f6',
            borderRadius: 5
          }}
          titleStyle={{ fontSize: 23,fontFamily:'serif' }}
          iconContainerStyle={{ marginRight: 10 }}
          containerStyle={styles.buttonstyles}
          onPress={Forgotpress}
        />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  contentView: {
    flex: 1
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  buttonstyles: {
    marginHorizontal: 30,
    marginVertical: 20,
    height: 50,
    width: "80%"
  },
  input: {
    marginHorizontal: 30,
    marginVertical: 10,
    height: 50,
    margin: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontFamily:'serif'
  }
});

export default ForgotPinScreen;
