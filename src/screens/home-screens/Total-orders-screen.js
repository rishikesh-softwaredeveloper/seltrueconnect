import React,{useState} from 'react';
import { View,Text, FlatList,RefreshControl } from 'react-native';
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { GetTotalOrders } from '../../services/bundle-services/get-total-orders';
import TotalOrderItem from '../../components/total-order-item';


const TotalOrderScreen =()=>{
    const orderlist = useSelector((state) => state.orderlist);
    const [refreshing, setRefreshing] = useState(false);
    const [spinner, setSpinner] = useState(false)

    const dealer = useSelector((state)=>state.dealer);
    const token = useSelector((state)=>state.token[0]);
    const vendor_id = dealer[0].vendor_id;

    const dispatch = useDispatch()
    const {
        initOrder,
        clearOrder
    } = bindActionCreators(actionCreators,dispatch)


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        clearOrder();
        GetTotalOrders(vendor_id,token).then((res)=>{
            if(res['status'] == 1){
                for(var i=0;i<res['order_items'].length;i++){
                    initOrder(res['order_items'][i])
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
            orderlist.length !== 0 ?(
                <FlatList
                    refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
                    data={orderlist.sort((a,b)=> a-b)}
                    // data={orderlist.sort((a,b)=>a.salesorder_id.localeCompare(b.salesorder_id))}
                    renderItem={({ item }) => <TotalOrderItem orderItem={item} />}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item + index}
                />
            ):(<Text style={{textAlign:'center',justifyContent:'center',marginTop:'60%',color:'#999993'}}>No Records Found!</Text>)
        }
        </View>
    )
}

export default TotalOrderScreen;