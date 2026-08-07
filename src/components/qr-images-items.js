import React,{useState} from "react";
import { View, Text, StyleSheet, ActivityIndicator, Dimensions} from "react-native";
import Modal from 'react-native-modal';
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { TouchableOpacity } from "react-native";
import { PostUpdateQrImage } from "../services/bundle-services/post-update-qr-image";
import { GetQrImageList } from "../services/bundle-services/get-qr-image-list";

const { width,height } = Dimensions.get("screen");

const QrImageItem = (qrImageItem) => { 
    const navigation = useNavigation();
    const [spinner, setSpinner] = useState(false)
    
    const token = useSelector((state)=>state.token[0]);
    const dealer = useSelector((state)=>state.dealer);

    const dispatch = useDispatch();
    const { 
        clearQrImage,
        initQrImage,
    } = bindActionCreators(actionCreators, dispatch);
    const [isVisible, setisVisible] = useState(false);
    const types = ["ACTIVE", "IN-ACTIVE"];

    for (var keys in qrImageItem) {
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
                                <TouchableOpacity style={{ paddingBottom: 0 }} onPress={()=>setisVisible(true)}>
                                    <Text style={{ 
                                        color: "#000", 
                                        fontWeight: '500',
                                        fontFamily:'serif',
                                        fontSize:14,
                                        textTransform:'capitalize',
                                        paddingBottom:5}}
                                    >IMAGE NAME: {qrImageItem[keys].image_name}</Text>
                                    {qrImageItem[keys].status == 'Y' ?
                                        <Text style={{paddingBottom:5}}>{qrImageItem[keys].status == 'Y' ? 'Primary Account' : '' } </Text> 
                                        :<></>
                                    }
                                    <Text style={{paddingBottom:5}}>STATUS: {qrImageItem[keys].status} </Text>
                                    <Text style={{paddingBottom:5}}>LAST UPDATED: {qrImageItem[keys].last_updated}</Text>
                                    <Text style={{paddingBottom:5}}>UPI ID: {qrImageItem[keys].upi_id}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }

                    <Modal
                        isVisible={isVisible}
                        animationIn='fadeIn'
                        animationOut='fadeOut'
                        style={{ justifyContent: 'center', alignItems: 'center',padding:0,margin:0 }}
                    >
                        <View style={{ backgroundColor:'#ffffff', width:width-60,borderRadius:5}}>
                            <View style={{backgroundColor:'#dddddd',padding:10,margin:0,borderTopLeftRadius:5,borderTopRightRadius:5}}>
                                <Text style={{ color:'#333333',fontWeight:'700'}}>UPDATE ACCOUNT</Text>
                            </View>
                            <View style={{padding:40,width:"90%"}}>
                                
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20,alignItems:'center'}}>
                                    <Text style={{color:'#000',fontWeight:'bold'}}>Update Status :</Text>
                                    <View style={{}}>
                                        <SelectDropdown
                                            data={types}
                                            onSelect={(selectedItem, index) => {
                                                const Reqdata={
                                                    "vendor_id" :dealer[0].vendor_id,
                                                    "qr_id" : qrImageItem?.qrImageItem?.qr_id,
                                                    "status" : selectedItem == 'ACTIVE'?'Y':'N'
                                                }
                                                PostUpdateQrImage(Reqdata,token).then((Res)=>{
                                                    if(Res?.status == 1){
                                                        GetQrImageList(token,dealer[0].vendor_id).then((resQR)=>{
                                                            if(resQR['status'] == 1){
                                                                clearQrImage()
                                                                initQrImage(resQR['data'])
                                                            }
                                                        })
                                                        // navigation.goBack()
                                                    }
                                                })
                                                
                                            }}
                                            defaultButtonText={qrImageItem?.qrImageItem?.status == 'Y' ? 'ACTIVE':'INACTIVE'}
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
export default QrImageItem;