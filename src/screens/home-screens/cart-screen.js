import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from "react-native-elements";
import { View, FlatList, Text, TouchableOpacity, BackHandler, ActivityIndicator, RefreshControl, Alert, StyleSheet } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { GetCartList } from '../../services/bundle-services/get-cartlist';
import { PostDiscount } from "../../services/bundle-services/post-discount";
import CartList from "../../components/cart-list";
import RBSheet from "react-native-raw-bottom-sheet";
import AppLoader from "./apploading";
import { PostCreateSSSalesDispatch } from "../../services/bundle-services/post-create-ss-sales-dispatch";
import { GetBundleList } from "../../services/bundle-services/get-bundles";
import { GetDeviceListStockType } from "../../services/bundle-services/get-openbox-item-list";
import { PostDistCreateOrder } from "../../services/bundle-services/post-dist-create-order";
import { GetPurchasedOrders } from "../../services/bundle-services/get-purchased-orders";
import { GetSoldOrders } from "../../services/bundle-services/get-sold-orders";
import { GetTotalOrders } from "../../services/bundle-services/get-total-orders";
import { PostSsDiscount } from "../../services/bundle-services/post-ss-discount";
import { GetTcsValue } from "../../services/bundle-services/post-get-tcs-value";
import { PostDistPayment } from "../../services/bundle-services/post-dist-payment";
import { PostUpdateDistOrderPayment } from "../../services/bundle-services/post-update-dist-orderpaymet";

