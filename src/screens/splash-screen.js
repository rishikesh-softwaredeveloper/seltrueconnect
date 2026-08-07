import React, { useEffect } from "react";
import { View, BackHandler } from "react-native";
import { ThemeProvider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
// import GifImage from '@lowkey/react-native-gif';


const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("HomeScreen")
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
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      {/* <GifImage
        source={require('../assets/images/circles-menu-1.gif')}
        style={{width: 50,height: 50}}
        resizeMode={'cover'}
      /> */}
      </View>
    </ThemeProvider>
  )
}

export default SplashScreen;