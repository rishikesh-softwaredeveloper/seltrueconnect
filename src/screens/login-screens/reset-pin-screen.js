import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import TextInput from '../../containers/text-input';
import { PostResetPin } from '../../services/login-services/post-reset-pin';
import * as FieldValidator from '../../helpers/fieldValidator';


const ResetPinScreen = ({ route }) => {
  const navigation = useNavigation();
  const [pin, setPin] = useState({ value: '', error: '' });
  const [confirmpin, setConfirmPin] = useState({ value: '', error: '' });
  const { vendor_id } = route.params;

  const forgotPwdPress = () => {

    const pin_error = FieldValidator.pinValidator(pin.value, 'Pin')
    const confirmpin_error = FieldValidator.pinValidator(confirmpin.value, 'Confirm Pin')
    
    try {
      if (pin_error.length > 0 || confirmpin_error.length > 0) {
        setPin({ ...pin, 'error': pin_error });
        setConfirmPin({ ...confirmpin, 'error': confirmpin_error });
      }
      else {
        setPin({ ...pin, 'error': '' });
        setConfirmPin({ ...confirmpin, 'error': '' });
      }
    } catch (error) {}


    const resetPinData = {
      "vendor_id": vendor_id,
      "pin": pin.value
    }

    if (pin.error == "" && confirmpin.error == "") {
      if (pin.value === confirmpin.value) {
        if (vendor_id !== undefined) {
          PostResetPin(resetPinData).then((Response) => {

            if (Response.status == 1) {
              alert("You Have Successfully Updated Pin");
              navigation.navigate('LoginScreen');
            }

          })
        }
      } else {
        setPin({ ...pin, 'error': "Mismatch pin" });
        setConfirmPin({ ...confirmpin, 'error': "Mismatch confirmpin" });
      }
    }
  }

  return (
    <ThemeProvider>
      <ScrollView>
        <View style={{ alignItems: 'center', marginVertical: "20%" }}>
          <View style={styles.buttonsContainer}></View>
            <TextInput
              label='Pin'
              placeholder='PIN'
              style={styles.input}
              maxLength={4}
              keyboardType='number-pad'
              onChangeText={(text) => setPin({ 'value': text, error: '' })}
              value={pin.value}
              error={!!pin.error}
              errorText={pin.error}
              secureTextEntry={true}
              inputContainerStyle={{ borderBottomWidth: 0 }}
            />
            <TextInput
              label='Confirm Pin'
              placeholder='CONFIRM PIN'
              style={styles.input}
              maxLength={4}
              keyboardType='number-pad'
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPin({ 'value': text, error: '' })}
              value={confirmpin.value}
              error={!!confirmpin.error}
              errorText={confirmpin.error}
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
              onPress={forgotPwdPress}
            />
        </View>
      </ScrollView>
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
    marginHorizontal: "10%",
    marginVertical: "10%",
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
  },
});

export default ResetPinScreen;
