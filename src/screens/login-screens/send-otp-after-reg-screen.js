import React, { useState,useEffect } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import TextInput from '../../containers/text-input';
import { PostSendOTP } from '../../services/login-services/post-send-otp';
import * as FieldValidator from '../../helpers/fieldValidator';

const SendOtpAfterRegScreen = ({ route }) => {
  const navigation = useNavigation();
  const { company } = route.params;
  const { name } = route.params;
  const { state } = route.params;
  const { postal_code } = route.params;
  const { city } = route.params;
  const { address } = route.params;
  const { pan } = route.params;
  const { upi_id } = route.params;
  const { aadar } = route.params;
  const { gstin } = route.params;
  const { register } = route.params;
  
  let registerParams ={
    "company": company,
    "name": name,
    "state": state,
    "postal_code": postal_code,
    "city": city,
    "address": address,
    "pan": pan,
    "upi_id":upi_id,
    "aadar": aadar,
    "gstin": gstin,
    "register": register
  }
  const [mobile, setMobile] = useState({ value: '', error: '' });

  const SendOtpPress = () => {
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

    const checkmobile = {
      "mobile": mobile.value
    }
    
    if (mobile.error == "") {
      PostSendOTP(checkmobile).then((Response) => {
        if (Response.status == 1) {
          navigation.navigate('CodeAfterRegScreen',{"mobile_no":mobile.value,"registerParams":registerParams});
        } else if (Response.status == 0) {
          alert(Response.message);
        }
      })
    }
  }

  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
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
          title="Send OTP"
          buttonStyle={{
            backgroundColor: '#1194f6',
            borderRadius: 5
          }}
          titleStyle={{ fontSize: 23,fontFamily:'serif' }}
          iconContainerStyle={{ marginRight: 10 }}
          containerStyle={styles.buttonstyles}
          onPress={SendOtpPress}
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

export default SendOtpAfterRegScreen;
