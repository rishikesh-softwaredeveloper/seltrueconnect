import React from "react";
import { StyleSheet, View } from "react-native";
import Lottie from 'lottie-react-native';

const AppLoader =() =>{    
    return(
        <View 
            style={[StyleSheet.absoluteFillObject,styles.container]}
        >
            <Lottie source={require('../../constants/apploading.json')} autoPlay  style={{width:350,height:250}} loop/>  
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.3)',
        zIndex:1
    }
})

export default AppLoader;