import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView,BackHandler } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { PostRegister } from '../../services/login-services/post-new-dealer';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import TextInput from '../../containers/text-input';
import * as FieldValidator from '../../helpers/fieldValidator';

const GeneratePinAfterRegScreen = ({ route }) => {
  const dispatch = useDispatch()
  const { 
    removePan,
    removeAadhar,
    removeGstin 
  } = bindActionCreators(actionCreators, dispatch)

  const { mobile_no } = route.params;
  const {registerParams} = route.params;

  const navigation = useNavigation();
  const [Mobile, setMobile] = useState({ value: mobile_no, error: '' });
  const [pin, setPin] = useState({ value: '', error: '' });
  const [confirmpin, setConfirmPin] = useState({ value: '', error: '' });
  const [generateParams, setGenerateParams] = useState({});

  const generatepinpress = () => {
    
    const pin_error = FieldValidator.pinValidator(pin.value, 'Pin')
    const confirmpin_error = FieldValidator.pinValidator(confirmpin.value, 'Confirm Pin')
    const mobile_error = FieldValidator.mobilenoValidator(Mobile.value, 'Mobile')
    try {
      if (pin_error.length > 0 || confirmpin_error.length > 0 || mobile_error.length > 0) {
        setPin({ ...pin, 'error': pin_error });
        setConfirmPin({ ...confirmpin, 'error': confirmpin_error });
        setMobile({ ...Mobile, 'error': mobile_error });
      }
      else {
        setPin({ ...pin, 'error': '' });
        setConfirmPin({ ...confirmpin, 'error': '' });
        setMobile({ ...Mobile, 'error': '' });
      }
    } catch (error) {
    }

    const regGenerateParams = {
      "company": registerParams.company,
      "name": registerParams.name,
      "state": registerParams.state,
      "city": registerParams.city,
      "address":registerParams.address,
      "postal_code": registerParams.postal_code,
      "aadhar": registerParams.aadar,
      "gst": registerParams.gstin,
      "pan": registerParams.pan,
      "upi_id":registerParams.upi_id,
      "mobile": Mobile.value,
      "pin": pin.value
    }

    if (pin.error == '' && Mobile.error == "" && confirmpin.error == '') {
      if (pin.value === confirmpin.value) {
        if (registerParams.register === "register") {
          console.log(regGenerateParams,'regGenerateParams');
          PostRegister(regGenerateParams).then((Response) => {
            console.log(Response,'New Login');
            if (Response.status == 1) {
              navigation.navigate('LoginScreen');
              alert(Response.message);
              //remove pan/aadhar/gstin data
              removePan();
              removeAadhar();
              removeGstin();
             
            } else if (Response.status == 0) {
              alert(Response.message);
            }
          })
        }
      } else {
        setPin({ ...pin, 'error': "Mismatch pin" });
        setConfirmPin({ ...confirmpin, 'error': "Mismatch confirmpin" });
      }
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
    <ScrollView>
      <ThemeProvider>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 15,fontFamily:'serif' }}>Mr/Ms {registerParams.name}{"\n"}
            <Text style={{ fontSize: 15, marginVertical: 15, fontWeight: 'normal',fontFamily:'serif' }}>Generate Pin to further Login process </Text>
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
            titleStyle={{ fontSize: 23,fontFamily:'serif' }}
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
    padding: 10,
    fontFamily:'serif'
  }
});

export default GeneratePinAfterRegScreen;
