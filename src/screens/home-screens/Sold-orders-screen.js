import React,{useState,useEffect} from 'react';
import { View,Text, FlatList,RefreshControl } from 'react-native';
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { GetPurchasedOrders } from '../../services/bundle-services/get-purchased-orders';
import SoldOrderItem from '../../components/sold-order-item';
import { GetSoldOrders } from '../../services/bundle-services/get-sold-orders';


const SoldOrderScreen =()=>{
    const soldOrderList = useSelector((state) => state.soldOrderList);
    const [refreshing, setRefreshing] = useState(false);
    const [spinner, setSpinner] = useState(false)

    const dealer = useSelector((state)=>state.dealer);
    const token = useSelector((state)=>state.token[0]);
    const vendor_id = dealer[0].vendor_id;

    const dispatch = useDispatch()
    const {
        clearSoldOrder,
        initSoldOrder
        
    } = bindActionCreators(actionCreators,dispatch)

    useEffect(()=>{
        clearSoldOrder();
        GetSoldOrders(vendor_id,token).then((res4)=>{  
            if(res4?.['status'] == 1){
              for(var i=0;i<res4['results'].length;i++){
                initSoldOrder(res4['results'][i])
              }
            }
        })
    },[])


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        clearSoldOrder();
        GetSoldOrders(vendor_id,token).then((res4)=>{  
            if(res4?.['status'] == 1){
              for(var i=0;i<res4['results'].length;i++){
                initSoldOrder(res4['results'][i])
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
            soldOrderList.length !== 0 ?(
                <FlatList
                    refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
                    data={soldOrderList.sort((a,b)=> a-b)}
                    // data={orderlist.sort((a,b)=>a.salesorder_id.localeCompare(b.salesorder_id))}
                    renderItem={({ item }) => <SoldOrderItem orderItem={item} />}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item + index}
                />
            ):(<Text style={{textAlign:'center',justifyContent:'center',marginTop:'60%',color:'#999993'}}>No Records Found!</Text>)
        }
        </View>
    )
}

export default SoldOrderScreen;