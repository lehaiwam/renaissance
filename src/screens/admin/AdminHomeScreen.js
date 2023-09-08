import React, { useEffect ,useState, useContext } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'

import { AuthContext } from '../../util/auth-context'

import { CustomColors } from '../../constants/CustomColors'
import MenuItemButton from '../../components/UI/MenuItemButton'
import WarningModal from '../../components/UI/WarningModal'

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
            <View style={styles.notLoggedInContainer}>
                <Text stylele={styles.notLoggedInText}>  You are not authorized to access this functionality!!!</Text>
                <Text stylele={styles.notLoggedInText}>  Please, contact Club Captain or Application Admistrator.</Text>
            </View>
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
})