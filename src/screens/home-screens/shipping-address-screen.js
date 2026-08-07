import React, { useEffect, useState } from "react";
// import * as Location from 'expo-location';
import { View, TextInput, Alert, BackHandler, ScrollView,PermissionsAndroid,Platform} from "react-native";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { useNavigation } from "@react-navigation/native";
import { Card, Image} from "react-native-elements";
import { IconButton } from "react-native-paper";
import { PostAddShippingAddress } from "../../services/bundle-services/post-add-shipping-address";
import { GetShippingAddress } from "../../services/bundle-services/get-shipping-address";
import pincodes from '../../data/pincode';
// import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';


const ShippingAddressScreen = () => {

   
    
    const navigation = useNavigation();
    const dealer = useSelector((state)=>state.dealer);
    const token = useSelector((state) => state.token[0]);
    const vendor_id = dealer[0].vendor_id;

    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('');
    const [pinCode,setPinCode]= useState();
    const [city,setCity]= useState();
    const [state,setState]= useState();
    const [on,seton] = useState(false);
    const [gpsOn,setGpsOn] = useState(false);

    const dispatch = useDispatch();
    const { 
        initShippingAddress,
        clearShippingAddress
    } = bindActionCreators(actionCreators,dispatch);

    const addShippingAddress = ()=>{
        if(displayCurrentAddress != ''){
            seton(true);
            const newAddress = {
                "vendor_id":vendor_id,
                "shipping_address":displayCurrentAddress,
                "state":state,
                "city":city,
                "pincode":pinCode,
                "attached_vendor_id":dealer[0].attached_vendor_id,
                "category_id":dealer[0].category_id
            }
            PostAddShippingAddress(newAddress,token).then((response)=>{
                console.log(response);
                if(response.status ==1){
                    const reqData= {
                        "attached_vendor_id":dealer[0].attached_vendor_id,
                        "vendor_id":vendor_id,
                        "category_id":dealer[0].category_id
                    }
            
                    GetShippingAddress(token,reqData).then((res5)=>{
                    if(res5['status'] == 1){
                        clearShippingAddress()
                        initShippingAddress(res5['data'])
                        seton(false);
                        navigation.navigate("ShippingDetailsScreen")
                    }
                    })
                }
            })
        }
    }

    const checkStore = async()=>{
        try {
            if(Platform.OS != 'ios'){
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,)
          
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Geolocation.getCurrentPosition(info =>{
                //     Geocoder.init("AIzaSyCuC7sWlvRTLhhhcgzOtM8ZJm8nRa7-3TY");
                //     Geocoder.from(info.coords.latitude, info.coords.longitude)
                //         .then(json => {
                //             console.log(json.results[0].address_components,'address');
                            
                //             let address = `${json.results[0].formatted_address}`
                //             let postal_code = `${json.results[0].address_components.find(i=>i.types[0] == "postal_code").long_name}`;
                //             let region = `${json.results[0].address_components.find(i=>i.types[0] == "administrative_area_level_1" ).long_name}`;
                //             let city = `${json.results[0].address_components.find(i=>i.types[0] == "locality" ).long_name}`;
                //             setDisplayCurrentAddress(address);
                //             setPinCode(postal_code);
                //             setCity(city);
                //             setState(region);
                            
                //             // let address = `${item.name}, ${item.district}`;
                //             // let postal_code = `${item.postalCode}`;
                //             // let region = `${item.region}`;
                //             // let city = `${item.city}`;
                //             // setDisplayCurrentAddress(address);
                //             // setPinCode(postal_code);
                //             // setCity(city);
                //             // setState(region)
                //             // clearCurrentAddress();
                //             // clearGeolocationProps();
                //             // initCurrentAddress(json.results[0].formatted_address);
                //             // initGeolocationProps({"latitude":json.results[0].geometry.location.lat,"longitude":json.results[0].geometry.location.lng}); 
                //         })
                //         .catch(error => console.warn(error));
                //     },
                //     error => console.log('Error', JSON.stringify(error)),
                // );
                console.log("You can use the location")
            }else {
                console.log("location permission denied","homescreen")
            }
        } 
        } catch (error) {
            console.log(error,'CheckStore')
        }    

        
    }

    // useEffect(()=>{
    //     checkStore()
    // },[])

    const getLocation = () =>{
        checkStore()
        // setGpsOn(true)
        // CheckIfLocationEnabled();
        // GetCurrentLocation()
    }
    
    // const GetCurrentLocation = async () => {
    //     let { status } = await Location.requestBackgroundPermissionsAsync();

    //     if (status !== 'granted') {
    //         Alert.alert(
    //         'Permission not granted',
    //         'Allow the app to use location service.',
    //         [{ text: 'OK' }],
    //         { cancelable: false }
    //         );
    //     }
    
    //     let { coords } = await Location.getCurrentPositionAsync();
    
    //     if (coords) {
    //         const { latitude, longitude } = coords;
    //         let response = await Location.reverseGeocodeAsync({
    //         latitude,
    //         longitude
    //         });
        
    //         for (let item of response) {
    //         let address = `${item.name}, ${item.district}`;
    //         // let address = `${item.name}, ${item.district}, ${item.postalCode}, ${item.region}, ${item.city}, ${item.country}(${item.isoCountryCode}).`;
    //         let postal_code = `${item.postalCode}`;
    //         let region = `${item.region}`;
    //         let city = `${item.city}`;
    //         setDisplayCurrentAddress(address);
    //         setPinCode(postal_code);
    //         setCity(city);
    //         setState(region)
    //         // setGpsOn(false)
    //         }
    //     }
    // };
    
    // const CheckIfLocationEnabled = async () => {
    //     let enabled = await Location.hasServicesEnabledAsync();

    //     if (!enabled) {
    //         Alert.alert(
    //         'Location Service not enabled',
    //         'Please enable your location services to continue',
    //         [{ text: 'OK' }],
    //         { cancelable: false }
    //         );
    //     } else {
    //         setLocationServiceEnabled(enabled);
    //     }
    // };

    const Previous = () => {
        navigation.navigate("ShippingDetailsScreen");
    };

    const handleBackButtonClick = () => {
        navigation.navigate("ShippingDetailsScreen");
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

    useEffect(()=>{
        let pincodeData = pincodes.filter(item => item.pincode == pinCode);
        if (pincodeData.length > 0) {
            setState(pincodeData[0].state_name);
        }
    },[pinCode]);

    return(
        <View style={{justifyContent:'center',alignContent:'center',padding:6,paddingTop:30}}>
            <ScrollView>
                <View style={{padding:10,marginBottom:0}}>
                    <Image
                        source={require("../../assets/images/delivery.jpg")}
                        containerStyle={{width: "100%",height:200}}
                    />
                </View>
                <Card containerStyle={{borderRadius:25,borderColor:'#ccc',elevation:5}}> 
                    <View style={{marginVertical:'6%',padding:5,paddingBottom:0}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:0.3}}>
                            <TextInput multiline={true} maxLength={100}  numberOfLines={2} style={{borderBottomWidth:0,padding:0,width:'90%',color:'#000'}} placeholderTextColor={'#000'} placeholder="Address" value={displayCurrentAddress} onChangeText={(text)=>{setDisplayCurrentAddress(text)}}/>
                            <View style={{marginLeft:-25}}>
                                <IconButton
                                    icon="crosshairs-gps"
                                    size={30}
                                    color="green"
                                    onPress={getLocation}
                                    disabled = {gpsOn}
                                />
                            </View>
                        </View>
                        <TextInput style={{borderBottomWidth:0.3,padding:3,marginTop:10,color:'#000'}} placeholderTextColor={'#000'}  placeholder="Pincode" value={pinCode} onChangeText={(text)=>{setPinCode(text)}} />
                        <TextInput style={{borderBottomWidth:0.3,padding:3,marginTop:10,color:'#000'}} placeholderTextColor={'#000'}  placeholder="City" value={city} onChangeText={(text)=>{setCity(text)}} />
                        <TextInput style={{borderBottomWidth:0.3,padding:3,marginTop:10,color:'#000'}} placeholderTextColor={'#000'}  placeholder="State" value={state} onChangeText={(text)=>{setState(text)}} editable={false}/>
                        <View style={{flexDirection:"row",justifyContent:"space-around",paddingleft:5,marginTop:20,boderRadius:10,}}>
                            <Button title='Back' onPress={Previous} buttonStyle={{backgroundColor:'#638ccf',borderRadius:10}}/>
                            <Button title='Save' onPress={addShippingAddress} buttonStyle={{backgroundColor:'#638ccf',borderRadius:10}} disabled={on}/>
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </View>
    )
};

export default ShippingAddressScreen;