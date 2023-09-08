import React, { useEffect, useState, useContext } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Pressable, Text, View, TextInput, Image } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import {db} from '../../firebaseConfig'
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"

import { Entypo } from '@expo/vector-icons';

import { CustomColors } from '../../constants/CustomColors'
import CustomButton from '../../components/UI/CustomButton'
import OutlineButton from '../../components/UI/OutlineButton'
import { AuthContext } from '../../util/auth-context'
import LoadingOverlay from '../../components/UI/LoadingOverlay'

const MyProfileScreen = ({navigation, route}) => {

    const bgImage = require('../../images/login_background.jpeg')
    const golferImage = require('../../images/human.png')

    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)
    const isFocused = useIsFocused()

    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState( '')
    const [cell, setCell] = useState('')
    const [cellVerified, setCellVerified] = useState(false)
    const [email, setEmail] = useState('')
    const [emailVerified, setEmailVerified] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    let myProfile = false     // Initializing that user is NOT looking at his own profile

    useEffect(() => {   
        // get MIGS (Members In Good Standing) record for this golfer
        getMigsDocument = async() => {
            const arrayMigs = []
            const q = query(collection(db, "migs"), where('email', '==', authCtx.authUser.email))
            const querySnapshot = await getDocs(q)
            if (querySnapshot.empty) {
                console.log('MIGS not found? Impossible!!!')
                setErrorMessage('Registered user with no MIGS record?Impossible!!!')
            } else {
                querySnapshot.forEach(async (doc) => {
                    console.log(doc.id, " => ", doc.data())
                    setId(doc.id)
                    setFirstName(doc.data().firstName)
                    setLastName(doc.data().lastName)
                    setCell(doc.data().cell)
                    setCellVerified(doc.data().cellVerified)
                    setEmail(doc.data().email)
                    setEmailVerified(doc.data().emailVerified)
                    setErrorMessage('')
                })
            }
            setIsLoading(false)
        }

        if (isFocused) {
            setIsLoading(true)
            getMigsDocument()
        }
    }, [isFocused])


    const saveChanges = async () => {
        console.log('\n   Saving changes (only email & cellphone) made to MIGS...')
        console.log('      New MIGS cell: ', cell)

        /*
        try {
            const migsRef = doc(db, "migs", id);
            await updateDoc(migsRef, { 
                cell: cell,
            })
        } catch (error) {
            console.log('Error on MIGS updateDoc(): ', error) 
        }
    
        console.log('Successfully updated this MIGS record: ', lastName)
        navigation.navigate('Migs')
        */
    }

    if (isLoading) {
        return (
          <LoadingOverlay message={'Please be patient! Fetching data online...'}/>
        )
    }
   

    // console.log( authCtx.authUser.email , email)
    if ( authCtx.authUser.email !== email  && authCtx.cell !== cell) {
        return (
            <View style={styles.unauthorized}>
                <Text style={styles.unauthorizedText}>Unauthorized access suspected!!!</Text>
                <Text style={styles.unauthorizedText}>You are NOT who you claim to be!!!</Text>
            </View>
        )
    }
    

    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                { errorMessage &&  <Text style={styles.errorTextMessage}>{errorMessage}</Text> }

                <View style={styles.golferDataContainer}>

                    <View style={styles.golferImgContainer}>
                        <Image
                            style={styles.golferImage}
                            source={ golferImage }
                        />
                    </View>

                    <View style={styles.fullNameContainer}>
                        <View style={styles.firstContainer}>
                            <Text style={styles.labelText}>First Name</Text>
                            <TextInput 
                                style={ styles.inputContainer }
                                value={firstName}
                                onChangeText={(value) => setFirstName(value)}
                            />
                        </View>
                        <View style={styles.firstContainer}>
                            <Text style={styles.labelText}>Last Name</Text>
                            <TextInput 
                                style={ styles.inputContainer }
                                value={lastName}
                                onChangeText={(value) => {
                                    setErrorMessage('')
                                    setLastName(value)
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.fullWidthContainer}>
                        <Text style={styles.labelText}>Cellphone</Text>
                        <TextInput 
                            style={ styles.inputContainer }
                            value={ cell }
                            onChangeText={(value) => {
                                setErrorMessage('')
                                setCell(value)
                            }}
                        />
                    </View>

                    <View style={styles.fullWidthContainer}>
                        <Text style={styles.labelText}>Email</Text>
                        <TextInput 
                            style={ styles.inputContainer }
                            value={ email }
                            onChangeText={(value) => {
                                setErrorMessage('')
                                setEmail(value)
                            }}
                        />
                    </View>

                    <View style={styles.imgChangeAction}>
                        <Text style={styles.imgChangeText}>Wish to upload a new profile picture?</Text>
                        <Pressable
                            style={styles.btnProfileImageChange}
                            onPress={() => navigation.navigate('UpdateProfilePicture')}
                        >
                            <Entypo name="upload" size={24} color="white" />
                        </Pressable>
                    </View>

                    { myProfile && (
                        <View>
                            <CustomButton 
                                color={ CustomColors.white }
                                passedFunction={ saveChanges }
                            >
                                Save
                            </CustomButton>

                            <OutlineButton 
                                passedOnFunction={() => navigation.goBack()}
                                color={ CustomColors.white }
                            >
                                Cancel
                            </OutlineButton>
                        </View>
                    )}

                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

export default MyProfileScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 16,
        justifyContent: 'flex-start',   
        alignItems: 'center',
        //borderColor: 'red',
        //borderWidth: 1,
    },
    errorMessageText: {
        color: CustomColors.error500,
        fontSize: 20,
        fontWeight: 'bold',
    },
    golferDataContainer: {
        width: '100%',
        height: '100%',
        paddingVertical: 12,
        justifyContent: 'flex-start',   
        alignItems: 'center',
        //borderColor: 'cyan',
        //borderWidth: 1,
    },
    golferImgContainer: {
        marginTop: 12,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 30,
        width: '90%',
    },
    golferImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    imgChangeAction: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 4,
        marginTop: 16,
        //borderColor: 'green',
        //borderWidth: 1,
    },
    imgChangeText: {
        fontSize: 16,
        color: CustomColors.white,
        marginRight: 8,
    },
    btnProfileImageChange: {
        width: '15%',
        backgroundColor: CustomColors.blue600,
        alignItems: 'center',
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 40,
        paddingVertical: 4,
    },
    //
    fullNameContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
    },
    labelText: {
        width: '100%',
        textAlign: 'left',
        color: CustomColors.white,
        fontSize: 16,
        paddingLeft: 12,
    },
    firstContainer: {
        width: '45%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    fullWidthContainer: {
        width: '100%',
        //borderColor: 'red',
        //borderWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        //paddingLeft: 12,
        marginBottom: 20,
    },
    inputContainer: {
        backgroundColor: CustomColors.blue050,
        width: '92%',
        paddingHorizontal: 12,
        paddingVertical: 2,
        marginTop: 4,
        marginHorizontal: 12,
        color: CustomColors.gray800,
        fontSize: 16,
        fontWeight: '600',
        borderRadius: 4,
        borderColor: CustomColors.white,
        borderWidth: 1,
    },
    unauthorized: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unauthorizedText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: CustomColors.error500,
    },
})