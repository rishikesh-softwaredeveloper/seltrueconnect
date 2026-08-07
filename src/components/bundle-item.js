import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet,TouchableOpacity, Alert } from "react-native";
import { IconButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { PostAddtocart } from '../services/bundle-services/post-add-to-cart';
import { GetBundleList } from '../services/bundle-services/get-bundles';
import { Image } from "react-native-elements";

const BundleItem = (bundleItem) => {
    const navigation = useNavigation();
    
    const dealer = useSelector((state) => state.dealer);
    const token = useSelector((state) => state.token[0]);

    const [flag,setflag] = useState(false);
        
    const dispatch = useDispatch()
    const { 
        addItem, 
        addPrice, 
        addQnty,
        clearBundle,
        initBundle
    } = bindActionCreators(actionCreators, dispatch)


    const addToCart = (Item) => {
        
        setflag(true);
        const cart = {
            "vendor_id": dealer[0].vendor_id,
            "attached_vendor_id":dealer[0].attached_vendor_id,
            "category_id":dealer[0].category_id,
            "bundle_id": Item['bundleItem'].bundle_id,
            "sale_type": "BUNDLE"
        }

        PostAddtocart(cart,token).then((Response) => {

            if (Response['status'] == 1) {
                const add_to_cart_item = {
                    "bundle_id": Item['bundleItem'].bundle_id,
                    "bundle_no": Item['bundleItem'].bundle_no,
                    "type": Item['bundleItem'].type,
                    "category": Item['bundleItem'].category,
                    "sub_category": Item['bundleItem'].sub_category,
                    "quantity": Item['bundleItem'].quantity,
                    "mop": Item['bundleItem'].mop,
                    "grade_qnty":Item['bundleItem'].grade_qnty,
                    "amount": Item['bundleItem'].amount
                }
                addItem(add_to_cart_item);
                addQnty(1);
                addPrice(Item['bundleItem'].amount);  
            }else if(Response['status'] == 0) {
                alert(Response['message']);
                clearBundle();
                GetBundleList(dealer[0].vendor_id,token).then((Res) => {
                    if (Res['status'] == 1) {
                        initBundle(Res.data);
                    }
                });
            }
        });

    }

    const bundleDetails = (item) => {
        navigation.navigate('BundleListScreen', { "bundleItem": item })
    }

    for (var keys in bundleItem) {
        return (
            <View style={styles.container}>
                <View style={styles.sub_container}>
                    <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 10,paddingBottom:5, borderRadius: 0, width: '40%' }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ paddingBottom: 5 }}>
                                    <Text numberOfLines={2} style={{ color: "#000",fontFamily:'serif', fontWeight: '500',fontSize:17,marginLeft:5}}>{bundleItem[keys].bundle_no.toUpperCase()}</Text>
                                    <Image  source={require('../../assets/seltrue-1.png')} style={{width:80,height:30,marginBottom:10,marginTop:10}}/>
                                <View style={{ paddingBottom: 0, flexDirection: 'row', justifyContent:'space-between'}}>
                                    <Text style={{ fontWeight: '500',fontFamily:'serif', color: "#DD2A05",fontSize:20 }}>&#8377;{bundleItem[keys].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</Text>
                                    <Text style={{ fontWeight: '500',fontFamily:'serif',color: "#8F8C8B" ,textDecorationLine: 'line-through',fontSize:15,marginLeft:10,marginTop:4}}>&#8377; {bundleItem[keys].mop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 10, borderRadius: 0, width: '20%',marginTop:2 }}>
                        <View style={{ paddingBottom: 5 }}>
                            <View style={{ paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: '500',fontFamily:'serif', color: "#000",fontSize:14,marginLeft:5 }}>{bundleItem[keys].category}</Text>
                            </View>
                            <View style={{ paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: '500',fontFamily:'serif', color: "#000",fontSize:10,marginLeft:5 }}>{bundleItem[keys].grade_qnty}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 10,paddingBottom:5, borderRadius: 0, width: '40%' }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:-1}}>
                            <View style={{ alignItems: 'center', marginLeft: 10}}>
                                <View style={{ borderColor: "#ffe6e6", backgroundColor: "#ffe6e6", borderRadius: 25, borderWidth: 1, height: 25, width: 35, justifyContent: 'center' }}>
                                    <Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 9, fontWeight: '800',fontFamily:'serif',color:'#000' }}>{bundleItem[keys].quantity+"N"}</Text>
                                </View>
                            </View>                            
                            <View style={{ alignItems: 'center'}}>
                                <TouchableOpacity onPress={()=>{
                                Alert.alert(
                                        bundleItem[keys].bundle_no,
                                        bundleItem[keys].grade_summary
                                    )
                                }}>
                                    <View style={{ borderColor: "#ccddff", backgroundColor: "#ccddff", borderRadius: 25, borderWidth: 1, height: 25, width: 35, justifyContent: 'center' }}>
                                        <Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 9, fontWeight: '800',fontFamily:'serif',color:'#000' }}>{bundleItem[keys].type}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:17}}>
                            <View style={{ alignItems: 'center' }}>
                                <IconButton
                                    icon="cart-arrow-down"
                                    size={30}
                                    color="green"
                                    onPress={() => addToCart(bundleItem)}
                                    disabled = {bundleItem[keys].flag == 1?true:flag}
                                />
                            </View>
                            <View style={{ alignItems: 'center',marginLeft:10}}>
                                <IconButton
                                    icon="chevron-right"
                                    size={30}
                                    color="gray"
                                    onPress={() => bundleDetails(bundleItem)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        borderWidth: 0,
        marginVertical: 1, 
        marginHorizontal: 0, 
        borderRadius: 0,
        margin: 0,
        padding: 10,
        borderColor: "#CCC",
        borderBottomWidth:1
    },
    sub_container: {
        flexDirection: 'row',
        padding: 0,
        marginVertical: 0,
    }

});
export default BundleItem;