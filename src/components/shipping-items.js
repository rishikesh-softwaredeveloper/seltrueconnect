import React,{useState} from "react";
import { View, Text, StyleSheet, ActivityIndicator} from "react-native";
import { IconButton } from "react-native-paper";
import { CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { PostDeleteShippingAddress } from "../services/bundle-services/post-delete-shipping-address";
import { GetShippingAddress } from "../services/bundle-services/get-shipping-address";

const ShippingItem = (shippingItem) => { 
    const navigation = useNavigation();
    const [spinner, setSpinner] = useState(false)
    
    const token = useSelector((state)=>state.token[0]);
    const dealer = useSelector((state)=>state.dealer);

    const dispatch = useDispatch();
    const { 
        clearShippingAddress,
        initShippingAddress,
    } = bindActionCreators(actionCreators, dispatch);

    const editShippingAddress=(Item)=>{
        navigation.navigate("EditShippingAddressScreen",{"shippingItem":Item});
    }

    const deleteShippingAddress = (id)=>{
        setSpinner(true);
        PostDeleteShippingAddress({"shipping_id":id,"attached_vendor_id":dealer[0].attached_vendor_id,"category_id":dealer[0].category_id},token).then((response)=>{
            
            if(response['status'] == 1){
                const reqData= {
                    "attached_vendor_id":dealer[0].attached_vendor_id,
                    "vendor_id":dealer[0].vendor_id,
                    "category_id":dealer[0].category_id
                }
        
                GetShippingAddress(token,reqData).then((res5)=>{
                    if(res5['status'] == 1){
                        clearShippingAddress()
                        initShippingAddress(res5['data'])
                        setSpinner(false);
                    }
                })

            }
        })
    }

    // const paymentRoute = (item)=>{
    //     navigation.navigate("PaymentRouteScreen",{"address_info":item})
    // }

    for (var keys in shippingItem) {
        return (
            <View style={styles.container}>
                {
                    spinner ? (
                    <View style={{minHeight:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator size='large' color="#999999" />
                    </View>
                    ):
                    <View style={styles.sub_container}>
                        <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 10,paddingBottom:5, borderRadius: 0, width: '60%' }}>
                            <View>
                                {/* <View>
                                <CheckBox
                                    title=''
                                    checked={true}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checkedColor='#000'
                                    onPress={()=>{
                                    setCheckOnline(true);
                                    setCheckOffline(false);                
                                    }}
                                    containerStyle={{borderRadius:0,backgroundColor:'#fff',borderColor:'#fff'}}
                                />
                                </View> */}
                                <View style={{ paddingBottom: 0 }}>
                                    <Text style={{ 
                                        color: "#000", 
                                        fontWeight: '500',
                                        fontFamily:'serif',
                                        fontSize:14,
                                        textTransform:'capitalize',
                                        paddingBottom:5}}
                                    >{shippingItem[keys].shipping_address.toUpperCase()}</Text>
                                    <Text style={{paddingBottom:5,color:"#000"}}>{shippingItem[keys].pincode}</Text>
                                    <Text style={{paddingBottom:5,color:"#000"}}>{shippingItem[keys].city}, {shippingItem[keys].state} </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:1,justifyContent:'space-around',marginHorizontal:10,flexDirection:'row',width:"40%"}}>
                            <View style={{ borderColor: "#CCC", justifyContent: 'center' }}>
                                    <IconButton
                                        icon="pencil-outline"
                                        size={25}
                                        color="#4256c9"
                                        onPress={() => editShippingAddress(shippingItem)}
                                    />
                                   
                                    <IconButton
                                        icon="delete-forever"
                                        size={25}
                                        color="red"
                                        onPress={() => deleteShippingAddress(shippingItem[keys].shipping_id)}
                                     />
                            </View>
                            {/* <View style={{ padding: 0, borderStartWidth: 0, borderColor: "#CCC", justifyContent: 'center' }}>
                                <IconButton
                                    icon="chevron-right"
                                    size={30}
                                    color="green"
                                    onPress={()=>paymentRoute(shippingItem)}
                                />
                            </View> */}
                        </View>
                    </View>
                }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        marginVertical: 5, 
        marginHorizontal: 5,
        borderRadius: 5,
        padding: 0,
        borderColor: "#CCC",
        width:'95%',
        marginLeft:10
    },
    sub_container: {
        flexDirection: 'row',
        padding: 0,
        marginVertical: 0,
        justifyContent: 'space-between',
    }
});
export default ShippingItem;