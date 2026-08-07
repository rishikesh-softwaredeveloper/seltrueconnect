import React,{useState} from "react";
import { View, Text, StyleSheet, ActivityIndicator, Dimensions} from "react-native";
import CheckBoxComponent from "./CheckBoxComponent";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const TaggedVendorListItem = (vendorListItem) => { 
    const [spinner, setSpinner] = useState(false)

    const navigation = useNavigation();
    
    const TaggedDealers = (item) => {
        navigation.navigate('TaggedItemScreen', { "salesPersonId": item })
    }
    for (var keys in vendorListItem) {
        return (
            <View style={styles.container}>
                {
                    spinner ? (
                    <View style={{minHeight:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator size='large' color="#999999" />
                    </View>
                    ):
                    <View style={styles.sub_container}>
                        <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 10,paddingBottom:5, borderRadius: 0, width: '100%' }}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{ paddingBottom: 0 }}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{paddingBottom:5,width:"30%",fontWeight:'bold',color:'#000'}}>Name:</Text>
                                        <Text style={{paddingBottom:5,color:'#000'}}>{vendorListItem[keys].name} </Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{paddingBottom:5,width:"30%",fontWeight:'bold',color:'#000'}}>Code:</Text>
                                        <Text style={{paddingBottom:5,color:'#000'}}>{vendorListItem[keys].vendor_code} </Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{paddingBottom:5,width:"30%",fontWeight:'bold',color:'#000'}}>Mobile:</Text>
                                        <Text style={{paddingBottom:5,color:'#000'}}>{vendorListItem[keys].mobile} </Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center',marginLeft:10}}>
                                    <IconButton
                                        icon="chevron-right"
                                        size={30}
                                        color="gray"
                                        onPress={() => TaggedDealers(vendorListItem[keys].vendor_id)}
                                    />
                                </View>
                            </View>
                            
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
export default TaggedVendorListItem;