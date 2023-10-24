import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const IconButton = ({iconName, size, color, onPressIcon}) => {
  return (
    <Pressable style={ ({pressed}) => [styles.button, pressed && styles.press ] } onPress={ onPressIcon } >
           { 
                (iconName === "exit-outline") && 
                    <Ionicons name={iconName} size={size} color={color} />
            }
            { 
                (iconName === "format-list-numbered") && 
                    <MaterialCommunityIcons name={iconName} size={size} color={color} />
            }
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
    button: {
        padding: 8,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    press: {
        opacity: 0.45,
    },
})