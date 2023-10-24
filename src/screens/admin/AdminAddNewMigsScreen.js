import React, { useEffect ,useState, useContext } from 'react'
import { ImageBackground, ScrollView, KeyboardAvoidingView, 
         StyleSheet, Text, View, TextInput, Image } from 'react-native'

import {db} from '../../firebaseConfig'
import { collection, addDoc } from "firebase/firestore"

import { AuthContext } from '../../util/auth-context'

import { CustomColors } from '../../constants/CustomColors'
import CustomButton from '../../components/UI/CustomButton'
import OutlineButton from '../../components/UI/OutlineButton'
import { SafeAreaView } from 'react-native-safe-area-context'

const MEMBER = 1
const OFFICIAL = 2
const ADMINISTRATOR = 3

const AdminAddNewMigssScreen = ({navigation, route}) => {
    // const { member} = route.params
    const bgImage = require('../../images/login_background.jpeg')
    const defaultGolferImageUrl = require('../../images/human.png')
    const authCtx = useContext(AuthContext);

    const [id, setId] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState( '')
    const [cell, setCell] = useState('')
    const [email, setEmail] = useState('')
    const [authLevel, setAuthLevel] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => { 
        setId('')
        setImageUrl('')
        setFirstName('')
        setLastName('')
        setCell('')
        setEmail('')
        setAuthLevel('')
        setErrorMessage('')           

    }, [])

    const saveChanges = async () => {
        try {
            const migsRef = collection(db, "migs")
            const docRef = await addDoc(migsRef, { 
                firstName: firstName,
                lastName: lastName,
                email: email,
                cell: cell,
                authLevel: authLevel,
                imageUrl: '',
                cellVerified: false,
                emailVerified: false,
                registered: false,
            })
            console.log('Successfully added new MIGS record, id : ', docRef.id)

        } catch (error) {
            console.log('Error on MIGS setDoc(): ', error) 
        }

        navigation.navigate('AdminMigs')
    }


    if ( authCtx.authLevel <= MEMBER ) {
        return (
            <View style={styles.notLoggedInContainer}>
                <Text stylele={styles.notLoggedInText}>  You are not authorized to access this functionality!!!</Text>
                <Text stylele={styles.notLoggedInText}>  Please, contact Club Captain or Application Admistrator.</Text>
            </View>
        )
    }

    return ( 

            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >                
                <View style={styles.displayWrapper}>

                    { errorMessage &&  <Text style={styles.errorTextMessage}>{errorMessage}</Text> }
                    <View style={styles.golferImgContainer}>
                        <Image
                            style={styles.golferImage}
                            source={ defaultGolferImageUrl }
                        />               
                    </View>

                    <View style={styles.fullNameContainer}>
                        <View style={styles.firstContainer}>
                            <Text style={styles.labelText}>First Name</Text>
                            <TextInput 
                                style={ styles.inputContainer }
                                placeholder='first name'
                                value={firstName}
                                onChangeText={(value) => setFirstName(value)}
                            />
                        </View>

                        <View style={styles.firstContainer}>
                            <Text style={styles.labelText}>Last Name</Text>
                            <TextInput 
                                style={ styles.inputContainer }
                                value={lastName}
                                placeholder='last name'
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
                            placeholder='cellphone'
                            onChangeText={(value) => {
                                setErrorMessage('')
                                setCell(value)
                            }}
                        />
                    </View>

                    <View style={styles.fullWidthContainer}>
                        <Text style={styles.labelText}>Email</Text>
                        <TextInput 
                            style={ styles.inputEmail }
                            value={ email }
                            placeholder='email'
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
                            placeholder='auth-level, 1 or 2'
                            value={ authLevel }                           
                            onChangeText={(value) => {
                                setErrorMessage('')
                                setAuthLevel(value)
                            }}
                        />
                    </View>

                    <CustomButton 
                        color={ CustomColors.white }
                        passedFunction={ saveChanges }
                    >
                        Save
                    </CustomButton>

                    <View style={styles.outlineBtnContainer}>                    
                        <OutlineButton 
                            passedOnFunction={() => navigation.goBack()}
                            color={ CustomColors.white }
                        >
                            Cancel
                        </OutlineButton>
                    </View>

                </View>
            </KeyboardAvoidingView>
       
    )
}

export default AdminAddNewMigssScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
    },
    container: {
        backgroundColor: CustomColors.blue100,
        flex: 1,
        //paddingVertical: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    displayWrapper: {
        justifyContent: 'center',   
        alignItems: 'center',
        width: '100%',
        height: '88%',
        //paddingVertical: 16,
        borderWidth: 1,
        borderColor: CustomColors.white,
    },
    golferImgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 175,
        width: '58%',
        height: '32%',
    },
    golferImage: {
        width: '90%',
        height: '90%',
        borderRadius: 250,
    },

    fullNameContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 16,
    },  
    inputContainer: {
        backgroundColor: CustomColors.white,
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
        textTransform: 'capitalize',
    },
    inputEmail: {
        backgroundColor: CustomColors.white,
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
        textTransform: 'lowercase',

    },
    outlineBtnContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    //
    errorMessageText: {
        color: CustomColors.error500,
        fontSize: 20,
        fontWeight: 'bold',
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