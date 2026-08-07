import React from "react";
import { StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';

export default function ElementButton({style,...props}){
    return(
        <Button
            buttonStyle={[style]}
            titleStyle={{ fontWeight: 'bold',fontFamily:'serif' }}
            containerStyle={styles.buttonstyles}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    buttonstyles: {
        marginVertical: 10,
        padding:5,
        width: "80%"
    }
  })
