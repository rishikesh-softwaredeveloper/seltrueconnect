import React, { useEffect, useState } from "react";
// import * as Location from 'expo-location';
import { View, Text, StyleSheet, Alert, BackHandler, TouchableOpacity,PermissionsAndroid} from "react-native";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Image} from "react-native-elements";
import { launchImageLibrary } from 'react-native-image-picker';
import * as FieldValidator from '../../helpers/fieldValidator';
import Input from '../../containers/text-input';
import { PostUploadQrCodeImage } from "../../services/bundle-services/post-upload-payment-qr";
import { PostAddQRCode } from "../../services/bundle-services/post-add-qr-code";
import { GetQrImageList } from "../../services/bundle-services/get-qr-image-list";



const AddQRScreen = () => {
    const [image, setImage] = useState(null);
    const [upiid, setupiid] = useState({ value: "", error: '' });
    const navigation = useNavigation();
    const dealer = useSelector((state)=>state.dealer);
    const token = useSelector((state) => state.token[0]);
    const vendor_id = dealer[0].vendor_id;

    const handlePickImage = async () => {
        try {
        const pickedImage = await pickImage();
        setImage(pickedImage);
        } catch (error) {
        console.error(error);
        }
    };

    const handleUploadImage = async () => {
        if (image) {
        await uploadImage(image.uri,token,vendor_id);
        setImage(null)
        } else {
        console.error('No image selected');
        }
    };

    const dispatch = useDispatch();
    const { 
        initQrImage,
        clearQrImage,
    } = bindActionCreators(actionCreators,dispatch);

    
    const pickImage = async () => {

 
        let options = {
          mediaType: 'photo',
          maxWidth: 400,
          maxHeight: 400,
          quality: 1
        };
      
        return new Promise((resolve, reject) => {
          launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              reject('User cancelled image picker');
            } else if (response.error) {
              reject('ImagePicker Error: ' + response.error);
            } else if (response.customButton) {
              reject('User tapped custom button: ' + response.customButton);
            } else {
              const source = { uri: response.assets[0].uri };
              resolve(source);
            }
          });
        });
      };
      
      const uploadImage = async (imageUri) => {
        const formData = new FormData();
       
        var photo = {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        };
        formData.append('qr_image',photo)
        PostUploadQrCodeImage(formData,token).then((res)=>{
          if(res.status == 1){
            let upi_error ='';

            if(upiid.value !=='' || upiid.value == undefined){
              upi_error = FieldValidator.upiValidation(upiid.value, 'UPI');
            }
            if (upi_error.length > 0){
              setupiid({ ...upiid, 'error': upi_error });
            }else{
              setupiid({ ...upiid, 'error': '' });
            }
            req = {
              "vendor_id" : vendor_id,
              "upi_id" : upiid.value,
              "qr_image" : res.image_name
            }
            PostAddQRCode(req,token).then((response)=>{
              if(response.status == 1){
                Alert.alert("Success",response.message)
                GetQrImageList(token,vendor_id).then((resQR)=>{
                    if(resQR['status'] == 1){
                        clearQrImage()
                        initQrImage(resQR['data'])
                        navigation.navigate("PaymentQRScreen")
                    }
                  })
    
              }else{
                Alert.alert("Error",response.message)
              }
            })
            
          }else{
            Alert.alert(res.message)
          }
        })
      };

    


    const Previous = () => {
        navigation.goBack()
    };

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

 

    return(
        <View style={{flex:1}}>
        
        <View style={{flexDirection:'row',justifyContent:'flex-start',borderBottomWidth:0,paddingBottom:10,marginTop:36,padding:20,backgroundColor:'#1194f6'}}>
            <TouchableOpacity style={{marginLeft:5}} onPress={Previous}>
                <MaterialCommunityIcons name="arrow-left" color={'#ffff'} size={25} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'left',marginLeft:"33%" ,fontSize: 20,color:'#ffff' }}>QR Images</Text>
        </View>
        <View style={{justifyContent:'center',alignContent:'center',padding:6,paddingTop:40}}>

            <View style={{flexDirection:"row",justifyContent:"space-around",paddingleft:5,marginTop:20,boderRadius:10,}}>
                <Button title='Pick an Image' onPress={handlePickImage} buttonStyle={{backgroundColor:'#638ccf',borderRadius:10}}/>
                <Button title='Upload Image' onPress={handleUploadImage} buttonStyle={{backgroundColor:'#638ccf',borderRadius:10}}/>
            </View>
            
            {image && (
                <View style={{justifyContent:'center',alignItems:'center',marginTop:40}}>
                    <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />
                    <Input
                      label='UPI ID'
                      placeholder='UPIID (Optional)'
                      style={styles.input}
                      onChangeText={(text) => setupiid({ 'value': text, error: '' })}
                      value={upiid.value}
                      error={!!upiid.error}
                      errorText={upiid.error}
                    />
                </View>
            )}
            {!image && <Text style={{color:'#000'}}>No image selected</Text>}

            {/* <View style={{flexDirection:"row",justifyContent:"space-around",paddingleft:5,marginTop:20,boderRadius:10,}}>
                <Button title='Upload Image' onPress={handleUploadImage} buttonStyle={{backgroundColor:'#638ccf',borderRadius:10}}/>
            </View> */}
        </View>
            
        </View>
    )
};

export default AddQRScreen;

const styles = StyleSheet.create({
  input: {
      marginHorizontal: 10,
      marginVertical: 7,
      height: 50,
      width: "90%",
      margin: 1,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      fontFamily:'serif'
  }
})