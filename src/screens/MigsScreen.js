import React, { useEffect ,useState } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'

import {db} from '../firebaseConfig'
import { collection, query, where, getDocs } from "firebase/firestore";

import { CustomColors } from '../constants/CustomColors'
import CustomButton from '../components/UI/CustomButton'
import OutlineButton from '../components/UI/OutlineButton'

const MigsScreen = ({navigation}) => {
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
                navigation.navigate('Register', { name: doc.data().name, lastName: doc.data().lastName})
            })
        }
    

        /*
        const docRef = doc(db, "migs", 'QPaDDJ68cpVPVSv89lWR');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            console.log("         cell:", docSnap.data().cell);
            // compare the entered cellphone to the  one in the db
            if ()
            

        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            setErrorMessage('No RGC golfer with that email is a MIGS!!!')
            return
        }
        

        setEmail('')
        setCellphone('')
        setErrorMessage('')
        navigation.navigate('Register', { name: docSnap.data().name, lastName: docSnap.data().lastName})
        */
    }


    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>

            <View>

                <Text style={styles.header}>Members In Good Standing</Text>

                { errorMessage && <Text style={styles.errorMessageText}>{errorMessage}</Text> }



    
 
            </View>
            
        </ImageBackground>
    )
}

export default MigsScreen

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