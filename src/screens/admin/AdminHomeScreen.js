import React, { useEffect ,useState, useContext } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'

import { AuthContext } from '../../util/auth-context'

import { CustomColors } from '../../constants/CustomColors'
import { Octicons } from '@expo/vector-icons'; 
import MenuItemButton from '../../components/UI/MenuItemButton'
import WarningModal from '../../components/UI/WarningModal'
import { SafeAreaView } from 'react-native-safe-area-context'

const AdminHomeScreen = ({navigation}) => {
    
    const MEMBER = 1
    const OFFICIAL = 2
    const ADMINISTRATOR = 3
    const authCtx = useContext(AuthContext)
    
    const bgImage = require('../../images/login_background.jpeg')
    const [ showModal, setShowModal ] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    //const [authorization, setAuthorization] = useState(0)

    console.log('\n\n   AUTHLEVEL: ', authCtx.authLevel)

    

    if ( authCtx.authLevel <= MEMBER ) {
        return (
            <ImageBackground style={styles.bgImage} source={ bgImage }>
                <SafeAreaView style={styles.notAuthorizedWrapper}>
                    <View>
                        <Octicons name="stop" size={84} color="red" />
                    </View> 
                    <Text style={styles.unAuthorizedText}>  You are not authorized to access this functionality!!!</Text>
                    <Text style={styles.unAuthorizedText}>  Please, contact Club Captain or Application Administrator.</Text>
                </SafeAreaView>
            </ImageBackground>
        )
    }


    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>
            <View style={styles.mainContainer}>

                <WarningModal 
                    showModal={ showModal }
                    setShowModal={ setShowModal }
                    message={ "This will result in re-initializing all DB data for the application!!! Do you wish to continue?" }
                />

                <Text style={styles.header}>Administration</Text>

                { errorMessage && <Text style={styles.errorMessageText}>{errorMessage}</Text> }

                <View style={styles.actionItemsContainer}>
                    <MenuItemButton 
                        iconName={'md-people-circle-outline'} 
                        size={24} 
                        color={CustomColors.blue050}
                        onPressItem={ () => navigation.navigate('AdminMigs') }
                    > 
                        MIGS
                    </MenuItemButton> 
                    
                    <MenuItemButton 
                        iconName={'calendar-month'} 
                        size={24} 
                        color={CustomColors.blue050}
                        onPressItem={ () => navigation.navigate('AdminCalendar') }
                    > 
                        Calendar
                    </MenuItemButton> 

                    { (authCtx.authLevel > OFFICIAL)  && 

                        <MenuItemButton 
                            iconName={'database-refresh'} 
                            size={24} 
                            color={CustomColors.blue050}
                            onPressItem={ () => setShowModal(true) }
                        > 
                            Initialize DB
                        </MenuItemButton> 
                    }
 
                </View>
            </View>
        </ImageBackground>
    )
}

export default AdminHomeScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignSelf: 'stretch',
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
        color: CustomColors.gray600,
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