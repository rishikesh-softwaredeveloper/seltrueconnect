import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { StatusBar, PermissionsAndroid, Platform} from 'react-native';
import Navigation from './src/navigations';

//redux
import { Provider } from 'react-redux';
import { store, persistor } from './src/state/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {

  const checkLocation =async()=>{
    try {
      if(Platform.OS != 'ios'){
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("location permission granted")
        }else {
            Alert.alert("Error","Please Allow Location Permissions From App settings")
            console.log("location permission denied")
        }
      }
    } catch (error) {
        console.log(error,'check location')
    }
  }

  useEffect(()=>{
    checkLocation()
  },[])
  
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor = {persistor}> */}
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#0086c1" translucent = {true}/>
        <Navigation/>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;