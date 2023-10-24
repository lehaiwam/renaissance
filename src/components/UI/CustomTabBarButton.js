import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CustomColors } from '../../constants/CustomColors'
import Icon, { Icons } from '../UI/Icons'

const CustomTabBarButton = (props) => {
    
  console.log(props)

    const { children, accessibilityState, onPress } = props

    if (accessibilityState.selected) {
        return (
          <View style={styles.buttonWrapper}>
            <Pressable onPress={onPress} style={styles.activeButton}>
                <Text>{children}</Text>
            </Pressable>
          </View>
        )
    } else {
        return (
          <View style={styles.buttonWrapper}>
            <Pressable onPress={onPress} style={styles.inactiveButton} >
                <Text>{children}</Text>
            </Pressable>
          </View>
        )
    }
}

export default CustomTabBarButton

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    //borderColor: 'red',   
  },
  activeButton: {
    flex: 1,
    position: 'absolute',
    top: -25,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'cyan',
    backgroundColor: 'white',
 
  },
  inactiveButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    
})