import React,{useState} from "react";
import { View, Text, TouchableOpacity,Dimensions,TextInput } from "react-native";
import { Image } from "react-native-elements";
import Modal from 'react-native-modal';
import { PostUpdateSalePrice } from "../services/bundle-services/post-update-salePrice";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const { width,height } = Dimensions.get("screen");

const SoldBundleItemsList = (bundleItem) => {

    const token = useSelector((state) => state.token[0]);
    const navigation = useNavigation();
    const [isVisible, setisVisible] = useState(false);
    const [changeText, setChangeText] = useState(bundleItem?.bundleItem?.sale_price)

    for (var keys in bundleItem) {
        return (
            <View  elevation={5} style={{flexDirection:'column',borderWidth:0,marginLeft:8,marginBottom:10,padding:20,width:'47%',shadowColor:'#d5e4e8',shadowOffset: { width: 0, height: 8 },shadowOpacity: 0.16,shadowRadius: 16}}>
                <TouchableOpacity onPress={()=>{alert(bundleItem[keys].device_name.toUpperCase())}}>                    
                    <View style={{width:"100%",justifyContent:'center'}}>
                        {/* <Image style={{resizeMode:'contain',height:100,width:'100%',marginBottom:20}} 
                            source={{uri:bundleItem[keys].image_path}}
                        /> */}
                          <Image style={{resizeMode:'contain',height:100,width:'100%',marginBottom:20}} 
                             source={require('../assets/images/product_sample.jpg')}
                            />
                    </View>
                    <View style={{paddingBottom:10}}>
                        <Text numberOfLines={1} style={{ fontWeight: '600',paddingBottom:10,fontFamily:'serif', color: "#000" ,textTransform:'capitalize',fontSize:14,justifyContent:'center',textAlign:'left',}}>{bundleItem[keys].device_name.toUpperCase() }</Text>
                        <Text style={{  fontWeight: '600', color: "#9597a1",fontFamily:'serif',paddingBottom:10,fontSize:12,textAlign:'left'}}>{bundleItem[keys].ram == "NA"? " - " :bundleItem[keys].ram}    {bundleItem[keys].rom == "NA"? " - " :bundleItem[keys].rom}   {bundleItem[keys].color == "NA"? " - " :bundleItem[keys].color} </Text>
                        <Text numberOfLines={2} style={{fontFamily:'serif', fontWeight: '600',color:'#9597a1',fontSize:12,textAlign:'left' }}>GRADE({bundleItem[keys].grade})</Text>
                        {/* <Text style={{  fontWeight: '600',fontFamily:'serif', color: "red",fontSize:13,marginTop:6,justifyContent:'center',textAlign:'left' }}>Purchase &#8377;{(bundleItem[keys].purchase_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /-</Text> */}
                        <Text style={{  fontWeight: '600',fontFamily:'serif', color: "red",fontSize:13,marginTop:6,justifyContent:'center',textAlign:'left' }}>Price &#8377;{(bundleItem[keys].sale_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /-</Text>
                    </View>
                    {/* <View>
                        <Text style={{  fontWeight: '600', color: "#a13206",fontFamily:'serif',paddingBottom:0,fontSize:14,textAlign:'left'}}>
                            {(bundleItem[keys].remark == "" || bundleItem[keys].remark == null)? " " :('*'+bundleItem[keys].remark)}
                        </Text>
                    </View> */}
                </TouchableOpacity>
               
            </View>
        );
    }
};

export default SoldBundleItemsList;