import React, { useEffect } from "react";
import { View, Text, FlatList, BackHandler, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import QrImageItem from "../../components/qr-images-items";
import { GetQrImageList } from "../../services/bundle-services/get-qr-image-list";

const PaymentQRScreen = () => {
    const qrImages = useSelector((state) => state.qrImages[0]);
    const navigation = useNavigation();

    const dealer = useSelector((state)=>state.dealer);
    const token = useSelector((state) => state.token[0]);

    const dispatch = useDispatch()
    const { 
      clearQrImage,
      initQrImage,
    } = bindActionCreators(actionCreators, dispatch)
    
    const previous = () => {
      navigation.goBack();
      return true;
    }

    const handleBackButtonClick = () => {
      navigation.goBack();
      return true;
    }

    useEffect(()=>{
      GetQrImageList(token,dealer[0].vendor_id).then((resQR)=>{
        if(resQR['status'] == 1){
          clearQrImage()
          initQrImage(resQR['data'])
        }
      })
    },[])
    
    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
      };
    }, []);

    const add = () => {
      navigation.navigate("AddQRScreen");
    };

    return( 
      <View style={{flex:1}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:0,paddingBottom:10,marginTop:36,padding:20,backgroundColor:'#1194f6'}}>
          <TouchableOpacity style={{marginLeft:1}} onPress={previous}>
            <MaterialCommunityIcons name="arrow-left" color={'#ffff'} size={25} />
          </TouchableOpacity>
          <Text style={{ textAlign: 'left',fontSize: 18,color:'#ffff',fontFamily:'serif',justifyContent:'center' }}>QR Images</Text>
          <TouchableOpacity style={{marginLeft:20}} onPress={add} >
            <MaterialCommunityIcons name="plus-circle-outline" color={"#ffff"} size={30} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={qrImages}
          renderItem={({ item }) => (<QrImageItem qrImageItem={item} />)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    )
};

export default PaymentQRScreen;