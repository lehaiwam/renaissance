import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';

import { CustomColors } from '../../constants/CustomColors';

const CustomButton = ({ passedFunction, children }) => {
    
    return (
        <Pressable 
            style={ ({pressed}) => [ styles.button, pressed && styles.pressed ]}
            onPress={passedFunction}>
            
            <Text style={styles.text}>
                {children}
            </Text>
        </Pressable>
    ) 
}

export default CustomButton

const styles = StyleSheet.create({
    button:{
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginHorizontal: 12,
        marginVertical: 12,
        backgroundColor: CustomColors.blue600,
        elevation: 1,
        borderColor: CustomColors.white,
        borderWidth: 1,
        borderRadius: 16,
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
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800',
        color: CustomColors.white,
    },
})