import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, BackHandler, Alert } from 'react-native';
import { ThemeProvider, Image } from 'react-native-elements';
import ElementButton from '../../containers/button';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to Exit App?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ThemeProvider>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../assets/images/logo_small.png')}
          containerStyle={styles.imagestyles}
        />
        <View style={styles.buttonsContainer}></View>
        <ElementButton
          title="Login"
          style={{
            backgroundColor: '#0086c1',
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate('LoginScreen')}
        />
        <ElementButton
          title="Register"
          style={{
            backgroundColor: '#0086c1',
            borderRadius: 5
          }}
          onPress={() => navigation.navigate('RegNavigationScreen')}
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
    width: '100%',
    marginVertical: -50
  },
  imagestyles: {
    marginHorizontal: 50,
    marginVertical: 200,
    height: 120,
    width: 300
  }

});

export default HomeScreen;
