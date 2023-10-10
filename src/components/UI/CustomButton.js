import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';

import { CustomColors } from '../../constants/CustomColors';

const CustomButton = ({ passedFunction, children }) => {
    
    return (
        <Pressable 
            style={ ({pressed}) => [ styles.button, pressed && styles.pressed ]}
            onPress={passedFunction}>
            
            <Text style={styles.buttonText}>
                {children}
            </Text>
        </Pressable>
    ) 
}

export default CustomButton

const styles = StyleSheet.create({
    button:{
        paddingVertical: 4,
        marginVertical: 12,
        backgroundColor: CustomColors.blue600,
        elevation: 1,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 52,
        width: '90%',
        /*
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowOffset: {width:1, height: 1},
        shadowRadius: 2,
        */
    },
    pressed: {
        opacity: .5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: CustomColors.white,
    },
})