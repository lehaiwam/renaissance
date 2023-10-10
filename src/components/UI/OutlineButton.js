import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'

import { Ionicons} from '@expo/vector-icons'
import { CustomColors } from '../../constants/CustomColors'

const OutlinedButton = ({iconName, size, color, children, passedOnFunction}) => {

    return (
        <Pressable style={({ pressed }) => [ styles.button, pressed && styles.pressed ]} onPress={ passedOnFunction } >
            <Ionicons name={iconName} size={size} color={color} />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

export default OutlinedButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: CustomColors.gray1000,
        width: '45%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
        marginVertical: 8,
        borderColor: CustomColors.blue100,
        borderWidth: 2,
        borderRadius: 16,
        alignSelf: 'flex-end',
        marginLeft: 16,
    },
    icon:{

    },
    text: {
        marginLeft: 8,
        color: CustomColors.blue100,
        fontSize: 16,
        fontWeight: '600',
    },
    pressed: {
        opacity: 0.5,
    },
})