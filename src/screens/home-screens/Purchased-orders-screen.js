import React,{useState} from 'react';
import { View,Text, FlatList,RefreshControl } from 'react-native';
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { GetPurchasedOrders } from '../../services/bundle-services/get-purchased-orders';
import PurchaseOrderItem from '../../components/purchase-order-item';


const PurchasedOrderScreen =()=>{
    const purchaseOrderList = useSelector((state) => state.purchaseOrderList);
    const [refreshing, setRefreshing] = useState(false);
    const [spinner, setSpinner] = useState(false)

    const dealer = useSelector((state)=>state.dealer);
    const token = useSelector((state)=>state.token[0]);
    const vendor_id = dealer[0].vendor_id;

    const dispatch = useDispatch()
    const {
        initPurchaseOrder,
        clearPurchaseOrder,
        
    } = bindActionCreators(actionCreators,dispatch)


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        clearPurchaseOrder();
        GetPurchasedOrders(vendor_id,token).then((res4)=>{  
            if(res4?.['status'] == 1){
              clearPurchaseOrder()
              for(var i=0;i<res4['results'].length;i++){
                initPurchaseOrder(res4['results'][i])
              }
            }
        }).then(() => setRefreshing(false));
    }, []);
    
    return (
        <View style={{ flex: 1 }}>
            {
            spinner ? (
                <View style={{minHeight:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size='large' color="#999999" animating={true} />
                </View>
            ):
            purchaseOrderList.length !== 0 ?(
                <FlatList
                    refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
                    data={purchaseOrderList.sort((a,b)=> a-b)}
                    // data={orderlist.sort((a,b)=>a.salesorder_id.localeCompare(b.salesorder_id))}
                    renderItem={({ item }) => <PurchaseOrderItem orderItem={item} />}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item + index}
                />
            ):(<Text style={{textAlign:'center',justifyContent:'center',marginTop:'60%',color:'#999993'}}>No Records Found!</Text>)
        }
        </View>
    )
}

export default PurchasedOrderScreen;