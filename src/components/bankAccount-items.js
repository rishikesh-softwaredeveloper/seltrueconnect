import React,{useState} from "react";
import { View, Text, StyleSheet, ActivityIndicator, Dimensions} from "react-native";
import { IconButton } from "react-native-paper";
import { CheckBox } from "react-native-elements";
import Modal from 'react-native-modal';
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { PostDeleteShippingAddress } from "../services/bundle-services/post-delete-shipping-address";
import { GetShippingAddress } from "../services/bundle-services/get-shipping-address";
import { TouchableOpacity } from "react-native";
import { PostUpdateBankAccountStatus } from "../services/bundle-services/post-update-bankAccount-status";
import { GetBankAccounts } from "../services/bundle-services/get-bank-accounts";

const { width,height } = Dimensions.get("screen");

const BankAccountItem = (bankAccountItem) => { 
    const navigation = useNavigation();
    const [spinner, setSpinner] = useState(false)
    
    const token = useSelector((state)=>state.token[0]);
    const dealer = useSelector((state)=>state.dealer);

    const dispatch = useDispatch();
    const { 
        clearBankAccounts,
        initBankAccounts,
    } = bindActionCreators(actionCreators, dispatch);
    const [isVisible, setisVisible] = useState(false);
    const types = ["ACTIVE", "IN-ACTIVE"];

    for (var keys in bankAccountItem) {
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
                                    >ACC NO: {bankAccountItem[keys].account_no.toUpperCase()}</Text>
                                    {bankAccountItem[keys].active == 'Y' ?
                                        <Text style={{paddingBottom:5,color:'#000'}}>{bankAccountItem[keys].active == 'Y' ? 'Primary Account' : '' } </Text> 
                                        :<></>
                                    }
                                    <Text style={{paddingBottom:5,color:'#000'}}>IFSC CODE: {bankAccountItem[keys].ifsc_code} </Text>
                                    <Text style={{paddingBottom:5,color:'#000'}}>BANK: {bankAccountItem[keys].bank_name}</Text>
                                    <Text style={{paddingBottom:5,color:'#000'}}>BRANCH: {bankAccountItem[keys].branch}</Text>
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
                                                    "vendor_id" :bankAccountItem?.bankAccountItem?.vendor_id,
                                                    "account_id" : bankAccountItem?.bankAccountItem?.account_id,
                                                    "active" : selectedItem == 'ACTIVE'?'Y':'N'
                                                }
                                                PostUpdateBankAccountStatus(Reqdata,token).then((Res)=>{
                                                    if(Res?.status == 1){
                                                        GetBankAccounts(token,dealer[0].vendor_id).then((resBank)=>{
                                                            if(resBank['status'] == 1){
                                                                clearBankAccounts()
                                                                initBankAccounts(resBank['data'])
                                                            }
                                                        })
                                                        // navigation.goBack()
                                                    }
                                                })
                                                
                                            }}
                                            defaultButtonText={bankAccountItem?.bankAccountItem?.active == 'Y' ? 'ACTIVE':'INACTIVE'}
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
export default BankAccountItem;