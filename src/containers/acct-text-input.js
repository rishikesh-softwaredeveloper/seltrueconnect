import React from 'react';
import { View, StyleSheet,Text} from 'react-native'
import {Input} from 'react-native-elements';

export default function TextInput({ label,errorText, description,...props }) {
    return (
      <View style={styles.container}>
        <Input
          style={styles.input}
          inputContainerStyle={{borderBottomWidth:0}} 
          containerStyle={{height:60}}        
          {...props}
        />
        {description && !errorText ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
        {errorText ?<View style={styles.error}><Text style={{color:"red"}}>{errorText}</Text></View> : null}
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 0,
      backgroundColor:'white',
      margin:10,
      paddingBottom:10
    },
    description: {
      fontSize: 13,
      color: 'black',
      paddingTop: 8
    },
    error: {
      fontSize: 13,
      width:"80%",
      paddingLeft:25
    },
    input:{
      height: 50,
      width:"80%",
      margin: 1,
      borderWidth: 1,
      borderRadius:5,
      margin:0
    },
    labelContainer: {
      position: 'absolute',
      backgroundColor: '#FFF',
      left: 45,
      zIndex: 50,
      alignItems: "center",
      justifyContent:"center",
      textAlignVertical: "center",
      borderRadius:100
    }
  })
  