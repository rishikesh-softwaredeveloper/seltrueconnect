import React,{ useEffect } from "react";
import { View, Text,StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { IconButton } from "react-native-paper";
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { PostDeleteCartItem } from "../services/bundle-services/post-delete-from-cart";
import { PostDiscount } from "../services/bundle-services/post-discount";
import { GetBundleList } from '../services/bundle-services/get-bundles';
import { GetDeviceListStockType } from "../services/bundle-services/get-openbox-item-list";
import { Image } from "react-native-elements";

const CartList = (item) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { 
        removeItem,
        removeOpenBoxItem,
        removeNewDevicesItem,
        removeQnty,
        removePrice,
        clearDiscount,
        initDiscount,
        clearBundle,
        clearOpenBox,
        clearNewDevices,
        clearSeltrueBox,
        initBundle,
        initOpenBox,
        initNewDevices,
        initSeltrueBox,
        clearSearchCategory,
        clearSearchType,
    } = bindActionCreators(actionCreators, dispatch);

    const dealer = useSelector((state)=>state.dealer);
    const token = useSelector((state)=>state.token[0]);
    const cartlist = useSelector((state) => state.cartlist);
    
    // useEffect(()=>{
    //     const order_data =[];
        
    //     var device_qnty = 0;
    //     var device_amount = 0;
    //     var stock_type = '';

    //     for(let i=0;i<cartlist.length;i++){
    //         if(cartlist[i]['bundle_no']){
    //             const bundle_discount ={
    //                 "quantity":cartlist[i]['quantity'],
    //                 "amount": cartlist[i]['amount'],
    //                 "saleType": 'bundle',
    //                 "bundleType":'ALL',
    //             }
    //             order_data.push(bundle_discount)
    //         }else if(cartlist[i]['device_name']){
    //             device_qnty= device_qnty+1;
    //             device_amount = device_amount+cartlist[i]['amount'];
    //             stock_type = cartlist[i]['stock_type'];
                
    //             if(stock_type == 'OPEN BOX'){
    //                 stock_type = 'openbox';
    //             }
    //         }
    //     }
    //     const device_discount ={
    //         "quantity":device_qnty,
    //         "amount":device_amount,
    //         "saleType":stock_type.toLowerCase(),
    //         'bundleType':''
    //     }
    //     order_data.push(device_discount);

    //     PostDiscount({"orderData":order_data},token).then((res)=>{
    //         if(res['status'] == 1){
    //             clearDiscount();
    //             initDiscount(res['data']['totalDcAmount']);
    //         }
    //     })
    //     // Call Discount API
    // },[cartlist.length])

    
    const removeFromCart = (Item) => {
        if(Item.bundle_no){
            
            const deletfromcart={
                "vendor_id":dealer[0].vendor_id,
                "bundle_id":Item.bundle_id      
            }
            PostDeleteCartItem(deletfromcart,token).then((Response)=>{
                if(Response.status == 1){
                    clearBundle();
                    GetBundleList(dealer[0].vendor_id,token).then((Res) => {
                        if (Res['status'] == 1) {
                            initBundle((Res.data).sort((a,b)=>a.bundle_no.localeCompare(b.bundle_no)));
                            clearSearchType();
                            clearSearchCategory();
                        }
                    })
                    removeItem(Item);
                }
            })
            removeQnty(1);
            removePrice(Item.amount);
        }else if(Item.grnreport_id){
        
            const deletfromcart2={
                "vendor_id":dealer[0].vendor_id,
                "bundle_id":Item.grnreport_id      
            }

            PostDeleteCartItem(deletfromcart2,token).then((Response)=>{
                
                if(Response.status == 1){
                    clearOpenBox();
                    clearNewDevices();
                    clearSeltrueBox();
                    GetDeviceListStockType({"stock_type": "OPEN BOX","vendor_id":dealer[0].vendor_id },token).then((Res) => {
                        if (Res['status'] == 1) {
                            initOpenBox(Res.data);
                        }
                    });
                    GetDeviceListStockType({"stock_type": "NEW","vendor_id":dealer[0].vendor_id },token).then((Res) => {
                        if (Res['status'] == 1) {
                            initNewDevices(Res.data);
                        }
                    });
                    GetDeviceListStockType({"stock_type": "PREXO","vendor_id":dealer[0].vendor_id },token).then((Res) => {
                        if (Res['status'] == 1) {
                            initSeltrueBox(Res.data);
                        }
                    })
                    removeOpenBoxItem(Item);
                }
            })
            removeQnty(1);
            removePrice(Item.mrp);
        }
        
    }
    
    const bundleDetails =(Item)=>{
        navigation.navigate('BundleCartListScreen', {"bundleItem":Item});   
    }
    
    for (var keys in item) {
        return (
            item[keys].bundle_no?(
            <View style={styles.container}>
                <View style={styles.sub_container}>
                    <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 10,paddingBottom:5, borderRadius: 0, width: '40%' }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ paddingBottom: 5 }}>
                                <Text numberOfLines={2} style={{ color: "#000",fontFamily:'serif', fontWeight: '500',fontSize:17,marginLeft:5}}>{item[keys].bundle_no.toUpperCase()}</Text>
                                <Image  source={require('../../assets/seltrue-1.png')} style={{width:80,height:30,marginBottom:10,marginTop:10}}/>
                                <View style={{ paddingBottom: 0, flexDirection: 'row', justifyContent:'space-between'}}>
                                    <Text style={{ fontWeight: '500',fontFamily:'serif', color: "#DD2A05",fontSize:20 }}>&#8377;{item[keys].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</Text>
                                    <Text style={{ fontWeight: '500',fontFamily:'serif',color: "#8F8C8B" ,textDecorationLine: 'line-through',fontSize:15,marginLeft:10,marginTop:4}}>&#8377; {item[keys].mop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 10, borderRadius: 0, width: '20%',marginTop:2 }}>
                        <View style={{ paddingBottom: 5 }}>
                            <View style={{ paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: '500',fontFamily:'serif', color: "#000",fontSize:14,marginLeft:5 }}>{item[keys].category}</Text>
                            </View>
                            <View style={{ paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: '500',fontFamily:'serif', color: "#000",fontSize:10,marginLeft:5 }}>{item[keys].grade_qnty}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 10,paddingBottom:5, borderRadius: 0, width: '40%' }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:-1}}>
                            <View style={{ alignItems: 'center', marginLeft: 10}}>
                                <View style={{ borderColor: "#ffe6e6", backgroundColor: "#ffe6e6", borderRadius: 25, borderWidth: 1, height: 25, width: 35, justifyContent: 'center' }}>
                                    <Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 9, fontWeight: '800',fontFamily:'serif',color:'#000' }}>{item[keys].quantity+"N"}</Text>
                                </View>
                            </View>                            
                            <View style={{ alignItems: 'center',marginRight:10}}>
                                <View style={{ borderColor: "#ccddff", backgroundColor: "#ccddff", borderRadius: 25, borderWidth: 1, height: 25, width: 35, justifyContent: 'center' }}>
                                    <Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 9, fontWeight: '800',fontFamily:'serif',color:'#000' }}>{item[keys].type}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:17}}>
                            <View style={{ alignItems: 'center' }}>
                                <IconButton
                                    icon="delete-forever"
                                    size={30}
                                    color="red"
                                    onPress={() => removeFromCart(item['cartItem'])}
                                />
                            </View>
                            <View style={{ alignItems: 'center',marginLeft:0}}>
                                <IconButton
                                    icon="chevron-right"
                                    size={30}
                                    color="gray"
                                    onPress={()=>bundleDetails({"bundleItem":item['cartItem']})}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            ):(
                <View style={styles.container}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:"30%",paddingTop:0,marginRight:0,marginLeft:0}}>
                            {/* <Image style={{resizeMode:'stretch',height:100,width:100,marginBottom:10}}  */}
                            <Image style={{resizeMode:'contain',height:100,width:'100%',marginBottom:10}} 
                            //  source={{uri:"https://erp.sloyd.in/assets/img/logo_invoice.png"}}
                            // source={require('../assets/images/oppo.jpg')}
                             source={item[keys].stock_type=='OPEN BOX'? require('../assets/images/Open_box.png'):require('../assets/images/Seltrue_box.png')}
                            />
                        </View>
                        
                        <View style={styles.sub_container}>
                            <View style={{flexDirection:'column',width:"50%"}}>
                                <View style={{textAlign:'center',marginBottom:5}}>
                                    <Text numberOfLines={2}  style={{color: "#000",fontWeight: '500', fontFamily: 'serif',fontSize:14,justifyContent:'center',alignItems:'center'}}>{item[keys].device_name}</Text>
                                </View>
                                <Text style={{fontFamily:'serif', fontSize:12,color: '#575957',marginBottom:5}}>{item[keys].ram} - {item[keys].rom}</Text>
                                <Text style={{fontFamily:'serif', fontSize:12,color: '#575957',marginBottom:5}}>Grade ( {item[keys].certification_grade} )</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{ fontWeight: '700',fontFamily:'serif', color: "#DD2A05",fontSize:20, }}>&#8377;{(item[keys].mrp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-   </Text>
                                    <Text style={{ fontWeight: '500',fontFamily:'serif',fontSize:15,color: "#8F8C8B" ,textDecorationLine: 'line-through',marginTop:4}}>&#8377;{(item[keys].mrp+500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</Text>
                                </View>
                            </View>
                            <View style={{ width: "20%",flexDirection:'column',justifyContent:'space-between'}}>
                                <View style={{ alignItems: 'center', marginLeft: 20}}>
                                    <View style={{ borderColor: "#ffe6e6", backgroundColor: "#ffe6e6", borderRadius: 25, borderWidth: 1, height: 25, width: 40, justifyContent: 'center' }}>
                                         <Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 9,fontFamily:'serif', fontWeight: '500' ,color:'#000'}}>{item[keys].certification_grade}</Text>
                                    </View>
                                </View>                            
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
                                <IconButton
                                    icon="delete-forever"
                                    size={30}
                                    color="red"
                                    onPress={() => removeFromCart(item['cartItem'])}
                                />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
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
        justifyContent: 'space-evenly'
    }

});

export default CartList;