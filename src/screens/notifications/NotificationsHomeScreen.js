import React, { useEffect ,useState, useContext } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'

import { AuthContext } from '../../util/auth-context'

import { CustomColors } from '../../constants/CustomColors'
import MenuItemButton from '../../components/UI/MenuItemButton'
import NotificationsScreen from './NotificationsScreen'

const NotificationsHomeScreen = ({navigation}) => {
    
    const MEMBER = 1
    const OFFICIAL = 2
    const ADMINISTRATOR = 3
    const authCtx = useContext(AuthContext)
    
    const bgImage = require('../../images/tiger-fist-pump.jpeg')

    return (
        <ImageBackground resizeMode='cover' style={styles.bgImage} source={ bgImage }>
            <View style={styles.mainContainer}>

                <Text style={styles.header}>Notifications</Text>

                <View style={styles.actionItemsContainer}>
                    <MenuItemButton 
                        iconName={'notification'} 
                        size={24} 
                        color={CustomColors.yellow500}
                        onPressItem={ () => navigation.navigate('Notifications') }
                    > 
                        Notification(s)
                    </MenuItemButton> 
                </View>
            </View>
        </ImageBackground>
    )
}

export default NotificationsHomeScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        //alignSelf: 'center',
        width: '100%',
        height: '100%',
    },
    mainContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    header: {
        color: CustomColors.white,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    errorMessageText: {
      color: CustomColors.error500,
      fontSize: 20,
      fontWeight: 'bold',
    },
    actionItemsContainer: {

    },
    notAuthorizedWrapper: {
        width: '100%',
        height: '100%',
        // backgroundColor:CustomColors.blue050,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unAuthorizedText: {
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        marginTop: 20,
        color: CustomColors.error500,
    },
})