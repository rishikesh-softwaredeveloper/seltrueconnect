import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, BackHandler } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import pincodes from '../../data/pincode.js';
import Input from '../../containers/text-input';
import * as FieldValidator from '../../helpers/fieldValidator';
import { useSelector } from 'react-redux';
import { GetSalesRepresentatives } from "../../services/bundle-services/post-get-salesRepresentative.js";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { white } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors.js";
import { Text } from "react-native-elements";

function RegistrationScreen() {
    const navigation = useNavigation();
    const pan_card = useSelector((state)=>state.pan);
    const upi_id = useSelector((state)=>state.upi);
    const gstin_no = useSelector((state)=>state.gstin);
    const aadhar_no = useSelector((state)=>state.aadhar);
    const token = useSelector((state)=>state.token[0]);


    const [company, setcompany] = useState({ value: '', error: '' });
    const [first_name, setfirstname] = useState({ value: '', error: '' });
    const [last_name, setlastname] = useState({ value: '', error: '' });
    const [state, setstate] = useState({ value: '', error: '' });
    const [city, setcity] = useState({ value: '', error: '' });
    const [area, setarea] = useState({ value: '', error: '' });
    const [pan, setpan] = useState({ value: pan_card[0], error: '' });
    const [upiid, setupiid] = useState({ value: upi_id[0], error: '' });
    const [aadhar, setaadhar] = useState({ value: aadhar_no[0], error: '' });
    const [gstin, setgstin] = useState({ value: gstin_no[0], error: '' });
    const [pincode, setpincode] = useState({ value: '', error: '' });
    const [registerParams, setregisterParams] = useState({});
    const [salesRepresentative, setSalesRepresentative] = useState();
    const [salesRepresentative_userId,setSalesRepresentative_userId] = useState(0);
    const [errors, setErrors] = useState(false);

    const ItemRef = useRef();

    
    const nextoptions = () => {
        let gstin_error ='';
        let aadhar_error ='';
        let upi_error ='';

        if(gstin.value == undefined){
            gstin.value = '';
        }

        if(aadhar.value == undefined){
            aadhar.value = '';
        }

        if(upiid.value == undefined){
            upiid.value = '';
        }

        if(gstin.value !=''){
            gstin_error = FieldValidator.gstinValidator(gstin.value, 'Gstin');
        }

        if(upiid.value !=='' || upiid.value == undefined){
            upi_error = FieldValidator.upiValidation(upiid.value, 'UPI');
            // console.log(upi_error,'registerParams');
        }

        if(aadhar.value !=='' || aadhar.value == undefined){
            aadhar_error = FieldValidator.aadharnoValidator(aadhar.value, 'Aadhar');
        }
        
        const pan_error = FieldValidator.panValidator(pan.value, 'pan');
        // const upi_error = FieldValidator.upiValidation(upiid.value,'Upi_ID');

        try {
            if (gstin_error.length > 0 || pan_error.length > 0 || aadhar_error.length > 0 || upi_error.length > 0 ) {
                setgstin({ ...gstin, 'error': gstin_error });
                setpan({ ...pan, 'error': pan_error });
                setupiid({ ...upiid, 'error': upi_error });
                setaadhar({ ...aadhar, 'error': aadhar_error });
                setErrors(true);
            }
            else {
                setgstin({ ...gstin, 'error': '' });
                setpan({ ...pan, 'error': '' });
                setupiid({ ...upiid, 'error': '' });
                setaadhar({ ...aadhar, 'error': '' });
                setErrors(false);

                let registerParams = {
                    "company": company.value,
                    "name": first_name.value + ' ' + last_name.value,
                    "state": state.value,
                    "postal_code": pincode.value,
                    "city": city.value,
                    "address": area.value,
                    "pan": pan.value,
                    "upi_id":upiid.value,
                    "aadar": aadhar.value,
                    "gstin": gstin.value,
                    "sales_representative":salesRepresentative_userId,
                    "register": "register"
                }
                console.log(registerParams,'registerParams');
                setregisterParams(registerParams);
                navigation.navigate('SendOtpAfterRegScreen', registerParams);
            }
        } catch (error) {
        }

    }

    const valid_1 = () => {
        const company_error = FieldValidator.addressValidator(company.value, 'Company')
        try {
            if (company_error.length > 0) {
                setcompany({ ...company, 'error': company_error });
                setErrors(true);
            }
            else {
                setcompany({ ...company, 'error': '' });
                setErrors(false);
            }
        } catch (error) {
        }
    }

    const valid_2 = () => {
        const firstName_error = FieldValidator.nameValidator(first_name.value, 'First Name')
        const lastName_error = FieldValidator.nameValidator(last_name.value, 'Last Name')

        try {
            if (firstName_error.length > 0 || lastName_error.length > 0) {
                setfirstname({ ...first_name, 'error': firstName_error });
                setlastname({ ...last_name, 'error': lastName_error });
                setErrors(true);
            }
            else {
                setfirstname({ ...first_name, 'error': '' });
                setlastname({ ...last_name, 'error': '' });
                setErrors(false);
            }
        } catch (error) {
        }
    }

    const valid_3 = () => {
        const pincode_error = FieldValidator.pincodeValidator(pincode.value, 'Pin Code')
        const state_error = FieldValidator.addressValidator(state.value, 'State')
        const city_error = FieldValidator.addressValidator(city.value, 'City')

        try {
            if (pincode_error.length > 0 || state_error.length > 0 || city_error.length > 0 ) {
                setpincode({ ...pincode, 'error': pincode_error });
                setstate({ ...state, 'error': state_error });
                setcity({ ...city, 'error': city_error });
                setErrors(true);
            }
            else {
                setpincode({ ...pincode, 'error': '' });
                setstate({ ...state, 'error': '' });
                setcity({ ...city, 'error': '' });
                setErrors(false);
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        setcity({ "value": "", "error": "" });
        setstate({ "value": "", "error": "" });
        setarea({ "value": "", "error": "" });
        
        if (pincode.value.length == 6) {
            let pincodeData = pincodes.filter(item => item.pincode == pincode.value);
            if (pincodeData.length > 0) {
                setcity({ "value": pincodeData[0].district, "error": "" });
                setstate({ "value": pincodeData[0].state_name, "error": "" });
                setarea({ "value": pincodeData[0].city, "error": "" });
            }
        }
    }, [pincode])

    useEffect(() => {
        GetSalesRepresentatives(token).then((res)=>{
            if(res.status == 1){
                setSalesRepresentative(res.data)
            }
          })
    }, [])


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
        <ScrollView>
            <View style={{ flex: 1 }}>
                <ProgressSteps>
                    <ProgressStep nextBtnTextStyle={styles.text} nextBtnStyle={styles.button} onNext={valid_1} errors={errors}>
                        <View style={{ alignItems: 'center', marginVertical: '10%' }}>
                            <Input
                                label='Company'
                                placeholder='COMPANY'
                                style={styles.input}
                                onChangeText={(text) => setcompany({ 'value': text, error: '' })}
                                value={company.value}
                                error={!!company.error}
                                errorText={company.error}
                            />
                        </View>
                    </ProgressStep>
                    <ProgressStep previousBtnTextStyle={styles.text} previousBtnStyle={styles.prebutton} nextBtnTextStyle={styles.text} nextBtnStyle={styles.button} onNext={valid_2} errors={errors}>
                        <View style={{ alignItems: 'center', marginVertical: '10%' }}>
                            <Input
                                label='First Name'
                                placeholder='FIRST NAME'
                                style={styles.input}
                                onChangeText={(text) => setfirstname({ 'value': text, error: '' })}
                                value={first_name.value}
                                error={!!first_name.error}
                                errorText={first_name.error}
                            />
                            <Input
                                label='Last Name'
                                placeholder='LAST NAME'
                                style={styles.input}
                                onChangeText={(text) => setlastname({ 'value': text, error: '' })}
                                value={last_name.value}
                                error={!!last_name.error}
                                errorText={last_name.error}
                            />
                        </View>
                    </ProgressStep>
                    <ProgressStep previousBtnTextStyle={styles.text} previousBtnStyle={styles.prebutton} nextBtnTextStyle={styles.text} nextBtnStyle={styles.button} onNext={valid_3} errors={errors}>
                        <View style={{ alignItems: 'center', marginVertical: '10%' }}>
                            <Input
                                label='Pin Code'
                                maxLength={6}
                                placeholder='ENTER PIN CODE'
                                style={styles.input}
                                keyboardType='number-pad'
                                onChangeText={(text) => setpincode({ 'value': text, error: '' })}
                                value={pincode.value}
                                error={!!pincode.error}
                                errorText={pincode.error}
                            />
                            <Input
                                label='State'
                                placeholder='STATE'
                                style={styles.input}
                                onChangeText={(text) => setstate({ 'value': text, error: '' })}
                                value={state.value}
                                error={!!state.error}
                                errorText={state.error}
                            // editable = {false}
                            />
                            <Input
                                label='City'
                                placeholder='CITY'
                                style={styles.input}
                                onChangeText={(text) => setcity({ 'value': text, error: '' })}
                                value={city.value}
                                error={!!city.error}
                                errorText={city.error}
                            />
                            <Input
                                label='Area'
                                placeholder='AREA'
                                style={styles.input}
                                onChangeText={(text) => setarea({ 'value': text, error: '' })}
                                value={area.value}
                                error={!!area.error}
                                errorText={area.error}
                            />
                        </View>
                    </ProgressStep>
                    <ProgressStep previousBtnTextStyle={styles.text} previousBtnStyle={styles.prebutton} nextBtnTextStyle={styles.text} nextBtnStyle={styles.button} errors={errors} onSubmit={nextoptions}>
                        <View style={{ alignItems: 'center', marginVertical: '10%' }}>
                            <Input
                                label='Pan'
                                placeholder='PAN*'
                                style={styles.input}
                                maxLength={10}
                                onChangeText={(text) => setpan({ 'value': text, error: '' })}
                                value={pan.value}
                                error={!!pan.error}
                                errorText={pan.error}
                            />
                            <Input
                                label='UPI ID'
                                placeholder='UPIID (Optional)'
                                style={styles.input}
                                onChangeText={(text) => setupiid({ 'value': text, error: '' })}
                                value={upiid.value}
                                error={!!upiid.error}
                                errorText={upiid.error}
                            />
                            <Input
                                label='Gstin'
                                placeholder='GSTIN (Optional)'
                                style={styles.input}
                                maxLength={15}
                                onChangeText={(text) => setgstin({ 'value': text, error: '' })}
                                value={gstin.value}
                                error={!!gstin.error}
                                errorText={gstin.error}
                            />
                            <Input
                                label='Aadhar'
                                placeholder='AADHAR (Optional)'
                                style={styles.input}
                                maxLength={12}
                                onChangeText={(text) => setaadhar({ 'value': text, error: '' })}
                                value={aadhar.value}
                                error={!!aadhar.error}
                                errorText={aadhar.error}
                            />
                            <SelectDropdown
                                // ref={ItemRef}
                                defaultButtonText="Sales Representative (Optional)"
                                data={salesRepresentative}
                                onSelect={(selectedItem, index) => {
                                    setSalesRepresentative_userId(selectedItem?.user_id)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem?.fullname;
                                }}
                                rowTextForSelection={(item, index) => {
                                return item?.fullname;
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
                                buttonStyle={{height: 50,borderRadius:10,width:'90%',backgroundColor:'#ffff',borderColor:'#666362',borderWidth:1}}
                                buttonTextStyle={{fontSize:14,fontFamily:'serif'}}
                                rowTextStyle ={{fontSize:14,fontFamily:'serif'}}
                            />
                            {/* <SelectDropdown
                                data={salesRepresentative}
                                onSelect={(selectedItem, index) => {
                                    setSalesRepresentative_userId(selectedItem)
                                }}
                                // defaultButtonText={bankAccountItem?.bankAccountItem?.active == 'Y' ? 'ACTIVE':'INACTIVE'}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                                
                                buttonTextStyle={{fontSize:13,fontFamily:'serif'}}
                                rowTextStyle ={{fontSize:10,fontFamily:'serif'}}
                                buttonStyle={{borderRadius:0,height:35,width:100,backgroundColor:"#fff",borderWidth:1}}
                            /> */}
                        </View>
                    </ProgressStep>
                </ProgressSteps>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        marginHorizontal: 10,
        marginVertical: 7,
        height: 50,
        width: "90%",
        margin: 1,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontFamily:'serif'
    },
    state: {
        marginHorizontal: 10,
        marginVertical: 7,
        height: 50,
        width: "90%",
        margin: 1,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#e6e6e1',
        fontFamily:'serif'
    },
    button: {
        backgroundColor: '#325aa8',
        padding: 8,
        borderRadius: 30,
        marginLeft: 10,
        width: "100%",
    },
    prebutton: {
        backgroundColor: '#f5a02a',
        padding: 8,
        borderRadius: 30,
        marginRight: 10,
        width: "100%",
    },
    text: {
        color: '#ffff',
        textAlign: 'center',
        padding:0,
        fontFamily:'serif',
    }
})

export default RegistrationScreen