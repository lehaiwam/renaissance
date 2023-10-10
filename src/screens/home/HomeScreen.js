import React, { useEffect, useState, useContext } from 'react'
import { ImageBackground, StyleSheet, Text, View, Alert, Button} from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { auth } from "../../firebaseConfig"
import { signOut } from 'firebase/auth'
import { db } from '../../firebaseConfig'
import { collection, query, where, getDocs } from "firebase/firestore"

import { AuthContext } from '../../util/auth-context'

import { CustomColors } from '../../constants/CustomColors'
import IconButton from '../../components/UI/IconButton'
import MenuItemButton from '../../components/UI/MenuItemButton'
import LoadingOverlay from '../../components/UI/LoadingOverlay'

const HomeScreen = ({ navigation, route }) => {
  const bgImage = require('../../images/skynews-tiger-woods-5283346.jpg')
  const isFocused = useIsFocused()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const authCtx = useContext(AuthContext)

  const username = authCtx.authUser.email

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login')
      })
      .catch((error) => {
        Alert.alert('Logout Error!', error.message)
        return
      })
  }

  const userStaySignedIn = () => {
    navigation.navigate('Home')
  }

  const userLogout = () => {
    Alert.alert('Sign Out?', 'Are you sure you wish to sign out?', [
      {
        text: 'No',
        onPress: userStaySignedIn,
        style: 'cancel',
      },
      {
        text: 'Yes', 
        onPress: userSignOut,
      }
    ]);
  }

  useEffect(() => {
    const showExitIcon = async () => {
      const q = query(collection(db, "migs"), where("email", "==", username))
      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) {
          console.log('Impossible! Successfully logged in but not in MIGS?')
          setErrorMessage('Impossible! Successfully logged in but not in MIGS?')
          return
      } else {
          // update our context user data
          querySnapshot.forEach((doc) => {
              authCtx.id = doc.id,
              authCtx.firstName = doc.data().firstName
              authCtx.lastName = doc.data().lastName
              authCtx.authLevel = doc.data().authLevel
          })
      }
      setIsLoading(false)
    
      navigation.setOptions({
        title: 'Welcome back, '  + authCtx.firstName,
        headerStyle: {
          backgroundColor: CustomColors.blue050,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
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
      setIsLoading(true)
      showExitIcon()
    }

  }, [])


  if (isLoading) {
    return (
      <>
        <LoadingOverlay message={'Please be patient! Authenticating your credentials...'}/>
        <Button title='Abort' onPress={ () => navigation.navigate('Login') } />
      </>
    )
  }

  return (
      <ImageBackground style={styles.bgImage} source={ bgImage } resizeMode='cover'>
          { errorMessage && <Text style={styles.errorMessageText}>{errorMessage}</Text> }
          <View style={styles.container}>
              <MenuItemButton 
                iconName={'md-person-circle-outline'} 
                size={24} 
                color={CustomColors.blue050}
                onPressItem={ () => navigation.navigate('MyProfile') }
              > 
                  My Profile
              </MenuItemButton> 

              <MenuItemButton 
                iconName={'md-people-circle-outline'} 
                size={24} 
                color={CustomColors.blue050}
                onPressItem={ () => navigation.navigate('Migs') }
              > 
                  Migs
              </MenuItemButton> 

              <MenuItemButton 
                iconName={'calendar-month'} 
                size={24} 
                color={CustomColors.blue050}
                onPressItem={ () => navigation.navigate('Calendar') }
              > 
                Calendar
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
      paddingHorizontal: 16,
  },
  text: {
    color: CustomColors.gray800,
  },
})