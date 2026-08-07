import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const VendorListScreen = ({ route }) => {
  const navigation = useNavigation();
  const [vendorParam, setVendorParam] = useState({});
  const [customers, setCustomers] = useState([]);

  const { response_data } = route.params;

  useEffect(() => {
    setCustomers(response_data);
  }, [])

  const review = (e) => {
    let vendorParam = {
      "vendor_id": e.vendor_id,
      "vendor_code": e.vendor_code,
      "name": e.name,
      "company": e.company,
      "mobile": e.mobile,
      "gst_no": e.gst_no,
      "gst_no": e.city,
    }
    setVendorParam(vendorParam);
    navigation.navigate('SendOtpScreen', {"vendorParam":vendorParam});
  }
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#bde0ff' }}>
      <FlatList
        data={customers}
        renderItem={({ item }) =>
          <Card containerStyle={{ borderRadius: 25 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ backgroundColor: generateColor(), height: 10, width: 10, borderRadius: 10, marginVertical: 4 }}>
              </View>
              <Card.Title numberOfLines={2} style={{ fontWeight: 'bold' }}>{item.company.toUpperCase()}</Card.Title>
            </View>
            <Card.Divider />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ marginBottom: 10 }}>{item.name.toUpperCase()}</Text>
              <Text style={{ marginBottom: 10 }}>{item.gst_no.toUpperCase()}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ marginBottom: 10 }}>{item.city.toUpperCase()}</Text>
              <Text style={{ marginBottom: 10 }}>{item.vendor_code.toUpperCase()}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Button
                buttonStyle={{ borderRadius: 10, backgroundColor: '#4d79ff' }}
                title={<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>SELECT</Text>}
                onPress={() => review({
                  vendor_id: item.vendor_id,
                  vendor_code: item.vendor_code,
                  name: item.name,
                  company: item.company,
                  mobile: item.mobile,
                  gst_no: item.gst_no
                })} />
            </View>
          </Card>
        }
        keyExtractor={item => item.vendor_id}
      />
    </View>
  )
}

export default VendorListScreen;