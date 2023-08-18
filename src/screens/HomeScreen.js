import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, View, Alert} from 'react-native'
import { useIsFocused } from '@react-navigation/native';

import { auth } from "../firebaseConfig";
import { signOut } from 'firebase/auth'
import { db } from '../firebaseConfig'
import { collection, query, where, getDocs } from "firebase/firestore";

import { CustomColors } from '../constants/CustomColors'
import IconButton from '../components/UI/IconButton'
import MenuItemButton from '../components/UI/MenuItemButton'
import { createDbTable } from '../util/initialize-db-tables'

const HomeScreen = ({ navigation, route }) => {
  const bgImage = require('../images/skynews-tiger-woods-5283346.jpg')
  const isFocused = useIsFocused()
  const [errorMessage, setErrorMessage] = useState('')
  const authUser = route.params.user

  // console.log('\n\n   @HOME: Logged in User: ', authUser)

  const user = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
  }

  const userLogout = () => {
    console.log("\n\n   Logging user out...")
    signOut(auth)
      .then(() => {
        navigation.replace('Login')
      })
      .catch((error) => {
        Alert.alert('Logout Error!', error.message)
        return
      })
  }

  useEffect(() => {
    const showExitIcon = async () => {
      const q = query(collection(db, "migs"), where("email", "==", authUser.email))
      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) {
          console.log('Impossible! Successfully logged in but not in MIGS?')
          setErrorMessage('Impossible! Successfully logged in but not in MIGS?')
      } else {
        // create user data object/ note there should only be one document
          querySnapshot.forEach((doc) => {
              user.id = doc.id,
              user.email = authUser.email,
              user.firstName = doc.data().firstName
              user.lastName = doc.data().lastName
          })
      }

      navigation.setOptions({
        title: 'Welcome back, ' + user.firstName,
        headerRight: ({tintColor}) => {
            return (
                <IconButton 
                    name={'exit-outline'}
                    size={24}
                    color={tintColor}
                    onPressIcon={ userLogout }
                />
            )
        },
      })
    }
    
    if (isFocused) {
      showExitIcon()
    }

  }, [navigation, userLogout, isFocused])

  const showMigsGolfers = () => {
    console.log('Navigating to MIGS...')
    navigation.navigate('Migs')
  }

  const showYearCalendar = () => {
    console.log('Navigating to CALENDAR...')
    navigation.navigate('Calendar', { user: user })
  }

  const contactUs = () => {
    console.log('Navigating to Contact Us...')
    navigation.navigate('ContactUs')
  }

  const administration = () => {
    console.log('\n In Administration() ...')
    // temporarily run the results table creation utility
    createDbTable()
    return


    // TODO: Move the function above to the Admin screen, once design is complete
    // console.log('Navigating to Administration...')
    // navigation.navigate('Admin')
    
  }
  return (
    <ImageBackground style={styles.bgImage} source={ bgImage } resizeMode='cover'>

      { errorMessage && <Text style={styles.errorMessageText}>{errorMessage}</Text> }


      <View style={styles.container}>
       
       <MenuItemButton 
        iconName={'person-circle-outline'} 
        size={24} 
        color={CustomColors.blue050}
        onPressItem={ showMigsGolfers }
       > 
        Migs
       </MenuItemButton> 

       <MenuItemButton 
        iconName={'calendar-month'} 
        size={24} 
        color={CustomColors.blue050}
        onPressItem={ () => navigation.navigate('Calendar', { user: user }) }
       > 
        Calendar
       </MenuItemButton> 

       <MenuItemButton 
        iconName={'contact-page'} 
        size={24} 
        color={CustomColors.blue050}
        onPressItem={ contactUs }
       > 
        Contact
       </MenuItemButton> 

       <MenuItemButton 
        iconName={'admin-panel-settings'} 
        size={24} 
        color={CustomColors.blue050}
        onPressItem={ administration }
       > 
        Admin
       </MenuItemButton> 
      </View>
    </ImageBackground>  
    
  )

}

export default HomeScreen

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    height: '100%',
},
errorMessageText: {
  color: CustomColors.error500,
  fontSize: 20,
  fontWeight: 'bold',
},
container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
},
  
text: {
    color: CustomColors.gray800,
  },
})