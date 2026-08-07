import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { PostAddtocart } from '../services/bundle-services/post-add-to-cart';
import { GetDeviceListStockType } from "../services/bundle-services/get-openbox-item-list";
import { Button, Image } from "react-native-elements";

const SeltrueBoxItem = (seltrueBoxItem) => {

    const [flag,setflag] = useState(false);
    const dealer = useSelector((state) => state.dealer);
    const token = useSelector((state) => state.token[0]);

    const dispatch = useDispatch();
    const { 
        addItem,
        addPrice, 
        addQnty,
        clearSeltrueBox,
        initSeltrueBox,
        initMasterSeltrueBox,
        clearMasterSeltrueBox
    } = bindActionCreators(actionCreators, dispatch);


    const addToCart = (Item) => {
        
        setflag(true);
        const cart = {
            "vendor_id": dealer[0].vendor_id,
            "attached_vendor_id":dealer[0].attached_vendor_id,
            "category_id":dealer[0].category_id,
            "bundle_id": Item['seltrueBoxItem'].grnreport_id,
            "sale_type": "PREXO"
        }

        PostAddtocart(cart,token).then((Response) => {
            if (Response['status'] == 1) {
                const add_to_cart_item = {
                    "grnreport_id": Item['seltrueBoxItem'].grnreport_id,
                    "device_id": Item['seltrueBoxItem'].device_id,
                    "certification_grade": Item['seltrueBoxItem'].certification_grade,
                    "device_name": Item['seltrueBoxItem'].device_name,
                    "device_sub_category": Item['seltrueBoxItem'].device_sub_category,
                    "color": Item['seltrueBoxItem'].color,
                    "SKU": Item['seltrueBoxItem'].sku,
                    "mrp":Item['seltrueBoxItem'].mrp,
                    "amount":Item['seltrueBoxItem'].mrp,
                    "product_brand": Item['seltrueBoxItem'].product_brand,
                    "ram": Item['seltrueBoxItem'].ram,
                    "rom": Item['seltrueBoxItem'].rom,
                    "image_path":Item['seltrueBoxItem'].image_path,
                    "stock_type": 'PREXO'
                }
                addItem(add_to_cart_item);
                addQnty(1);
                addPrice(Item['seltrueBoxItem'].mrp * 1);
            }else if(Response['status'] == 0) {
                alert(Response['message']);
                clearSeltrueBox();
                clearMasterSeltrueBox();
                GetDeviceListStockType({"stock_type": "PREXO","vendor_id":dealer[0].vendor_id},token).then((Res) => {
                    if (Res["status"] == 1) {
                      initSeltrueBox((Res.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)));
                      initMasterSeltrueBox((Res.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)));
                    }
                })
            }
        })
    }

    for (var keys in seltrueBoxItem) {
        return (
            <View  style={{borderWidth: 0,marginVertical: 3, marginHorizontal: 0, borderRadius: 0,margin: 0,padding:10,borderColor: "#CCC",borderBottomWidth:1,borderBottomColor:'#bdbbb7'}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{width:"40%",paddingTop:0,marginRight:0,marginLeft:0}}>
                        <Image style={{resizeMode:'contain',height:100,width:'100%',marginBottom:10}} 
                        //  source={{uri:"https://erp.sloyd.in/assets/images/openbox/APP0010.jpg"}}
                        //  source={{uri:seltrueBoxItem[keys].image_path}}
                         source={require('../assets/images/Seltrue_box.png')}
                         />
                    </View>
                    
                    <View style={styles.sub_container}>
                        <View style={{flexDirection:'column',width:"60%"}}>
                            <View style={{textAlign:'center',marginBottom:5}}>
                                <Text numberOfLines={2}  style={{color: "#000",fontWeight: '500', fontFamily: 'serif',fontSize:14,justifyContent:'center',alignItems:'center'}}>{seltrueBoxItem[keys].device_name}</Text>
                            </View>
                            <Text style={{fontFamily:'serif', fontSize:12,color: '#575957',marginBottom:5}}>{seltrueBoxItem[keys].ram} - {seltrueBoxItem[keys].rom}</Text>
                            <Text style={{fontFamily:'serif', fontSize:12,color: '#575957',marginBottom:38}}>Grade ( {seltrueBoxItem[keys].certification_grade} )</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'row',width:"40%",marginLeft:15}}>
                        <Text style={{ fontWeight: '700',fontFamily:'serif', color: "#DD2A05",fontSize:20 }}>&#8377;{(seltrueBoxItem[keys].mrp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-   </Text>
                        <Text style={{ fontWeight: '500',fontFamily:'serif',fontSize:15,color: "#8F8C8B" ,textDecorationLine: 'line-through',marginTop:4}}>&#8377;{(seltrueBoxItem[keys].mrp+500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</Text>
                    </View>
                    <View style={{marginLeft:25,width:"60%",marginTop:-15}} >
                        <Button  
                            title="Add to cart"
                            icon={{
                                name: 'cart-arrow-down',
                                type: 'font-awesome',
                                size: 15,
                                color: 'white',
                                }}
                            iconLeft
                            iconContainerStyle={{ marginRight: 10 }}
                            loading={false}
                            loadingProps={{ size: 'small', color: 'white' }}
                            disabled={seltrueBoxItem[keys].flag == 1?true:flag}
                            buttonStyle={{
                                backgroundColor: 'rgba(111, 202, 186, 1)',
                                borderRadius: 5,
                                width:'60%'
                            }}
                            titleStyle={{ fontWeight: '500', fontSize: 15 }}
                            onPress={() => addToCart(seltrueBoxItem)}
                        />
                    </View>
                </View>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        marginVertical: 3, 
        marginHorizontal: 2, 
        borderRadius: 5,
        margin: 0,
        padding: 0,
        borderColor: "#CCC"
    },
    sub_container: {
        flexDirection: 'row',
        padding: 0,
        marginVertical: 0,
        justifyContent: 'space-evenly'
    }

});
export default SeltrueBoxItem;