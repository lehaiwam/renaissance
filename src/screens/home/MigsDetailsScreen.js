import React, { useEffect, useState, useContext } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Pressable, Text, View, TextInput, Image } from 'react-native'

import {db} from '../../firebaseConfig'
import { doc, updateDoc } from "firebase/firestore"

import { Entypo } from '@expo/vector-icons';

import { CustomColors } from '../../constants/CustomColors'
import CustomButton from '../../components/UI/CustomButton'
import OutlineButton from '../../components/UI/OutlineButton'
import { AuthContext } from '../../util/auth-context'

const MigsDetailsScreen = ({navigation, route}) => {

    const bgImage = require('../../images/login_background.jpeg')
    const golferImage = require('../../images/human.png')

    const authCtx = useContext(AuthContext);

    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState( '')
    const [cell, setCell] = useState('')
    const [cellVerified, setCellVerified] = useState(false)
    const [email, setEmail] = useState('')
    const [emailVerified, setEmailVerified] = useState(false)
    const [authLevel, setAuthLevel] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')

    let myProfile = false     // Initializing that user is NOT looking at his own profile

    const { member} = route.params
     console.log('\n   Member: ', member)

     /*
    useEffect(() => {
        console.log('useEffect() mounting MigsDetailsScreen...')
        const initForm = () => {
           
            setId(member.id)
            setFirstName(member.firstName)
            setLastName(member.lastName)
            setCell(member.cell)
            setCellVerified(member.cellVerified)
            setEmail(member.email)
            setEmailVerified(member.emailVerified)
            setErrorMessage('')
            
        }
        initForm()
    }, [])

    */

    const saveChanges = async () => {
        console.log('\n   Saving changes (only email & cellphone) made to MIGS...')
        console.log('      New MIGS cell & email: ', cell, + ' ' + email)

        /*
        try {
            const migsRef = doc(db, "migs", id);
            await updateDoc(migsRef, { 
                email: email,
                cell: cell,
            })
        } catch (error) {
            console.log('Error on MIGS updateDoc(): ', error) 
        }
    
        console.log('Successfully updated this MIGS record: ', lastName)
        navigation.navigate('Migs')
        */

    }


    const loadNewProfilePic = (value) => {
        console.log('\n   Loading a new profile picture...')




    }

    
    console.log( authCtx.authUser.email , member.email)
    
    if ( authCtx.authUser.email === member.email ) {
       myProfile = true
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
                            <input
                                type='file'
                                style={styles.golferImgContainer}
                                onPress={ loadNewProfilePic }
                            >
                                <Entypo name="upload" size={24} color="black" />
                                <Text>Wish to upload a new profile pic?</Text>
                            </input>
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

                        <View style={styles.fullWidthContainer}>
                            <Text style={styles.labelText}>Authorization Level</Text>
                            <TextInput 
                                style={ styles.inputContainer }
                                value={ authLevel.toString() }
                                onChangeText={(value) =>  processAuthLevel }
                            />
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

export default MigsDetailsScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',   
        alignItems: 'center',
    },
    errorMessageText: {
        color: CustomColors.error500,
        fontSize: 20,
        fontWeight: 'bold',
    },
    golferDataContainer: {
        // flex: 1,
        paddingVertical: 10,
        justifyContent: 'center',   
        alignItems: 'center',
        //paddingHorizontal: 20,
    },

    golferImgContainer: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 30,
        width: '100%',
        height: '35%',
    },
    golferImage: {
        width: '50%',
        borderRadius:16,
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

    otherContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    otherText: {
        fontSize: 16,
        fontWeight: '600',
        color: CustomColors.blue100,
    },
    notLoggedInContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notLoggedInText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: CustomColors.error500,
    },
})