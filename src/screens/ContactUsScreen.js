import React, { useEffect ,useState } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import * as MailComposer from 'expo-mail-composer'


import { CustomColors } from '../constants/CustomColors'
import CustomButton from '../components/UI/CustomButton'
import OutlineButton from '../components/UI/OutlineButton'
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingOverlay from '../components/UI/LoadingOverlay'

const ContactUsScreen = ({navigation}) => {
    const bgImage = require('../images/login_background.jpeg')
    const [isChecking4Availability, setIsChecking4Availability] = useState(false)
    const [isAvailable, setIsAvailable] =  useState(false)
    const [yourName, setYourName] = useState('')
    const [yourCell, setYourCell] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // recipients would typically be the Captain and The Chairman
    const recipients = [
        'g.litlake@gmail.com',
        'mokgohd@gmail.com',
    ]

    // other exco members
    const ccRecipients = [

    ]

    // This would be the System Admin
    const bccRecipients = [
        'lehaiwa.software.dev@gmail.com',
    ]
    
    
    useEffect(() => {
        // Check Mail Compser is available?
        const check4Avaiability = async () => {
            const isMailAvailable = await MailComposer.isAvailableAsync()
            setIsAvailable(isMailAvailable)
            setIsChecking4Availability(false)
        }
        setIsChecking4Availability(true)
        check4Avaiability()
        isAvailable ? console.log('Mail service available!') : console.log('Mail service UNavailable!')
    }, [])

    const sendMail = async () => {
        MailComposer.composeAsync({
            subject: subject,
            body: message,
            recipients: recipients,
            //ccRecipients: ccRecipients,
            bccRecipients: bccRecipients,
        })

    }


    const resetForm = () => {
        // console.log('Resetting all input fields...')
        setYourName('')
        setYourCell('')
        setSubject('')
        setMessage('')
        setErrorMessage('')

    }


    if (isChecking4Availability) {
        return (
            <LoadingOverlay message={'Please be patient! Checking for mail service availability...'} />
        )
    }

    
    return (
        <SafeAreaView style={styles.safeArea}>

        <ImageBackground style={styles.bgImage} source={ bgImage }>
            { errorMessage && <Text style={styles.errorMessageText}>{errorMessage}</Text> }

            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Text style={styles.header}>Contact RGC Exco</Text>

                <View style={styles.inputForm}>
                    <TextInput 
                        style={ styles.inputContainer }
                        value={ subject }
                        placeholder={'subject'}
                        onChangeText={(value) => {
                            setErrorMessage('')
                            setSubject(value)
                        }}
                    />

                    <TextInput 
                        style={ styles.inputContainer }
                        multiline={true}
                        value={ message }
                        placeholder={'message'}
                        onChangeText={(value) => {
                            setErrorMessage('')
                            setMessage(value)
                        }}
                    />
                </View>

                <View style={styles.actionsContainer}>
                    <CustomButton 
                        color={ CustomColors.white }
                        passedFunction={ sendMail }
                    >
                        Send
                    </CustomButton>

                    <View style={styles.outlineContainer}>
                        <OutlineButton 
                            passedOnFunction={ resetForm }
                            color={ CustomColors.white }
                        >
                            Cancel
                        </OutlineButton>
                    </View>
                </View>
            </KeyboardAvoidingView>  
        </ImageBackground>
        </SafeAreaView>  
    )
}

export default ContactUsScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    bgImage: {
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
        marginTop: 44,
        width: '100%',
        textAlign: 'center',
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
    inputForm: {
        width:'100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputContainer: {
        backgroundColor: CustomColors.white,
        width: '90%',
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginVertical: 16,
        marginHorizontal: 24,
        color: CustomColors.gray800,
        fontSize: 16,
        fontWeight: '600',
        borderRadius: 8,
        borderBottomColor: CustomColors.gray1000,
        borderBottomWidth: 2,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },

    actionsContainer: {
        width: '100%',
        //flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20,
    },
    outlineContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
})