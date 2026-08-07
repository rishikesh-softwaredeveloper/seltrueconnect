import React, { useState,useEffect } from 'react';
import { StyleSheet, View, ToastAndroid, Platform, AlertIOS,BackHandler } from 'react-native';
import { Button, ThemeProvider, SearchBar } from 'react-native-elements';
import { PostSearchById } from '../../services/login-services/post-search-by-id';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState(null);
  const [searchParam, setsearchParam] = useState({});

  const dispatch = useDispatch()
  const { 
    addPan,
    addAadhar,
    addGstin,
    removePan,
    removeAadhar,
    removeGstin 
  } = bindActionCreators(actionCreators, dispatch)

  const customerValidation = () => {
    removePan();
    removeAadhar();
    removeGstin();

    if(search.length == 10){
      addPan(search);
    }

    if(search.length == 12){
      addAadhar(search);
    }

    if(search.length == 15){
      addGstin(search);
    }

    if (search == '' || search == undefined) {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity('PLEASE PROVIDE SEARCH INPUT', ToastAndroid.LONG, ToastAndroid.BOTTOM)
        return false
      } else {
        AlertIOS.alert('PLEASE PROVIDE SEARCH INPUT');
        return false
      }
    }

    const userdata = {
      "search_by": search
    }

    PostSearchById(userdata).then((Response) => {
      let found = false;
      if (Response.status == 1) {
        if (Response.data != '') {
          for (item in Response.data) {
            if (Response.data[item].dealer_app == "Y") {
              navigation.navigate('LoginScreen');
              found = true;
              break;
            }
          }
          if (found == false)
            navigation.navigate('VendorListScreen', { "response_data": Response.data });
        } 
      } else if (Response.status == 0) {
        navigation.navigate('RegistrationScreen');
      }
    }).catch((error) => {
    })
    setsearchParam(searchParam);
  }

  const handleBackButtonClick = () => {
    navigation.navigate('RegNavigationScreen');
    return true;
  }

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );

    return () => {
      subscription.remove();
    };
  }, []);


  return (
    <ThemeProvider>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.buttonsContainer}></View>
        <SearchBar
          containerStyle={styles.searchbarstyle}
          inputContainerStyle={{ backgroundColor: 'white' }}
          inputStyle={{fontFamily:'serif'}}
          placeholder={'Search Your PAN'}
          value={search}
          onChangeText={setSearch}
        />
        <Button
          title="Search"
          buttonStyle={{
            backgroundColor: '#1194f6',
            borderRadius: 5
          }}
          titleStyle={{ fontWeight: 'bold', fontSize: 23,fontFamily:'serif' }}
          icon={{
            name: 'search',
            type: 'font-awesome',
            size: 15,
            color: 'white'
          }}
          iconContainerStyle={{ marginRight: 10 }}
          containerStyle={styles.buttonstyles}
          onPress={customerValidation}
        />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  contentView: {
    flex: 1
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10
  },
  buttonstyles: {
    marginHorizontal: 50,
    marginVertical: "-15%",
    height: 50,
    width: "80%"
  },
  searchbarstyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: "25%",
    height: 60,
    width: "80%",
  }
});

export default SearchScreen;
