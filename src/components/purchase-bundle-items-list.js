import React,{useState} from "react";
import { View, Text, TouchableOpacity,Dimensions,TextInput, Alert } from "react-native";
import { Image } from "react-native-elements";
import Modal from 'react-native-modal';
import { PostUpdateSalePrice } from "../services/bundle-services/post-update-salePrice";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const { width,height } = Dimensions.get("screen");

const PurchaseBundleItemsList = (bundleItem) => {
    const token = useSelector((state) => state.token[0]);
    const dealer = useSelector((state) => state.dealer);

    const navigation = useNavigation();
    const [isVisible, setisVisible] = useState(false);
    const [changeText, setChangeText] = useState(bundleItem?.bundleItem?.sale_price)

    for (var keys in bundleItem) {
        return (
            <View  elevation={5} style={{flexDirection:'column',borderWidth:0,marginLeft:8,marginBottom:10,padding:20,width:'47%',shadowColor:'#d5e4e8',shadowOffset: { width: 0, height: 8 },shadowOpacity: 0.16,shadowRadius: 16}}>
                <TouchableOpacity onPress={()=>{
                    Alert.alert(bundleItem[keys].device_name.toUpperCase(),bundleItem[keys].ram == "NA"? " - " :bundleItem[keys].ram+''+bundleItem[keys].rom == "NA"? " - " :bundleItem[keys].rom+''+bundleItem[keys].color == "NA"? " - " :bundleItem[keys].color)
                    // setisVisible(true)
                }}>                    
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
                        <Text style={{  fontWeight: '600',fontFamily:'serif', color: "red",fontSize:13,marginTop:6,justifyContent:'center',textAlign:'left' }}>Price: &#8377;{(bundleItem[keys].purchase_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /-</Text>
                        {/* <Text style={{  fontWeight: '600',fontFamily:'serif', color: "red",fontSize:13,marginTop:6,justifyContent:'center',textAlign:'left' }}>Sale &#8377;{(bundleItem[keys].sale_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /-</Text> */}
                    </View>
                    {/* <View>
                        <Text style={{  fontWeight: '600', color: "#a13206",fontFamily:'serif',paddingBottom:0,fontSize:14,textAlign:'left'}}>
                            {(bundleItem[keys].remark == "" || bundleItem[keys].remark == null)? " " :('*'+bundleItem[keys].remark)}
                        </Text>
                    </View> */}
                </TouchableOpacity>
                <Modal
                  isVisible={isVisible}
                  animationIn='fadeIn'
                  animationOut='fadeOut'
                  style={{ justifyContent: 'center', alignItems: 'center',padding:0,margin:0 }}
                >
                    <View style={{ backgroundColor:'#ffffff', width:width-60,borderRadius:5}}>
                        <View style={{backgroundColor:'#dddddd',padding:10,margin:0,borderTopLeftRadius:5,borderTopRightRadius:5}}>
                            <Text style={{ color:'#333333',fontWeight:'700'}}>UPDATE SALE PRICE</Text>
                        </View>
                        <View style={{padding:10,margin:0,borderTopLeftRadius:5,borderTopRightRadius:5}}>
                            <Text style={{color:'#000',fontWeight:'bold'}}>{bundleItem?.bundleItem?.device_name.toUpperCase()}</Text>
                        </View>
                        <View style={{padding:40}}>
                            
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
                                <Text style={{color:'#000',fontWeight:'bold'}}>Purchase Amount</Text>
                                <Text style={{color:'#000',fontWeight:'bold'}}>&#8377;{(bundleItem[keys].purchase_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /-</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <Text style={{color:'#000',fontWeight:'bold'}}>Sale Amount</Text>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#000',fontWeight:'bold',marginRight:8}}>&#8377;</Text>
                                    <TextInput 
                                        style={{ color:'#000',borderWidth:1,padding:3 }}
                                        placeholder="Sale Price"
                                        value={changeText}
                                        editable={bundleItem[keys].bundleStatus != 'SOLD' && true}
                                        onChangeText={setChangeText}
                                        placeholderTextColor='#9a9a9a'
                                    />
                                </View>
                            </View>
                        </View>
                        {
                            //stss and dist
                            dealer[0].category_id == 2 ||  dealer[0].category_id == 3  ?

                            bundleItem[keys].bundleStatus != 'SOLD' &&
                            <View style={{padding:2, flexDirection:'row', justifyContent:'flex-end',marginRight:40,marginBottom:20}}>
                            <View style={{marginLeft:0,backgroundColor:'#2596BE',borderColor:'#2596BE',marginTop:5, marginBottom:5, padding:7,borderRadius:5,width:80, alignItems:'center'}}>
                                <TouchableOpacity onPress={() => {
                                    if(changeText != ''){
                                        const reqDate={
                                            "bundle_id" : bundleItem?.bundleItem?.bundle_id,
                                            "bundle_item_id" : bundleItem?.bundleItem?.bundle_item_id,
                                            "sale_price" : changeText
                                        }
                                        PostUpdateSalePrice(reqDate,token).then(Res=>{
                                            if(Res?.results?.status == 1){
                                                setisVisible(false)
                                                navigation.navigate('PurchaseOrderListScreen', {"orderItems":bundleItem?.bundleItem?.order_item_id}) 
                                            }
                                            
                                        })
                                    }
                                }}>
                                    <Text style={{color:'#ffffff'}}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :<></>
                        }
                        
                        <View style={{backgroundColor:'#dddddd',padding:2, flexDirection:'row', justifyContent:'center'}}>
                            <View style={{marginLeft:0,backgroundColor:'#5cb85c',borderColor:'#4cae4c',marginTop:5, marginBottom:5, padding:7,borderRadius:5,width:80, alignItems:'center'}}>
                                <TouchableOpacity onPress={() => setisVisible(false) }>
                                    <Text style={{color:'#ffffff'}}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
};

export default PurchaseBundleItemsList;