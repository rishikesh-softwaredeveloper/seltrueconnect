import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView,BackHandler } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { PostUpdateGenPin } from '../../services/login-services/post-update-gen_pin';
import * as FieldValidator from '../../helpers/fieldValidator';
import TextInput from '../../containers/text-input';

const GeneratePinScreen = ({ route }) => {
  
  const { mobile_no } = route.params;
  const {vendorParam} = route.params;
  
  const navigation = useNavigation();
  const [Mobile, setMobile] = useState({ value: mobile_no, error: '' });
  const [pin, setPin] = useState({ value: '', error: '' });
  const [confirmpin, setConfirmPin] = useState({ value: '', error: '' });

  const generatepinpress = () => {
    
    const pin_error = FieldValidator.pinValidator(pin.value, 'Pin')
    const confirmpin_error = FieldValidator.pinValidator(confirmpin.value, 'Confirm Pin')
    const mobile_error = FieldValidator.mobilenoValidator(Mobile.value, 'Mobile')
    try {
      if (pin_error.length > 0 || confirmpin_error.length > 0 || mobile_error.length > 0) {
        setPin({ ...pin, 'error': pin_error })
        setConfirmPin({ ...confirmpin, 'error': confirmpin_error })
        setMobile({ ...Mobile, 'error': mobile_error })
      }
      else {
        setPin({ ...pin, 'error': '' })
        setConfirmPin({ ...confirmpin, 'error': '' })
        setMobile({ ...Mobile, 'error': '' })
      }
    } catch (error) {
    }

    const pindata = {
      "vendor_id": vendorParam.vendor_id,
      "mobile": Mobile.value,
      "pin": pin.value
    }

    if (pin.error == '' && Mobile.error == "" && confirmpin.error == '') {
      if (vendorParam.vendor_id !== undefined) {
        PostUpdateGenPin(pindata).then((Response) => {
          if (Response.status == 1) {
            alert('YOU ARE SUCCESSFULLY REGISTERED');
            navigation.navigate('LoginScreen');
          } else if (Response.status == 0) {
            setPin({ ...pin, 'error': "Mismatch Pin" })
            setConfirmPin({ ...confirmpin, 'error': "Mismatch ConfirmPin" })
          }
        })
      }
    }
  }

  const handleBackButtonClick = () => {
    navigation.goBack()
    return true;
  }

  useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  return (
    <ScrollView>
      <ThemeProvider>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 15 }}>Mr/Ms {vendorParam.name}{"\n"}
            <Text style={{ fontSize: 15, marginVertical: 15, fontWeight: 'normal' }}>Generate Pin to further Login process </Text>
          </Text>
          <View style={styles.buttonsContainer}></View>
          <TextInput
            label='Mobile'
            placeholder='MOBILE'
            style={styles.input}
            keyboardType='number-pad'
            onChangeText={(text) => setMobile({ 'value': text, error: '' })}
            value={Mobile.value}
            error={!!Mobile.error}
            errorText={Mobile.error}
            maxLength={10}
          />
          <TextInput
            label='Pin'
            placeholder='PIN'
            style={styles.input}
            keyboardType='number-pad'
            onChangeText={(text) => setPin({ 'value': text, error: '' })}
            value={pin.value}
            error={!!pin.error}
            errorText={pin.error}
            maxLength={4}
            secureTextEntry={true}
          />
          <TextInput
            label='Confirm Pin'
            placeholder='CONFIRM PIN'
            style={styles.input}
            keyboardType='number-pad'
            onChangeText={(text) => setConfirmPin({ 'value': text, error: '' })}
            value={confirmpin.value}
            error={!!confirmpin.error}
            errorText={confirmpin.error}
            secureTextEntry={true}
            maxLength={4}
          />
          <Button
            title="Submit"
            buttonStyle={{
              backgroundColor: '#1194f6',
              borderRadius: 5
            }}
            titleStyle={{ fontSize: 23 }}
            iconContainerStyle={{ marginRight: 10 }}
            containerStyle={styles.buttonstyles}
            onPress={generatepinpress}
          />
        </View>
      </ThemeProvider>
    </ScrollView>
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
    width: '100%',
    marginVertical: "10%"
  },
  buttonstyles: {
    marginHorizontal: 30,
    marginVertical: 20,
    height: 50,
    width: "80%"
  },
  input: {
    marginHorizontal: 10,
    marginVertical: 10,
    height: 50,
    width: "80%",
    margin: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  }
});

export default GeneratePinScreen;
