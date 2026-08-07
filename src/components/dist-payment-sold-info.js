import React,{useState} from "react";
import { View, Text, StyleSheet,TouchableOpacity ,Dimensions, Alert} from "react-native";
import Modal from 'react-native-modal';
import SelectDropdown from "react-native-select-dropdown";

import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { PostUpdatePaymentStatus } from "../services/bundle-services/post-update-payment-status";
import { GetSoldOrders } from "../services/bundle-services/get-sold-orders";
import { useNavigation } from "@react-navigation/native";

const { width,height } = Dimensions.get("screen");

const DistPaymentSoldInfo = (paymentItem) => {
    const [isVisible, setisVisible] = useState(false);
    const PaymentType = ["CANCELLED", "APPROVED"];
    const dispatch = useDispatch()
    const {
        clearSoldOrder,
        initSoldOrder
        
    } = bindActionCreators(actionCreators,dispatch)

    
    const token = useSelector((state) => state.token[0]);
    const dealer = useSelector((state) => state.dealer);
    const navigation = useNavigation();

    for (var keys in paymentItem) {
        // const date = new Date(paymentItem[keys].payment_date);
        // const formattedDate = date.toISOString().split('T')[0];
        return (
            <View  style={styles.container}>
                <View style={styles.sub_container}>
                    <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 0, borderRadius: 0,width:'90%' }} >
                        <View style={{flexDirection:'row',justifyContent:'space-between', paddingBottom: 10 }}>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif' }}>Payment Ref</Text>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif' }}>{paymentItem[keys].payment_reference_no}</Text>
                        </View>
                        <View>
                            <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif'}}>Payment Mode</Text>
                                <Text style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif'}}>{paymentItem[keys].payment_type}</Text>
                            </View>
                            <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif' }}>Amount</Text>
                                <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif' }}>&#8377;{paymentItem[keys].amount}/-</Text>
                            </View>
                            {/* <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif' }}>Transaction Amount</Text>
                                <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif' }}>&#8377;{paymentItem[keys].transaction_amount}/-</Text>
                            </View> */}
                            {/* <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif' }}>Remarks</Text>
                                <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif' }}>{paymentItem[keys].remarks}</Text>
                            </View> */}
                            <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif'}}>Paid On</Text>
                                <Text style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif'}}>{paymentItem[keys].payment_date}</Text>
                            </View>
                            
                            <TouchableOpacity style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }} onPress={()=>{(dealer[0].category_id == 2 || dealer[0].category_id == 3 ) && paymentItem[keys].status != 'APPROVED' ? setisVisible(true) : null}}>
                                <Text style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif'}}>Status</Text>
                                <Text style={{ fontWeight: '600', color: "#063970",fontSize:14,fontFamily:'serif',fontWeight:'bold'}}>{paymentItem[keys].status}</Text>
                            </TouchableOpacity>
                            
                            {/* <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: '600', color: "#000",fontSize:16,fontFamily:'serif'}}>{paymentItem[keys].salesorder_no}</Text>
                                <Text style={{ fontWeight: '600', color: "#DD2A05",fontSize:16,fontFamily:'serif'}}>{(paymentItem[keys].status == 'INVOICED')?paymentItem[keys].status:"PENDING"}</Text>
                            </View> */}
                        </View>
                    </View>
                </View>
                <Modal
                    isVisible={isVisible}
                    animationIn='fadeIn'
                    animationOut='fadeOut'
                    style={{ justifyContent: 'center', alignItems: 'center',padding:0,margin:0 }}
                >
                <View style={{ backgroundColor:'#ffffff', width:width-60,borderRadius:5}}>
                    <View style={{backgroundColor:'#dddddd',padding:10,margin:0,borderTopLeftRadius:5,borderTopRightRadius:5}}>
                        <Text style={{ color:'#333333',fontWeight:'700'}}>UPDATE DETAILS</Text>
                    </View>
                    <View style={{padding:40,width:"90%"}}>
                        <View style={{marginBottom:30,flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:'#000',fontWeight:'bold'}}>Order Status : </Text>
                            <Text style={{color:'#000',fontWeight:'bold'}}>{paymentItem?.paymentItem?.status}</Text>
                        </View>
                        {/* {
                            paymentItem?.paymentItem?.status == 'APPROVED' ? */}
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20,alignItems:'center'}}>
                                <Text style={{color:'#000',fontWeight:'bold'}}>Update Status :</Text>
                                <View style={{}}>
                                    <SelectDropdown
                                        data={PaymentType}
                                        onSelect={(selectedItem, index) => {
                                            // Alert.alert(selectedItem,"Integrate API for Update SOld ORder Status")
                                            const Reqdata={
                                                "payment_id" : paymentItem?.paymentItem?.payment_id,
                                                "order_id" : paymentItem?.paymentItem?.order_id,
                                                "status" : selectedItem
                                            }
                                            PostUpdatePaymentStatus(Reqdata,token).then((Res)=>{
                                                if(Res?.status == 1){
                                                    // clearSoldOrder();
                                                    // GetSoldOrders(dealer[0].vendor_id,token).then((res4)=>{  
                                                    //     if(res4?.['status'] == 1){
                                                    //         for(var i=0;i<res4['results'].length;i++){
                                                    //             initSoldOrder(res4['results'][i])
                                                    //         }

                                                    //     }
                                                    // })
                                                    // navigation.goBack()
                                                }
                                            })
                                            
                                        }}
                                        defaultButtonText={paymentItem?.paymentItem?.status}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem;
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item;
                                        }}
                                        
                                        buttonTextStyle={{fontSize:13,fontFamily:'serif'}}
                                        rowTextStyle ={{fontSize:10,fontFamily:'serif'}}
                                        buttonStyle={{borderRadius:0,height:35,width:100,backgroundColor:"#fff",borderWidth:1}}
                                    />
                                </View>
                            </View>
                            {/* :
                            <View>
                                <Text style={{color:"red", fontWeight:'bold'}}>YOUR ORDER IN PENDING STATUS</Text>
                            </View>
                        
                        } */}
                        
                        
                    </View>
                    
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
    };
};


const styles = StyleSheet.create({
container:{
    borderWidth: 0, 
    marginVertical: 10, 
    borderRadius: 5,
    borderColor: "#CCC",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
        height: 1,
        width: 1
    },
    borderColor:'#ccc',
    borderWidth:1,
    padding:10
    

},
sub_container:{ 
    flexDirection: 'row', 
    padding: 0,
    marginVertical:0,
    justifyContent:'space-evenly'
}

});
export default DistPaymentSoldInfo;