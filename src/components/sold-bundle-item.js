import React,{useState} from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet,TouchableOpacity,Dimensions } from "react-native";
import { IconButton } from "react-native-paper";
import { Image } from 'react-native-elements';
import Modal from 'react-native-modal';
import SelectDropdown from "react-native-select-dropdown";
import { PostUpdateBundleStatus } from "../services/bundle-services/post-update-bundle-status";
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { GetPurchasedOrders } from "../services/bundle-services/get-purchased-orders";

const { width,height } = Dimensions.get("screen");

const SoldBunldeItem = (bundleItem) => {
    const token = useSelector((state) => state.token[0]);
    const dealer = useSelector((state) => state.dealer);

    const dispatch = useDispatch()
    const {
        initPurchaseOrder,
        clearPurchaseOrder,
        
    } = bindActionCreators(actionCreators,dispatch)

    const navigation = useNavigation();
    const [isVisible, setisVisible] = useState(false);
    const types = ["ACTIVE", "IN-ACTIVE","SOLD"];


    const bundleDetails = (item) => {
        navigation.navigate('SoldBundleOrderListScreen', { "bundleItem": item })
    }

    for (var keys in bundleItem) {
        return (
            (bundleItem[keys].bundle_no)?(
                <View  style={styles.container}>
                    <View style={styles.sub_container}>
                        <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 10, borderRadius: 0, width: '60%' }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <View style={{ paddingBottom: 5 }}>
                                    <Text numberOfLines={2} style={{ color: "#000", fontWeight: '500',fontSize:14,fontFamily:'serif',marginLeft:10 }}>{bundleItem[keys].bundle_no.toUpperCase()}</Text>
                                </View>
                            </View>
                            <View style={{ paddingBottom: 5 }}>
                                {/* <TouchableOpacity style={{ paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }} onPress={()=>{bundleItem[keys].bundle_status != 'SOLD' && setisVisible(true)}}>
                                    <Text style={{ fontWeight: '600', color: "#000",fontSize:12,fontFamily:'serif',marginLeft:10 }}>{bundleItem[keys].bundle_status}</Text>
                                </TouchableOpacity> */}
                                <View style={{ paddingBottom: 0, flexDirection: 'row', justifyContent:'flex-start' }}>
                                    <Text style={{ fontWeight: 'bold', color: "#DD2A05",fontSize:14,fontFamily:'serif' }}> &#8377;  {bundleItem[keys].sale_price}/-</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ margin: 0, padding: 0, borderStartWidth: 0, borderColor: "#CCC", justifyContent: 'center', width: "20%" }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                                <IconButton
                                    icon="chevron-right"
                                    size={30}
                                    color="gray"
                                    onPress={() => bundleDetails(bundleItem)}
                                />
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
                                    <Text style={{color:'#000',fontWeight:'bold'}}>Bundle Status : </Text>
                                    <Text style={{color:'#000',fontWeight:'bold'}}>{bundleItem?.bundleItem?.bundle_status}</Text>
                                </View>
                                {
                                    bundleItem?.bundleItem?.order_status == 'APPROVED' ?
                                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20,alignItems:'center'}}>
                                        <Text style={{color:'#000',fontWeight:'bold'}}>Update Status :</Text>
                                        <View style={{}}>
                                            <SelectDropdown
                                                data={types}
                                                onSelect={(selectedItem, index) => {
                                                    const Reqdata={
                                                        "bundle_id" :bundleItem?.bundleItem?.bundle_id,
                                                        "order_id" : bundleItem?.bundleItem?.order_id,
                                                        "status" : selectedItem
                                                    }
                                                    PostUpdateBundleStatus(Reqdata,token).then((Res)=>{
                                                        if(Res?.results?.status == 1){
                                                            clearPurchaseOrder();
                                                            GetPurchasedOrders(dealer[0].vendor_id,token).then((res4)=>{  
                                                                if(res4?.['status'] == 1){
                                                                for(var i=0;i<res4['results'].length;i++){
                                                                    initPurchaseOrder(res4['results'][i])
                                                                }
                                                                }
                                                            })
                                                            // navigation.goBack()
                                                            navigation.goBack()
                                                        }
                                                    })
                                                    
                                                }}
                                                defaultButtonText={bundleItem?.bundleItem?.bundle_status}
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
                                    :
                                    <View>
                                        <Text style={{color:"red", fontWeight:'bold'}}>YOUR ORDER IN PENDING STATUS</Text>
                                    </View>
                               
                                }
                                
                                
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
            ):(
            <View style={styles.sub_container}>
                <View  style={{borderWidth: 1,marginVertical: 3, marginHorizontal: 15, borderRadius: 5,margin: 0,padding: 0,borderColor: "#CCC"}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:"30%",paddingTop:0,marginRight:0,marginLeft:0}}>
                        <Image style={{resizeMode:'contain',height:100,width:'100%',margin:10}} 
                            // source={{uri:bundleItem[keys].image_path}}
                            source={bundleItem[keys].stock_type=='OPEN BOX'? require('../assets/images/Open_box.png'):require('../assets/images/Seltrue_box.png')}
                        />
                            {/* <Image style={{resizeMode:'stretch',marginLeft:2,height:90,width:90}}  source={require('../assets/images/oppo.jpg')}/> */}
                        </View>
                        <View style={styles.sub_container}>
                            <View style={{flexDirection:'column',width:"50%",marginTop:10}}>
                                <View style={{fontWeight:'400',fontSize:12,textAlign:'center',marginBottom:5}}>
                                    <Text numberOfLines={2}  style={{color: "#000",fontWeight: '500', fontFamily: 'serif',fontSize:14,justifyContent:'center',alignItems:'center'}}>{bundleItem[keys].device_name}</Text>
                                </View>
                                <Text style={{fontFamily:'serif', fontSize:12,color: '#575957',marginBottom:10}}>{bundleItem[keys].ram} - {bundleItem[keys].rom}</Text>
                                <View style={{flexDirection:'row',justifyContent:'flex-start',marginBottom:10}}>
                                    <Text style={{ fontWeight: '500',fontFamily:'serif',fontSize:13,color: "#8F8C8B" ,textDecorationLine: 'line-through', }}>&#8377;{(bundleItem[keys].mrp+500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                    <Text style={{ fontWeight: '500',fontFamily:'serif', color: "#DD2A05",fontSize:13,marginLeft:6 }}>&#8377;{(bundleItem[keys].mrp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</Text>
                                </View>
                            </View>
                            <View style={{ margin: 0, padding: 0, borderStartWidth: 0, borderColor: "#CCC", justifyContent: 'center', width: "20%",marginTop:0 }}>
                                <View style={{ alignItems: 'center', marginLeft: 0,paddingBottom:5}}>
                                    <View style={{ borderColor: "#ffe6e6", backgroundColor: "#ffe6e6", borderRadius: 25, borderWidth: 1, height: 25, width: 40, justifyContent: 'center' }}>
                                        <Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 9,fontFamily:'serif', fontWeight: '500' }}>{bundleItem[keys].certification_grade}</Text>
                                    </View>
                                </View>
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
    borderWidth: 1,
    marginVertical: 10, 
    marginHorizontal: 10, 
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
export default SoldBunldeItem;