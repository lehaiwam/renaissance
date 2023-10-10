import React, { useState, useContext } from 'react'
import { ImageBackground, KeyboardAvoidingView, Image, StyleSheet, Text, TextInput, View } from 'react-native'

import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth'

import { AuthContext } from '../util/auth-context'

import { CustomColors } from '../constants/CustomColors'
import CustomButton from '../components/UI/CustomButton'
import OutlineButton from '../components/UI/OutlineButton'

const LoginScreen = ({navigation}) => {
    const bgImage = require('../images/login_background.jpeg')
    const groupImage = require('../images/group-vaal-degrace-2021.jpg')

    const authCtx = useContext(AuthContext);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validationMessage, setValidationMessage] = useState('')

    const loginHandler = () => {
        if ( !email || !password) {
            setValidationMessage ('Please provide both username and password!!!')
            return
        }

        signInWithEmailAndPassword( auth, email, password )
            .then((userCredential) => {
                // Signed in, set context authUser
                authCtx.setAuthUser(userCredential.user)
                // navigate home
                navigation.navigate('HomeTab')
            })
            .catch((error) => {
                setValidationMessage (error.message)
                return
                // ..
            });
    }

    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>     
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                { validationMessage && 
                    <Text style={styles.errorTextMessage}>
                        { validationMessage }
                    </Text> 
                }

                <Text style={styles.mainHeader}>
                    Renaissance GC
                </Text>

                <View style={styles.groupImgContainer}>
                    <Image
                        style={styles.groupImageStyle}
                        source={ groupImage } 
                        resizeMode={'cover'} 
                    />
                </View>

                <Text style={styles.header}>Login</Text>     

                <View style={styles.inputForm}>
                    <TextInput 
                        style={ styles.inputContainer }
                        value={email}
                        placeholder={'Email'}
                        onChangeText={(value) => {
                            setEmail(value) 
                            setValidationMessage('')
                        }}
                    />
            
                    <TextInput 
                        style={ styles.inputContainer }
                        value={password}
                        secureTextEntry={true}
                        placeholder={'Password'}
                        onChangeText={(value) => {
                            setPassword(value)
                            setValidationMessage('')
                        }}
                    />
                </View>

                <CustomButton 
                    passedFunction={ loginHandler }
                >
                    Login
                </CustomButton>

                <View style={styles.otherContainer}>
                    <Text style={styles.registerText} >
                        Not registered yet?
                    </Text>
                    <OutlineButton 
                        color={ CustomColors.white }
                        passedOnFunction={ () => navigation.navigate('StatusCheck') }
                    >
                        Register
                    </OutlineButton>
                </View>
            
                <View style={styles.otherContainer}>
                    <Text style={styles.registerText} >
                        Forgot your password?
                    </Text>
                    <OutlineButton 
                        passedOnFunction={ () => navigation.navigate('ResetPassword') }
                        color={ CustomColors.white }
                    >
                        Reset Password
                    </OutlineButton>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignSelf: 'stretch',
    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 28,
        paddingHorizontal: 16,
        paddingVertical: 28,
    },
    mainHeader: {
        color: CustomColors.blue050,
        fontSize: 44,
        fontWeight: 'bold',
    },
    groupImgContainer: {
        width: '100%',
        height: '25%',
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupImageStyle: {
        width: '100%',
        height: '100%',
        marginHorizontal: 8,
        borderRadius: 20,
        borderColor: CustomColors.blue050,
        borderWidth: 2,
    },
    header: {
        color: CustomColors.blue050,
        fontSize: 44,
        fontWeight: 'bold',
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
        backgroundColor: CustomColors.white,
        width: '90%',
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginVertical: 16,
        marginHorizontal: 24,
        color: CustomColors.gray800,
        fontSize: 16,
        fontWeight: '400',
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 24,
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
    },
})