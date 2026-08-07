import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { Image } from 'react-native-elements';


const OrderInfo = (bundleItem) => {

    const navigation = useNavigation();
    
    const bundleDetails = (item) => {
        navigation.navigate('BundleOrderListScreen', { "bundleItem": item })
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
                                <View style={{ paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: '600', color: "#000",fontSize:12,fontFamily:'serif',marginLeft:10 }}>{bundleItem[keys].category}</Text>
                                </View>
                                <View style={{ paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: '600', color: "#000",fontSize:12,fontFamily:'serif',marginLeft:10 }}>{bundleItem[keys].grade_qnty}</Text>
                                </View>
                                <View style={{ paddingBottom: 0, flexDirection: 'row', justifyContent:'flex-start' }}>
                                    <Text style={{ fontWeight: '500',color: "#8F8C8B" ,textDecorationLine: 'line-through',fontSize:14,marginLeft:10,fontFamily:'serif'}}>&#8377; {bundleItem[keys].mop}</Text>
                                    <Text style={{ fontWeight: 'bold', color: "#DD2A05",fontSize:14,fontFamily:'serif' }}>   {bundleItem[keys].amount}/-</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ margin: 0, padding: 0, borderStartWidth: 0, borderColor: "#CCC", justifyContent: 'center', width: "20%" }}>
                            <View style={{ alignItems: 'center', marginLeft: 20}}>
                                <View style={{ borderColor: "#ffe6e6", backgroundColor: "#ffe6e6", borderRadius: 25, borderWidth: 1, height: 30, width: 40, justifyContent: 'center' }}>
                                    <Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 9, fontWeight: '700',fontFamily:'serif' }}>{bundleItem[keys].quantity+"N"}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center',marginTop:20,marginLeft:20 }}>
                                <View style={{ borderColor: "#ccddff", backgroundColor: "#ccddff", borderRadius: 25, borderWidth: 1, height: 30, width: 40, justifyContent: 'center' }}>
                                    <Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 9, fontWeight: '700',fontFamily:'serif' }}>{bundleItem[keys].type}</Text>
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
export default OrderInfo;