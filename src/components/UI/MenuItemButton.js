import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'

import { MaterialCommunityIcons} from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'; 
import { CustomColors } from '../../constants/CustomColors'

const MenuItemButton = ({iconName, size, color, children, onPressItem}) => {

    return (
        <Pressable 
            style={({ pressed }) => [ styles.button, pressed && styles.pressed ]} 
            onPress={ onPressItem } 
        > 
            { 
                (iconName === "person-circle-outline") && 
                    <Ionicons name={iconName} size={size} color={color} />
            }
            
            {         
                (iconName === "calendar-month") &&    
                    <MaterialCommunityIcons name={iconName} size={size} color={color} />
            } 
            
            {
                (iconName === "contact-page") &&  
                    <MaterialIcons name={iconName} size={size} color={color} />  
            }
            {
                (iconName === "admin-panel-settings") &&  
                    <MaterialIcons name={iconName} size={size} color={color} />  
            }
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

export default MenuItemButton

const styles = StyleSheet.create({

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
        margin: 8,
        borderColor: CustomColors.blue100,
        borderWidth: 1,
        borderRadius: 16,
        width: 100,
        height: 60,
    },
    icon:{

    },
    text: {
        marginLeft: 8,
        color: CustomColors.white,
        fontSize: 12,
        fontWeight: '600',
    },
    pressed: {
        opacity: 0.5,
    },
})