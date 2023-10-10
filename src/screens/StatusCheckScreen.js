import React, { useEffect ,useState } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'

import {db} from '../firebaseConfig'
import { collection, query, where, getDocs } from "firebase/firestore";

import { CustomColors } from '../constants/CustomColors'
import CustomButton from '../components/UI/CustomButton'
import OutlineButton from '../components/UI/OutlineButton'

const StatusCheckScreen = ({navigation}) => {
    const bgImage = require('../images/login_background.jpeg')

    const [email, setEmail] = useState('')
    const [cellphone, setCellphone] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // useEffect() to load all PREAPPROVED users
    useEffect(() => {





    }, [])



    const validateStatusHandler = async () => {
        console.log('\n\n   Submitted data ...', email, cellphone)
        
        const q = query(collection(db, "migs"), where("email", "==", email))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
            console.log('Email provided not in the MIGS list!!!')
            setErrorMessage('Email provided not in the MIGS list! Please, check your email?')
            return
        } else {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data())
                // compare db data with entered data
                if ( (email !== doc.data().email) || (cellphone !== doc.data().cell) ) {
                    console.log('Email and Cellphone mismatch!!!')
                    setErrorMessage('Provided email and cellphone mismatch with preapproved host data!!!')
                    return
                }
                setEmail('')
                setCellphone('')
                setErrorMessage('')
                navigation.navigate('Register', { firstName: doc.data().firstName, lastName: doc.data().lastName})
            })
        }
    }


    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                
            >
                <Text style={styles.header}>Are you a MIGS?</Text>

                { errorMessage && <Text style={styles.errorMessageText}>{errorMessage}</Text> }

                <View style={styles.inputForm}>
                    <TextInput 
                        style={ styles.inputContainer }
                        value={email}
                        placeholder={'email'}
                        onChangeText={(value) => {
                            setErrorMessage('')
                            setEmail(value)
                        }}
                    />
            
                    <TextInput 
                        style={ styles.inputContainer }
                        value={cellphone}
                        placeholder={'cell no.'}
                        minLength={12}
                        maxLength={12}
                        onChangeText={(value) => {
                            setErrorMessage('')
                            setCellphone(value)
                        }}
                    />

                </View>

                <CustomButton 
                    passedFunction={ validateStatusHandler }
                >
                    Check Status
                </CustomButton>

                <View style={ styles.otherContainer }>
                    <Text style={ styles.otherText } >Back To Login?</Text>
                    <OutlineButton 
                        passedOnFunction={() => navigation.navigate('Login')}
                        color={ CustomColors.white }
                    >
                        Back
                    </OutlineButton>
                </View>

            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

export default StatusCheckScreen

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
        paddingHorizontal: 16,
    },
    header: {
        color: CustomColors.blue050,
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    errorMessageText: {
      color: CustomColors.error500,
      fontSize: 20,
      fontWeight: 'bold',
    },
    inputForm: {
        width:'100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputContainer: {
        backgroundColor: CustomColors.white,
        width: '90%',
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginVertical: 16,
        color: CustomColors.gray800,
        fontSize: 16,
        fontWeight: '400',
        borderRadius: 24,
        borderColor: CustomColors.white,
        borderWidth: 2,
    },
    otherContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    otherText: {
        fontSize: 16,
        fontWeight: '600',
        color: CustomColors.blue100,
    }

})