import React, { useState } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'

import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

import { CustomColors } from '../constants/CustomColors'
import CustomButton from '../components/UI/CustomButton'
import OutlineButton from '../components/UI/OutlineButton'

const RegisterScreen = ({navigation, route}) => {
    const bgImage = require('../images/login_background.jpeg')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validationMessage, setValidationMessage] = useState('')

    const firstName = route.params?.firstName
    const lastName = route.params?.lastName

    // Should have a useEffect() loading all PREAPPROVED golfers data 

    let validateAndSet = ( value, valueToCompare, setValue ) => {
      if (value !== valueToCompare) {
        setValidationMessage('Password mismatch!!!')
      } else {
        setValidationMessage('')
      }
      setValue(value)
    }

    const verifyUserEmail = () => {
        console.log('In verifyUserEmail() ')

        if (auth) {
            console.log(', sending verify email address...')
            sendEmailVerification( auth.currentUser )
                .then(() => {
                // Email verification sent!
                // ...
                })
                .catch((error) => {
                    Alert.alert('Email Verify Error!', error.message)
                    return
                })
        }
    }


    const registerUser = () => {
        console.log('\n\n   Submitted register data ...', email, password, confirmPassword)
        if (password === confirmPassword) {
            
            createUserWithEmailAndPassword ( auth, email, password )
                .then((userCredential) => {
                    // Signed in 
                    console.log('REGISTER - Successfully created & logged in user: ', userCredential.user.email)
                    // Send email verification mail
                    verifyUserEmail()
                    // Loffed in on successfull create user, so navigate to home screen    
                    navigation.navigate('Home', {
                        user: auth.currentUser,
                        firstName: firstName,
                        lastName: lastName,
                    })
                    // ...   
                })
                .catch((error) => {
                    console.log('Unsuccessful user create: ', error)
                    setValidationMessage (error.message)
                    return
                    // ..
                })
            
        } else {
            setValidationMessage ('Cant you see the error message? Password mismatch!!!')
            return
        }
    }

    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Text style={styles.header}>Register</Text>
                <Text style={styles.subheader}>Hi! { firstName} {lastName}</Text>

                { validationMessage && <Text style={styles.errorTextMessage}>{validationMessage}</Text> }

                <View style={styles.inputForm}>
                    <TextInput 
                        style={ styles.inputContainer }
                        value={email}
                        placeholder={'Email'}
                        onChangeText={(value) => {
                            setValidationMessage('')
                            setEmail(value)
                        }}
                    />
            
                    <TextInput 
                        style={ styles.inputContainer }
                        value={password}
                        secureTextEntry={true}
                        placeholder={'Password'}
                        minLength={6}
                        onChangeText={(value) => {
                            setValidationMessage('')
                            validateAndSet( value, confirmPassword, setPassword )
                        }}
                    />

                    <TextInput 
                        style={ styles.inputContainer }
                        value={ confirmPassword }
                        secureTextEntry={ true }
                        placeholder={'confirmPassword'}
                        onChangeText={(value) => {
                            setValidationMessage('')
                            validateAndSet( value, password, setConfirmPassword )
                        }}
                    />
                </View>

                <CustomButton 
                    color={ CustomColors.white }
                    passedFunction={ registerUser }
                >
                    Submit
                </CustomButton>

                <View style={ styles.otherContainer }>
                    <Text style={ styles.registerText } >Registered already?</Text>
                    <OutlineButton 
                        passedOnFunction={() => navigation.navigate('Login')}
                        color={ CustomColors.white }
                    >
                        Log In
                    </OutlineButton>
                </View>

            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
    },
    container: {
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
    subheader: {
        color: CustomColors.gray600,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    errorTextMessage: {
        width: '90%',
        color: CustomColors.error500,
        fontSize: 20,
        fontWeight: 'bold',
        borderColor: CustomColors.error500,
        borderWidth: 1,
        padding: 8,
        textAlign: 'center',
    },
    inputForm: {
        width:'100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputContainer: {
        backgroundColor: CustomColors.blue050,
        width: '90%',
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginVertical: 16,
        marginHorizontal: 24,
        color: CustomColors.gray800,
        fontSize: 20,
        fontWeight: '600',
        borderRadius: 8,
        borderColor: CustomColors.gray600,
        borderWidth: 2,
    },

    otherContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    registerText: {
        fontSize: 16,
        fontWeight: '600',
        color: CustomColors.blue100,
    }

})