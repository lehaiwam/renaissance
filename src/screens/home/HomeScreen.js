import React, { useEffect, useState, useContext } from 'react'
import { ImageBackground, StyleSheet, Text, View, Alert, Button, Pressable} from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { auth } from "../../firebaseConfig"
import { signOut, sendEmailVerification } from 'firebase/auth'

import { db } from '../../firebaseConfig'
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"

import { AuthContext } from '../../util/auth-context'

import { CustomColors } from '../../constants/CustomColors'
import IconButton from '../../components/UI/IconButton'
import MenuItemButton from '../../components/UI/MenuItemButton'
import LoadingOverlay from '../../components/UI/LoadingOverlay'
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = ({ navigation, route }) => {
  const bgImage = require('../../images/skynews-tiger-woods-5283346.jpg')
  const isFocused = useIsFocused()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const authCtx = useContext(AuthContext)

  const username = authCtx.authUser.email

  // console.log('\n\n This email: ', authCtx.authUser.email, 'Verified?: ',   authCtx.authUser.emailVerified)

  const sendVerificationEmail = () => {
    //console.log('\n    Inside sendVerificationEmail() ')

    if (auth) {
      console.log('Sending Email Verification email...(actually not check code?)')
      
      /* UNCOMMENT THIS BEFOR LIVE
      sendEmailVerification( auth.currentUser )
          .then(() => {
          // Email verification sent!
          // ...
          })
          .catch((error) => {
              Alert.alert('Email Verification Send Error!', error.message)
              return
          })
      */

    }
  }

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
      let saveEmailVerified = false
      const q = query(collection(db, "migs"), where("email", "==", username))
      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) {
          console.log('Impossible! Successfully logged in but not in MIGS?')
          setErrorMessage('Impossible! Successfully logged in but not in MIGS?')
          return
      } else {
          // update our context user data
          querySnapshot.forEach((docu) => {
              authCtx.id = docu.id,
              authCtx.firstName = docu.data().firstName
              authCtx.lastName = docu.data().lastName
              authCtx.authLevel = docu.data().authLevel
              saveEmailVerified = docu.data().emailVerified
          })

          // Check if email is verified and 
          if (authCtx.authUser.emailVerified) {
            // If MIGS field not same as authorization system field, update
            if (!saveEmailVerified) {
              try {
                const migsRef = doc(db, "migs", authCtx.id);
                await updateDoc(migsRef, { 
                    emailVerified: authCtx.authUser.emailVerified,
                })
              } catch (error) {
                console.log('Error on MIGS updateDoc() : ', error) 
              }
            }
          }
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
                    iconName={'exit-outline'}
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
   
          <View style={styles.container}>

              { errorMessage && <Text style={styles.errorMessageText}>{errorMessage}</Text> }

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

              {(!authCtx.authUser.emailVerified) && (
                  <View style={styles.verifyEmailMsgContainer}>
                    <Text style={styles.verifyEmailMsgText}>Your email is NOT verified. Please click on the tick to verify your email</Text> 
                    <Pressable onPress={ sendVerificationEmail } >
                      <FontAwesome name="check-square-o" size={36} color={CustomColors.error500}/>
                    </Pressable>
                  </View>
              )}
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
      paddingTop: 40,
  },
  text: {
    color: CustomColors.gray800,
  },
  //
  verifyEmailMsgContainer: {
    //marginBottom: 144,
    position: 'absolute',
    bottom: 80,
    left:10, 
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  verifyEmailMsgText: {
    fontSize: 20,
    fontWeight: '800',
    color: CustomColors.error500,
    textAlign: 'center',
    marginBottom: 16,
  },
})