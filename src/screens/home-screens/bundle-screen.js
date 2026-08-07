import React, { useEffect, useState, useRef } from "react";
import {View, FlatList, BackHandler, Alert, RefreshControl, ActivityIndicator} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { GetBundleList } from "../../services/bundle-services/get-bundles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import BundleItem from "../../components/bundle-item";

const BundleScreen = () => {
  const dispatch = useDispatch();

  const bundle = useSelector((state) => state.bundle[0]);
  const types = useSelector((state) => state.types);
  const dealer = useSelector((state) => state.dealer);
  const token = useSelector((state) => state.token[0]);
  const searchCategory = useSelector((state) => state.searchCategory);
   
  
  const categories = ["PREXO"];
  const [refreshing, setRefreshing] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const typeuseRef = useRef();
  const categoryuseRef = useRef();

  const { 
    initBundle, 
    clearBundle,
    initSearchType,
    clearSearchType,
    initSearchCategory,
    clearSearchCategory,
  } = bindActionCreators(actionCreators,dispatch);

  const searchBar = (search) => {
    const category = search.category;
    const type = search.type;
  
    if (category == "") {
      setSpinner(true);
      clearBundle();
      GetBundleList(dealer[0].vendor_id,token).then((Res) => {

        if (Res["status"] == 1) {
          initBundle((Res.data).filter((item) => item.type == type));
          setSpinner(false);
        }

      });
    }else if (type == "") {
      setSpinner(true);
      clearBundle();
      GetBundleList(dealer[0].vendor_id,token).then((Res) => {
        
        if (Res["status"] == 1) {
          initBundle((Res.data).filter((item) => item.category == category));
          setSpinner(false);
        }

      });
    }else{
      setSpinner(true);
      clearBundle();
      GetBundleList(dealer[0].vendor_id,token).then((Res) => {
       
        if (Res["status"] == 1) {
            initBundle((Res.data).filter((item) => item.category == category && item.type == type).sort((a,b)=>a.bundle_no.localeCompare(b.bundle_no)));
            setSpinner(false);
        }
        
      });
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    clearBundle();
    GetBundleList(dealer[0].vendor_id,token).then((Res) => {
      if (Res["status"] == 1) {
        initBundle((Res.data).sort((a,b)=>a.bundle_no.localeCompare(b.bundle_no)));
        typeuseRef.current.reset();
        categoryuseRef.current.reset();
      }
    }).then(()=>{
      setRefreshing(false);
    });
  }, []).bind(this)

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
    return () => backHandler.remove();
  }, [backHandler]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row",width: '100%',padding:6,paddingLeft:10,paddingRight:10,paddingBottom:3,borderBottomWidth:0,borderColor: "#CCC"}}>
        <SelectDropdown
          ref={categoryuseRef}
          data={categories}
          onSelect={(selectedItem, index) => {
            typeuseRef.current.reset();
            clearSearchCategory();
            initSearchCategory(selectedItem);
            searchBar({ category: selectedItem, type: "" });
          }}
          defaultButtonText="PREXO"
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={{flex: 1,height: 35,borderRadius:15}}
          buttonTextStyle={{fontSize:14,fontFamily:'serif'}}
          rowTextStyle ={{fontSize:14,fontFamily:'serif'}}
          disabled ={true}
        />
        <View style={{width:15}}/>
        <SelectDropdown
          ref={typeuseRef}
          data={types}
          onSelect={(selectedItem, index) => {
            clearSearchType();
            initSearchType(selectedItem.bundle_type);
            searchBar({ category: searchCategory, type: selectedItem.bundle_type });
          }}
          defaultButtonText="Type"
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.bundle_type +" "+ selectedItem.brand;
          }}
          rowTextForSelection={(item, index) => {
            return item.bundle_type +" "+item.brand;
          }}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444"}
                size={14}
              />
            );
          }}
          buttonStyle={{flex: 1,height: 35,borderRadius:15}}
          buttonTextStyle={{fontSize:14,fontFamily:'serif'}}
          rowTextStyle ={{fontSize:14,fontFamily:'serif'}}
        />
        <View style={{width:15}}/>
        {/* <View style={{marginTop:0}}>
          <Icon
            name='refresh'
            type='material-community'
            color='#517fa4'
            size={30}
            onPress={onRefresh}
          />
        </View> */}
      </View>
      {
        spinner ? (
            <View style={{minHeight:'90%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size='large' color="#999999" />
            </View>
        ):(
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={bundle}
            renderItem={({ item }) => (<BundleItem bundleItem={item} />)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
          />
        )
      }
    </View>
  );
};

export default BundleScreen;
