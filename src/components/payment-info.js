import React from "react";
import { View, Text, StyleSheet} from "react-native";

const PaymentInfo = (paymentItem) => {
    for (var keys in paymentItem) {
    
        return (
            <View  style={styles.container}>
                <View style={styles.sub_container}>
                    <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 10, borderRadius: 0,width:'90%' }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', paddingBottom: 10 }}>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif' }}>Payment Reference</Text>
                            <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif' }}>{paymentItem[keys].payment_reference}</Text>
                        </View>
                        <View>
                            <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: '600', color: "#000",fontSize:16,fontFamily:'serif'}}>Payment Mode</Text>
                                <Text style={{ fontWeight: '600', color: "#000",fontSize:16,fontFamily:'serif'}}>{paymentItem[keys].receipt_no}</Text>
                            </View>
                            <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif' }}>Amount</Text>
                                <Text numberOfLines={2} style={{ fontWeight: '600', color: "#000",fontSize:14,fontFamily:'serif' }}>&#8377;{paymentItem[keys].amount_paid}/-</Text>
                            </View>
                            <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: '600', color: "#000",fontSize:16,fontFamily:'serif'}}>Paid On</Text>
                                <Text style={{ fontWeight: '600', color: "#000",fontSize:16,fontFamily:'serif'}}>{paymentItem[keys].payment_date}</Text>
                            </View>
                            <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: '600', color: "#000",fontSize:16,fontFamily:'serif'}}>{paymentItem[keys].salesorder_no}</Text>
                                <Text style={{ fontWeight: '600', color: "#DD2A05",fontSize:16,fontFamily:'serif'}}>{(paymentItem[keys].status == 'INVOICED')?paymentItem[keys].status:"PENDING"}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };
};


const styles = StyleSheet.create({
container:{
    borderWidth: 0, 
    marginVertical: 10, 
    marginHorizontal:10,
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
    padding:0

},
sub_container:{ 
    flexDirection: 'row', 
    padding: 0,
    marginVertical:0,
    justifyContent:'space-evenly'
}

});
export default PaymentInfo;