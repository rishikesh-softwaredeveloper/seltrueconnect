import React, { useEffect } from "react";
import { View, Text, FlatList, BackHandler, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BankAccountItem from "../../components/bankAccount-items";
import { GetBankAccounts } from "../../services/bundle-services/get-bank-accounts";

const BankDetails = () => {
    const bankAccounts = useSelector((state) => state.bankAccounts[0]);
    const navigation = useNavigation();

    const dealer = useSelector((state)=>state.dealer);
    const token = useSelector((state) => state.token[0]);

    const dispatch = useDispatch()
    const { 
      clearBankAccounts, 
      initBankAccounts, 
    } = bindActionCreators(actionCreators, dispatch)
    
    const previous = () => {
      navigation.goBack();
      return true;
    }

    const handleBackButtonClick = () => {
      navigation.goBack();
      return true;
    }

    useEffect(()=>{
      GetBankAccounts(token,dealer[0].vendor_id).then((resBank)=>{
        if(resBank['status'] == 1){
          clearBankAccounts()
          initBankAccounts(resBank['data'])
        }
      })
    },[])
    
    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
      };
    }, []);

    const add = () => {
      navigation.navigate("AddBankScreen");
    };

    return( 
      <View style={{flex:1}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:0,paddingBottom:10,marginTop:36,padding:20,backgroundColor:'#1194f6'}}>
          <TouchableOpacity style={{marginLeft:1}} onPress={previous}>
            <MaterialCommunityIcons name="arrow-left" color={'#ffff'} size={25} />
          </TouchableOpacity>
          <Text style={{ textAlign: 'left',fontSize: 18,color:'#ffff',fontFamily:'serif',justifyContent:'center' }}>Bank Accounts</Text>
          <TouchableOpacity style={{marginLeft:20}} onPress={add} >
            <MaterialCommunityIcons name="plus-circle-outline" color={"#ffff"} size={30} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={bankAccounts}
          renderItem={({ item }) => (<BankAccountItem bankAccountItem={item} />)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    )
};

export default BankDetails;