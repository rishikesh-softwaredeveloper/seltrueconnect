import React, { useEffect, useState} from "react";
import {View,Text, FlatList, BackHandler, Alert, RefreshControl, ActivityIndicator } from "react-native";
import { Searchbar } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { GetDeviceListStockType } from "../../services/bundle-services/get-openbox-item-list";
import SeltrueBoxItem from "../../components/seltrue-box-item";

const SeltrueBoxScreen = () => {
  const seltruebox = useSelector((state) => state.seltruebox[0]);
  const dealer = useSelector((state) => state.dealer);
  const token = useSelector((state) => state.token[0]);
  const masterSeltrueDataSource = useSelector((state) => state.masterseltruebox[0]);

  const [refreshing, setRefreshing] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [searchSeltrue, setSearchSeltrue] = useState('');

  const [on, setOn] = useState(true);

  const dispatch = useDispatch();
  const { 
    initSeltrueBox,
    initMasterSeltrueBox, 
    clearSeltrueBox,
    clearMasterSeltrueBox 
  } = bindActionCreators(actionCreators,dispatch);

  const searchSeltrueFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterSeltrueDataSource.filter(
        function (item) {
          const itemData = item.device_name
            ? item.device_name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData)
      clearSeltrueBox();
      initSeltrueBox(newData);
      setSearchSeltrue(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      // setFilteredDataSource(masterDataSource);
      clearSeltrueBox();
      initSeltrueBox(masterSeltrueDataSource);
      setSearchSeltrue(text);
    }
  };


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setOn(true);
    clearSeltrueBox();
    clearMasterSeltrueBox();
    GetDeviceListStockType({"stock_type": "PREXO","vendor_id":dealer[0].vendor_id},token).then((Res) => {
      console.log(Res);
      if (Res["status"] == 1) {
        initSeltrueBox((Res.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)));
        initMasterSeltrueBox((Res.data).sort((a,b)=>a.device_id.localeCompare(b.device_id)));
      }
    }).then(() => setRefreshing(false));
  }, []);

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
          seltruebox.length !== 0 ?(<>
            <Searchbar 
              value={searchSeltrue}
              style={{marginTop:40,width:"90%",marginBottom:5}}
              onChangeText={(text) => searchSeltrueFilterFunction(text)}
              placeholder="Search Seltrue"
            />
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={seltruebox}
            renderItem={({ item }) => (<SeltrueBoxItem seltrueBoxItem={item} />)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
          />
          </>
          ):(<Text style={{textAlign:'center',justifyContent:'center',marginTop:'60%',color:'#999993'}}>No Records Found!</Text>) )
      }
    </View>
  );
};

export default SeltrueBoxScreen;
