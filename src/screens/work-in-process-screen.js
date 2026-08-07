import React, { useEffect } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { ThemeProvider, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const WorkInProgress = () => {
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
      <View style={{ alignItems: 'center' }}></View>
      <Image
        source={require('../assets/images/work-in-progress.png')}
        containerStyle={styles.imagestyles}
      />
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  imagestyles: {
    marginHorizontal: 20,
    marginVertical: 100,
    height: "60%",
    width: "90%"
  }
})

export default WorkInProgress;