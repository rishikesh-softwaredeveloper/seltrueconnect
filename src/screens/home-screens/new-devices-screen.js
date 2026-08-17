import React, { useEffect, useState} from "react";
import {View, Text, FlatList, BackHandler, Alert, RefreshControl, ActivityIndicator } from "react-native";
import { Searchbar } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { GetDeviceListStockType } from "../../services/bundle-services/get-openbox-item-list";
import NewDevicesItem from "../../components/new_devices-item";

const NewDevicesScreen = () => {
  const newDevices = useSelector((state) => state.newdevices[0]);
  const dealer = useSelector((state) => state.dealer);
  const masterDataSource = useSelector((state) => state.masternewdevices[0]);
  const token = useSelector((state) => state.token[0]);
  const [search, setSearch] = useState('');

  
  const [refreshing, setRefreshing] = useState(false);
  const [spinner, setSpinner] = useState(false)
  const [on, setOn] = useState(true);

  const dispatch = useDispatch();
  const { 
    initNewDevices,
    initMasterNewDevices, 
    clearNewDevices,
    clearMasterNewDevices 
  } = bindActionCreators(actionCreators,dispatch);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setOn(true);
    clearNewDevices();
    clearMasterNewDevices();
    
    GetDeviceListStockType({"stock_type": "NEW","vendor_id":dealer[0].vendor_id},token).then((Res) => {
      if (Res["status"] == 1) {
        initNewDevices((Res.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)));
        initMasterNewDevices((Res.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)));
      }
    }).then(() => setRefreshing(false));
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.device_name
            ? item.device_name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData)
      clearNewDevices();
      initNewDevices(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      // setFilteredDataSource(masterDataSource);
      clearNewDevices();
      initNewDevices(masterDataSource);
      setSearch(text);
    }
  };

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to Exit App?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  let backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  useEffect(() => {
    backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [backHandler]);


  return (
    <View style={{ flex: 1 }}>
      {
        spinner ? (
          <View style={{minHeight:'90%',display:'flex',justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator size='large' color="#999999" />
          </View>
        ):(
          // openbox.length !== 0 ?
          (<>
            <Searchbar 
              value={search}
              style={{marginTop:10,width:"100%",marginBottom:0}}
              onChangeText={(text) => searchFilterFunction(text)}
              placeholder="Search new devices"
            />
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={newDevices}
              renderItem={({ item }) => (<NewDevicesItem newDeviceItem={item} />)}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item + index}
            />
          </>
          )
          // :(<Text style={{textAlign:'center',justifyContent:'center',marginTop:'60%',color:'#999993'}}>No Records Found!</Text>) 
          )
      }
    </View>
  );
};

export default NewDevicesScreen;
