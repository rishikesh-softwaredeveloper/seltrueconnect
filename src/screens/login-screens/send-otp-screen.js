import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import TextInput from '../../containers/text-input';
import { PostSendOTP } from '../../services/login-services/post-send-otp';
import * as FieldValidator from '../../helpers/fieldValidator';

const SendOtpScreen = ({ route }) => {
  const navigation = useNavigation();
  const { vendorParam } = route.params;
  const mobile_no = vendorParam.mobile;

  const [mobile, setMobile] = useState({ value: mobile_no, error: '' });

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
    
    if (mobile.error == "" && mobile.error == "") {
      PostSendOTP(checkmobile).then((Response) => {
        if (Response.status == 1) {
          navigation.navigate('CodeScreen',{"vendorParam":vendorParam,"mobile_no":mobile.value});
        } else if (Response.status == 0) {
          alert(Response.message);
        }
      })
    }
  }
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
          titleStyle={{ fontSize: 23 }}
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
    padding: 10
  }
});

export default SendOtpScreen;
