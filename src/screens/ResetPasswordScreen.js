import React, { useState } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from 'firebase/auth'

import { CustomColors } from '../constants/CustomColors'
import CustomButton from '../components/UI/CustomButton'
import OutlineButton from '../components/UI/OutlineButton'

const ResetPasswordScreen = ({navigation}) => {
    const bgImage = require('../images/login_background.jpeg')

    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const resetPasswordRequestHandler = () => {
        // send email with temp password...
        if (email.length < 1) {
            setErrorMessage('Please provide the EMAIL you registered with...')
            return
        }

        sendPasswordResetEmail(auth, email)
            .then((result) => {
                console.log('\n   Sent Password Reset Email result: ', result)
                navigation.navigate('Login')
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
    }


    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Text style={styles.header}>Reset Password Request</Text>

                { errorMessage && <Text style={styles.errorMessageText}>{ errorMessage }</Text> }

                <View style={styles.inputForm}>
                    <TextInput 
                        style={ styles.inputContainer }
                        value={email}
                        placeholder={'Email'}
                        onChangeText={(value) => {
                            setErrorMessage('')
                            setEmail(value)
                        }}
                    />
                </View>

                <CustomButton 
                    passedFunction={ resetPasswordRequestHandler }
                >
                    Reset Password
                </CustomButton>
            
                <View style={styles.otherContainer}>
                    <Text style={styles.registerText} >Remembered your password?</Text>
                    <OutlineButton 
                        passedOnFunction={ () => navigation.navigate('Login') }
                        color={ CustomColors.white }
                    >
                        Login
                    </OutlineButton>
                </View>

            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

export default ResetPasswordScreen

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
        //marginTop: 52,
        paddingHorizontal: 12,
    },
    header: {
        color: CustomColors.gray600,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    errorMessageText: {
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
    inputContainerDefunct: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 12,
    },
    label: {
        color: CustomColors.blue100,
        fontSize: 20,
        fontWeight: '600',
        width: '30%',
        textAlign: 'right',
    },
    textInput: {
        color: CustomColors.gray600,
        width: '70%',
        fontSize: 16,
        fontWeight: '400',
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#ffffff',
        borderRadius: 8,
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