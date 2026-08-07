import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, BackHandler, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GetBundleItemList } from '../../services/bundle-services/get-bundle-item-list';
import { PostAddtocart } from '../../services/bundle-services/post-add-to-cart';
import { GetBundleList } from '../../services/bundle-services/get-bundles';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BundleItemsList from '../../components/bundle-items-list';

const BundleListScreen = ({ route }) => {

  const navigation = useNavigation();
  const dealer = useSelector((state) => state.dealer);
  const token = useSelector((state) => state.token[0]);

  const dispatch = useDispatch()
  const { 
    addItem, 
    addPrice, 
    addQnty, 
    clearBundle, 
    initBundle,
    initBundleName,
    clearBundleName 
  } = bindActionCreators(actionCreators, dispatch)

  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false)

  const { bundleItem } = route.params;

  useEffect(() => {
    setSpinner(true);
    clearBundleName();
    initBundleName(bundleItem.bundleItem['bundle_no']);
    const reqData ={
      "bundle_id":bundleItem.bundleItem['bundle_id'],
      "attached_vendor_id":dealer[0].attached_vendor_id,
      "vendor_id":dealer[0].vendor_id
    }
    GetBundleItemList(reqData,token).then((Res) => {
      if (Res.status == 1) {
        setData(Res.data);
        setSpinner(false);
        return false;
      }
    })
  }, [bundleItem.bundleItem['bundle_id']])

  const Item = bundleItem;

  const proceed = () => {
    const cart = {
      "vendor_id": dealer[0].vendor_id,
      "attached_vendor_id":dealer[0].attached_vendor_id,
      "category_id":dealer[0].category_id,
      "bundle_id": Item['bundleItem'].bundle_id,
      "sale_type": "BUNDLE"
    }

    PostAddtocart(cart,token).then((Response) => {
      
      if (Response['status'] == 1) {
        alert(Response['message']);
        const add_to_cart_item = {
          "bundle_id": Item['bundleItem'].bundle_id,
          "bundle_no": Item['bundleItem'].bundle_no,
          "type": Item['bundleItem'].type,
          "category": Item['bundleItem'].category,
          "sub_category": Item['bundleItem'].sub_category,
          "quantity": Item['bundleItem'].quantity,
          "mop": Item['bundleItem'].mop,
          "amount": Item['bundleItem'].amount
        }
        addItem(add_to_cart_item);
        addQnty(1);
        addPrice(Item['bundleItem'].amount * 1);
        clearBundle();
        GetBundleList(dealer[0].vendor_id,token).then((Res) => {
          if (Res['status'] == 1) {
            initBundle(Res.data);
            // navigation.navigate("BundleScreen");
          }
        })
      }else if (Response['status'] == 0) {
          alert(Response['message']);
        }
      })
  }

  const handleBackButtonClick = () => {
    navigation.navigate("BundleScreen");
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

  const back =()=>{
    navigation.navigate("BundleScreen");
    // navigation.goBack()
    return true;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <View style={{flexDirection:'row',justifyContent:'flex-start',borderBottomWidth:0,paddingBottom:10,marginTop:36,padding:20,backgroundColor:'#1194f6'}}>
        <TouchableOpacity style={{marginLeft:5}} onPress={back}>
            <MaterialCommunityIcons name="arrow-left" color={'#ffff'} size={25} />
        </TouchableOpacity>
        <Text style={{ textAlign: 'left',marginLeft:"33%" ,fontSize: 20,color:'#ffff' }}>{bundleItem.bundleItem['bundle_no']}</Text>
      </View> */}
      {spinner 
        ? (
          <View style={{minHeight:'90%',display:'flex',justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator size='large' color="#999999" animating={true} />
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
      <View elevation={6} style={styles.container}>
        <View style={{ width: '100%' }}>
          <TouchableOpacity style={{ justifyContent: 'space-around', flexDirection: "row", backgroundColor: "#F59E56" }} onPress={proceed}>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: "700" }}>Add To Cart  ({bundleItem.bundleItem['amount']}/-)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginHorizontal: 25, 
    backgroundColor: '#F59E56', 
    borderColor: '#F59E56', 
    borderRadius: 5, 
    marginBottom: 20, 
    textAlign: 'center', 
    borderWidth: 0,
    padding:2,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
    height: 1,
    width: 1
    }, 
    height: 40
  }
});
export default BundleListScreen;