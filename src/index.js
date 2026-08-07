import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer,DefaultTheme } from "@react-navigation/native";
import { MainStackNavigator } from "./navigations/MainNavigator";
import { Provider } from "react-redux";
import { store } from "./state/store";


const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 45, 85)',
      background:'#ffff'
    },
};


const App = ()=>{

    return(
        <Provider store={store}>
            <NavigationContainer theme={MyTheme}>
                {/* <MainStackNavigator/> */}
            </NavigationContainer>
        </Provider>
    )
}

const styles = StyleSheet.create({});

export default App;