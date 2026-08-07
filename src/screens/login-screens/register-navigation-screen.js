import React, { useEffect } from 'react';
import { StyleSheet, View,BackHandler } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const RegNavigationScreen = () => {
  const navigation = useNavigation();

  const handleBackButtonClick = () => {
    navigation.navigate('HomeScreen');
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
      <View style={styles.contentView}>
        <View style={styles.buttonsContainer}></View>
         <Button
          title="Existing Customer"
          buttonStyle={{
            backgroundColor: '#1194f6',
            borderRadius: 5
          }}
          titleStyle={{ fontWeight: 'bold', fontSize: 18,fontFamily:'serif' }}
          containerStyle={styles.buttonstyles}
          onPress={()=>navigation.navigate('SearchScreen')}
        />
        <Button
          title="New Customer"
          buttonStyle={{
            backgroundColor: '#1194f6',
            borderRadius: 5
          }}
          titleStyle={{ fontWeight: 'bold', fontSize: 18,fontFamily:'serif' }}
          containerStyle={styles.buttonstyles}
          onPress={()=>navigation.navigate('RegistrationScreen')}
        />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonstyles: {
    marginHorizontal: 50,
    marginVertical: "-17%",
    height: 50,
    width: "80%"
  }
});

export default RegNavigationScreen;
