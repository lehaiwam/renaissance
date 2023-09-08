import React, { useEffect ,useState } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'

import {db} from '../firebaseConfig'
import { collection, query, where, getDocs } from "firebase/firestore";

import { CustomColors } from '../constants/CustomColors'
import CustomButton from '../components/UI/CustomButton'
import OutlineButton from '../components/UI/OutlineButton'

const ContactUsScreen = ({navigation}) => {
    const bgImage = require('../images/login_background.jpeg')

    const [email, setEmail] = useState('')
    const [cellphone, setCellphone] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // useEffect() to load all PREAPPROVED users
    useEffect(() => {


    }, [])



    const validateStatusHandler = async () => {



    }


    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>

            <View>
                <Text style={styles.header}>Get in touch with us</Text>
                { errorMessage && <Text style={styles.errorMessageText}>{errorMessage}</Text> }


            </View>
            
        </ImageBackground>
    )
}

export default ContactUsScreen

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
    otherText: {
        fontSize: 16,
        fontWeight: '600',
        color: CustomColors.blue100,
    }

})