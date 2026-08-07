import React, { useState, useEffect } from 'react';
import { View, FlatList, BackHandler, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GetBundleItemList } from '../../services/bundle-services/get-bundle-item-list';
import { useSelector } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BundleItemsList from '../../components/bundle-items-list';

const BundleCartListScreen = ({ route }) => {
  const navigation = useNavigation();
  const token = useSelector((state)=>state.token[0]);
  const dealer = useSelector((state) => state.dealer);

  const [data,setData] = useState([]);
  const [spinner, setSpinner] = useState(false)

  const { bundleItem } = route.params;
    
  useEffect(()=>{
      setSpinner(true);
      const reqData ={
        "bundle_id":bundleItem.bundleItem['bundle_id'],
        "attached_vendor_id":dealer[0].attached_vendor_id,
        "vendor_id":dealer[0].vendor_id
      }
      GetBundleItemList(reqData,token).then((Res)=>{
        if(Res.status == 1){
          setData(Res.data);
          setSpinner(false);
          return false;
        }
      })
  },[bundleItem.bundleItem['bundle_id']]) 

  const handleBackButtonClick = () => {
    navigation.navigate("CartScreen");
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

  // const back =()=>{
  //   navigation.navigate("CartScreen");
  //   return true;
  // }

  return (
    <View style={{ flex: 1 }}>
      {/* <View style={{flexDirection:'row',justifyContent:'flex-start',borderBottomWidth:0,paddingBottom:10,marginTop:36,padding:20,backgroundColor:'#1194f6'}}>
        <TouchableOpacity style={{marginLeft:5}} onPress={back}>
            <MaterialCommunityIcons name="arrow-left" color={'#ffff'} size={25} />
        </TouchableOpacity>
        <Text style={{ textAlign: 'left',marginLeft:"33%" ,fontSize: 20,color:'#ffff' }}>{bundleItem.bundleItem['bundle_no']}</Text>
      </View> */}
      {
        spinner ? (
          <View style={{minHeight:'90%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large' color="#999999" />
          </View>
        ):(
          <FlatList
            numColumns={2}
            data={data.sort((a,b)=>a.grade.localeCompare(b.grade))}
            renderItem={({ item }) => <BundleItemsList bundleItem={item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
          />
        )
      }
    </View>
  )
}

export default BundleCartListScreen;