const CartScreen = () => {
    
    const navigation = useNavigation();
    const refRBSheet = useRef();

    const [spinner, setSpinner] = useState(false)
    const [on, setOn] = useState(false)
    const [tcsAmount, setTcsAmount] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const cartlist = useSelector((state) => state.cartlist);
    const shippingAddress = useSelector((state) => state.shippingAddress[0]);
    const token = useSelector((state) => state.token[0]);
    const sumqnty = useSelector((state) => state.sumqnty);
    const discount = useSelector((state) => state.discount);
    const sumprice = useSelector((state) => state.sumprice);
    const dealer = useSelector((state) => state.dealer);
    const order_amount= sumprice-discount;

    const primaryShipping = useSelector((state) => state.primaryShipping);


    const dispatch = useDispatch()
    const {
        clearCart,
        clearPrice,
        clearPrimaryShipping,
        initItem,
        clearQnty,
        clearDiscount,
        initDiscount,
        initPrice,
        initQnty,
        initPrimaryShipping,
        clearOrder,
        clearPurchaseOrder,
        // clearSoldOrder,
        clearOpenBox,
        clearNewDevices,
        clearSeltrueBox,
        clearMasterOpenBox,
        clearMasterNewDevices,
        clearMasterSeltrueBox,
        clearBrands,
        clearGrades,
        initBrands,
        initGrades,
        initOpenBox,
        initNewDevices,
        initSeltrueBox,
        initMasterOpenBox,
        initMasterNewDevices,
        initMasterSeltrueBox,
        initOrder,
        initPurchaseOrder,
        // initSoldOrder,
        addOrder,
        clearBundle,
        initBundle,
    } = bindActionCreators(actionCreators,dispatch)

    useEffect(()=>{
        var deviceQty = 0;
        var deviceAmount = 0;
        var stock_type ='';
        const orderData = [];

        for (const item of cartlist) {
            if(item?.bundle_no){
                const bundleDiscount ={
                    "quantity":item?.['quantity'],
                    "amount": Number(item?.['amount']),
                    "saleType": 'bundle',
                    "bundleType":"ALL"
                } 
                deviceQty= deviceQty+10;
                deviceAmount = deviceAmount+Number(item?.['amount']);
                orderData.push(bundleDiscount)
            }else if(item?.device_name){
                deviceQty= deviceQty+1;
                deviceAmount = deviceAmount+Number(item?.['amount']);
                stock_type = item?.['stock_type'];
                
                if(stock_type == 'OPEN BOX'){
                    stock_type = 'openbox';
                }
            }
        }
       
        const deviceDiscount ={
            "quantity":deviceQty,
            "amount":deviceAmount,
            "saleType":stock_type.toLowerCase(),
            "bundleType":''
        }

        const ssDeviceDiscount ={
            "category_id" : dealer[0].category_id,
            "orderData": [
              {
                "quantity"  : deviceQty,
                "amount"    : deviceAmount,
                "saleType" : "bundle",
                "bundleType" : "ALL"
              }
            ]
        }

        if(deviceQty != 0 && deviceAmount != 0 && stock_type != ""){
            orderData.push(deviceDiscount);
        }
        if(dealer[0].attached_vendor_id == null || dealer[0].attached_vendor_id == ''){
            PostDiscount({"orderData":orderData},token).then((res)=>{
                if(res['status'] == 1){
                    clearDiscount();
                    initDiscount(res['data']['totalDcAmount']);
                }
            })
        }else{
            PostSsDiscount(ssDeviceDiscount,token).then((res)=>{
                if(res['status'] == 1){
                    clearDiscount();
                    initDiscount(res['data']['totalDcAmount']);
                }
            })
        }

        
        const tcsData ={
            "vendorId":dealer[0].vendor_id,
            "orderAmount":order_amount,
            "category_id":dealer[0].category_id,
            "attached_vendor_id": dealer[0].attached_vendor_id
        }
        GetTcsValue(tcsData,token).then((response)=>{
            if(response.status == 1){
            setTcsAmount(response.tcs_value)
            }
        })
        
        
    },[cartlist])

    const onRefresh = React.useCallback(async () => {
        
    setRefreshing(true);

    try {
        clearCart();
        clearQnty();
        clearPrice();

        const res = await GetCartList(
            dealer[0].vendor_id,
            token
        );

        if (res?.status === 1) {
            for (let i = 0; i < res.data.length; i++) {
                initItem(res.data[i]);
                initPrice(
                    Number(res.data[i].amount)
                    // Number(res.data[i].amount.split('.')[0])
                );
            }

            initQnty(res.data.length);
        }
    } catch (error) {
        console.log('Refresh cart error:', error);
    } finally {
        setRefreshing(false);
    }
    }, [dealer, token]);

    if(sumqnty<0){
        clearQnty();
        setOn(true);
    }

    if(sumprice<0){
        clearPrice();
        setOn(true);
    }

    function shippingDetails(){
        refRBSheet.current.close();
        navigation.navigate("ShippingDetailsScreen")
    }


    const salesDispatchNewcommon =(orderIds)=>{
        const salesDispatchData = {
          "vendor_id": dealer[0]?.vendor_id,
          "salesorder_id":orderIds,
          "dispatch_address": primaryShipping[0]['shipping_address'],
          "city": primaryShipping[0]['city'],
          "state": primaryShipping[0]['state'],
          "pincode": primaryShipping[0]['pincode']
        };
        PostCreateSSSalesDispatch(salesDispatchData, token).then((salesDispatchResponse)=>{
          if(salesDispatchResponse['status'] == 1){
            clearCart();
            clearPrice();
            clearQnty();
            clearBundle();
    
            GetBundleList(dealer[0].vendor_id,token).then((Res) => {
              if (Res['status'] == 1) {
                initBundle(Res.data);
              }
            })
            
            GetDeviceListStockType({"stock_type":"NEW","vendor_id":dealer[0].vendor_id},token).then((Res2)=>{
              clearNewDevices()
              clearMasterNewDevices()
              if(Res2.status == 1){
                clearBrands()
                clearGrades()
                for(var i=0;i<Res2['data'].length;i++){
                  initBrands(Res2['data'][i]['product_brand'])
                  initGrades(Res2['data'][i]['certification_grade'])
                }
                initNewDevices((Res2.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
                initMasterNewDevices((Res2.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
              }
            })

            GetDeviceListStockType({"stock_type":"OPEN BOX","vendor_id":dealer[0].vendor_id},token).then((Res2)=>{
              clearOpenBox()
              clearMasterOpenBox()
              if(Res2.status == 1){
                GetDeviceListStockType({"stock_type":"PREXO","vendor_id":dealer[0].vendor_id},token).then((Res)=>{
                  clearSeltrueBox()
                  clearMasterSeltrueBox()
                  if(Res.status == 1){
                    initSeltrueBox((Res.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
                    initMasterSeltrueBox((Res.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
                  }
                })
                clearBrands()
                clearGrades()
                for(var i=0;i<Res2['data'].length;i++){
                  initBrands(Res2['data'][i]['product_brand'])
                  initGrades(Res2['data'][i]['certification_grade'])
                }
                initOpenBox((Res2.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
                initMasterOpenBox((Res2.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)))
              }
            })

            GetTotalOrders(dealer[0].vendor_id,token).then((res)=>{
                if(res['status'] == 1){
                clearOrder();
                for(var i=0;i<res['total_orders'];i++){
                    initOrder(res['order_items'][i]);
                }
                }
            })

            GetPurchasedOrders(dealer[0].vendor_id,token).then((res4)=>{

                if(res4?.['status'] == 1){
                clearPurchaseOrder()
                for(var i=0;i<res4['results'].length;i++){
                    initPurchaseOrder(res4['results'][i])
                }
                }
                
            })
            navigation.navigate('MainScreen',{screen:'OrderScreen'});
        }
        }).catch((e)=>{
            console.log(e,"PostCreateSSSalesDispatch")
        })
      }

    function distOrNewDealerPlaceOrder(paymentId){
        const bundleItems=[];
        const spstbundles =[];
        const openboxItems=[];
        const newDevicesItems=[];
        const seltrueboxItems=[];
        const orderData = [];
        const bundleIds=[];

        var deviceQty = 0;
        var deviceAmount = 0;
        var stock_type = '';
        
        for(var i=0; i<cartlist.length;i++){
        if(cartlist[i].bundle_no){
            const standard ={
            "bundle_id": cartlist[i].bundle_id
            }
            const bundle_discount_data ={
            "quantity":cartlist[i]['quantity'],
            "amount": cartlist[i]['amount'],
            "saleType": 'bundle',
            "bundleType":"ALL"
            }
            orderData.push(bundle_discount_data);
            bundleItems.push(standard);
            spstbundles.push(cartlist[i].bundle_id);
            bundleIds.push(cartlist[i].bundle_id);

        }else if(cartlist[i].stock_type == 'OPEN BOX'){
            const devices ={
            "grnreport_id": cartlist[i].grnreport_id
            }
            deviceQty= deviceQty + 1;
            deviceAmount = deviceAmount + cartlist[i]['amount'];
            stock_type = cartlist[i]['stock_type'];
            
            if(stock_type == 'OPEN BOX'){
            stock_type = 'openbox';
            }
            openboxItems.push(devices);
        }else if(cartlist[i].stock_type == 'PREXO'){
            const prexoDevices ={
            "grnreport_id": cartlist[i].grnreport_id
            }
            deviceQty= deviceQty + 1;
            deviceAmount = deviceAmount + cartlist[i]['amount'];
            stock_type = cartlist[i]['stock_type'];
            
            if(stock_type == 'OPEN BOX'){
                stock_type = 'openbox';
            }
            seltrueboxItems.push(prexoDevices);
        }else if(cartlist[i].stock_type == 'NEW'){
            const newDevices ={
            "grnreport_id": cartlist[i].grnreport_id
            }
            deviceQty= deviceQty + 1;
            deviceAmount = deviceAmount + cartlist[i]['amount'];
            stock_type = cartlist[i]['stock_type'];
            
            newDevicesItems.push(newDevices);
        }
        }

        const distbutorCreateReqData ={
            "bundle_id": spstbundles ,
            "vendor_id": dealer[0].vendor_id,
            "order_discount":discount,
            "attached_vendor_id":dealer[0].attached_vendor_id,
            "category_id":dealer[0].category_id,
            "tcs_value":tcsAmount
        }
       
        if(spstbundles.length != 0){
            PostDistCreateOrder(distbutorCreateReqData,token).then(DistRes =>{
                console.log(DistRes,"PlaceOrderAPI");
                if(DistRes.status == 1){
                    const orderIds = [];
                    orderIds.push(DistRes?.data?.['order_id']);
                    salesDispatchNewcommon(orderIds)
                    const updateOrderPayment ={
                        "payment_id" : paymentId,
                        "order_id" : DistRes?.data?.['order_id']
                    }
                    PostUpdateDistOrderPayment(updateOrderPayment,token).then(Res=>{
                        console.log(Res);
                    })
                    
                }else{
                    alert(DistRes.message)
                }
            })        
        }
    }


    function shipping(){
        if(primaryShipping.length == 0){
            alert('Please select Shipping Address');
        }
        if(primaryShipping.length > 0){
            const shippingItem = {
                "city":primaryShipping[0]['city'],
                "created_date":primaryShipping[0]['created_date'],
                "pincode":primaryShipping[0]['pincode'],
                "shipping_address":primaryShipping[0]['shipping_address'],
                "shipping_id":primaryShipping[0]['shipping_id'],
                "state":primaryShipping[0]['state'],
                "updated_date":primaryShipping[0]['updated_date'],
    
            }
                navigation.navigate("PaymentRouteScreen",{"address_info":{"shippingItem":shippingItem}})
        }
    }
    
    function backAction(){
        Alert.alert("Hold on!", "Are you sure you want to Exit App?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
    };

    let backHandler = BackHandler.addEventListener("hardwareBackPress",backAction);

    useEffect(() => {
        return () => backHandler.remove();
    }, [backHandler]);

    function off(){
        setOn(true);
    }

    const ItemRender = ({ shippingItem }) => (
        <TouchableOpacity onPress={()=>{
            clearPrimaryShipping();
            initPrimaryShipping(shippingItem);
            refRBSheet.current.close();
        }}>
            <View style={{
                padding: 8,
                backgroundColor: primaryShipping.length >0 ? shippingItem.shipping_id == primaryShipping[0]['shipping_id']?'#f5f1ed':'#fff':'#fff',
                width: 200,
                height: 100,
                justifyContent: 'center',
                alignItems: 'flex-start',
                borderWidth:1,
                borderColor:'#ccc',
                borderRadius:5
            }}>
                <Text style={styles.itemText}>{shippingItem.shipping_address}</Text>
                <Text style={styles.itemText}>{shippingItem.city}</Text>
                <Text style={styles.itemText}>{shippingItem.state}</Text>
                <Text style={styles.itemText}>{shippingItem.pincode}</Text>
            </View>
        </TouchableOpacity>
    );

    const Separator = () => {
        return (
          <View
            style={{
              width: 5,
            }}
          />
        );
      }

    return (
        <View style={{ flex: 1 }}>
            <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#ccc',backgroundColor:'#ccc'}}>
                <View style={{justifyContent:'center',marginLeft:5}}>
                    <Icon name="map-marker" type="material-community" color='#323333' size={20}/>
                </View>
                <Button
                    // title={"Motilal Nehru Nagar, Begumpet"}
                    title={primaryShipping.length > 0?primaryShipping[0]['shipping_address']+', '+primaryShipping[0]['pincode']:"Set Shipping Address"}
                    onPress={() =>refRBSheet.current.open()}
                    buttonStyle={{
                        borderColor:'#ccc',
                    }}
                    type="outline"
                    titleStyle={{ 
                        // color: 'rgba(78, 116, 289, 1)',
                        color: '#323333',
                        fontSize:12,
                    }}
                    icon={{
                        name: 'angle-down',
                        type: 'font-awesome',
                        size: 20,
                        color: '#323333',
                    }}
                    iconRight
                    iconContainerStyle={{ marginLeft: 10 }}
                    containerStyle={{
                    width: "100%",
                    paddingLeft:10,
                    paddingRight:30,
                    // borderBottomWidth:1,
                    // borderBottomColor:'#ccc',
                    alignItems:'flex-start'
                    }}
                />
            </View>                
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                wrapper: {
                    backgroundColor: "transparent"
                },
                draggableIcon: {
                    backgroundColor: "#000",
                },
                container:{
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'#defaf9'
                }
                }}
            >
                <Text style={{marginTop:10,marginBottom:20,color:'#000',textDecorationLine:"underline"}}>Select Shipping Address</Text>
                <FlatList
                    data={shippingAddress}
                    renderItem={({ item }) => <ItemRender shippingItem={item} />}
                    keyExtractor={(item, index) => item + index}
                    ItemSeparatorComponent={Separator}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                />
                <Button
                    title={"Add an Address"}
                    onPress={shippingDetails}
                    containerStyle={{
                        width: "100%",
                        alignItems:'center',
                        marginBottom:20
                    }}
                />                 
            </RBSheet>
            {
                // spinner ? (
                //     <View style={{minHeight:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                //         <ActivityIndicator size='large' color="#999999" />
                //     </View>
                // ):
                // cartlist.length !== 0 ?(
                    <FlatList
                        refreshControl={
                            <RefreshControl 
                            refreshing={refreshing} 
                            
                            onRefresh={onRefresh} />
                        }
                        data={cartlist}
                        renderItem={({ item }) => <CartList cartItem={item} />}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => item + index}
                    />
                    
                // )
                // :(<Text style={{textAlign:'center',justifyContent:'center',marginTop:'60%',color:'#999993'}}>No Records Found!</Text>)
            }
            {
              cartlist.length !== 0 ? (
                  <View elevation={6} style={styles.container}>
                      <View style={{ width: '100%' }}>
                            <View style={{flexDirection:'row',padding:0}}>
                                    <View style={{width:"50%",borderWidth:1,borderRadius:5,backgroundColor:'#fcf7ed',borderColor:'#fcf7ed'}}>
                                        <View style={{flexDirection:'row',padding:2}}>
                                            <View style={{width:'50%'}}>
                                            <Text style={{fontSize:14,fontWeight:"700",fontFamily:'serif',color:'#000'}}>Order</Text>
                                            </View>
                                            <Text style={{fontSize:14,fontWeight:"700",fontFamily:'serif',color:'#000'}}> &#8377;{sumprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</Text>
                                        </View>
                                        <View style={{flexDirection:'row',padding:2}}>
                                            <View style={{width:'50%'}}>
                                            <Text style={{fontSize:14,fontWeight:"700",fontFamily:'serif',color:'#000'}}>Discount</Text>
                                            </View>
                                            <Text style={{fontSize:14,fontWeight:"700",fontFamily:'serif',color:'#000'}}> &#8377;{discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</Text>
                                        </View>
                                    </View>
                                <View style={{width: "50%",justifyContent:'center'}}>
                                    <TouchableOpacity  onPress={cartlist.length>0?shipping:off} disabled={on}>
                                    <Text style={{textAlign:'center',fontSize:12,fontWeight:"700",fontFamily:'serif',color:'#000'}}>Proceed to Buy ({sumqnty})</Text>
                                    <Text style={{textAlign:'center',fontSize:18,fontWeight:"700",fontFamily:'serif',color:'#000'}}>&#8377;{parseFloat((sumprice-discount).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                  </View>
              ):(<Text style={{textAlign:'center',justifyContent:'center',marginTop:'50%',color:'#999993'}}></Text>)
            }
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
        height: 50
    },
    item: {
        padding: 8,
        backgroundColor: '#fff',
        width: 150,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        borderRadius:5
    },
    itemText: {
        fontSize: 12,
        color:'#000'
    }
  });

export default CartScreen;