import React, { useEffect ,useState, useContext } from 'react'
import { ImageBackground, ScrollView, KeyboardAvoidingView, 
         StyleSheet, Text, View, TextInput, Image } from 'react-native'

import {db} from '../../firebaseConfig'
import { doc, updateDoc } from "firebase/firestore"

import { AuthContext } from '../../util/auth-context'

import { CustomColors } from '../../constants/CustomColors'
import CustomButton from '../../components/UI/CustomButton'
import OutlineButton from '../../components/UI/OutlineButton'
import { SafeAreaView } from 'react-native-safe-area-context'

const MEMBER = 1
const OFFICIAL = 2
const ADMINISTRATOR = 3

const AdminMigsDetailsScreen = ({navigation, route}) => {
    //const { member} = route.params
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
    const [registered, setRegistered] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const { member } = route.params
        setId(member.id)
        setImageUrl(member.imageUrl)
        setFirstName(member.firstName)
        setLastName(member.lastName)
        setCell(member.cell)
        setEmail(member.email)
        setAuthLevel(member.authLevel)
        setRegistered(member.registered)
        setErrorMessage('')
    }, [])


    const saveChanges = async () => {
        try {
            const migsRef = doc(db, "migs", id);
            await updateDoc(migsRef, { 
                firstName: firstName,
                lastName: lastName,
                email: email,
                cell: cell,
                authLevel: authLevel,
            })
        } catch (error) {
            console.log('Error on MIGS updateDoc(): ', error) 
        }
    
        // console.log('Successfully updated this MIGS record: ', lastName)
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
        <ImageBackground style={styles.bgImage} source={ bgImage }>
            <View style={styles.keypadContainer} >
           
            <KeyboardAvoidingView  
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >   
                { errorMessage &&  <Text style={styles.errorTextMessage}>{errorMessage}</Text> }

                <View style={styles.scrollView} >

                    <View style={styles.golferImgContainer}>
                        { !imageUrl  &&
                            <Image
                                style={styles.golferImage}
                                source={ defaultGolferImageUrl }
                            />               
                        }
                        { imageUrl &&
                            <Image
                                style={styles.golferImage}
                                source={{ uri: imageUrl }}
                            />
                        }
                    </View>

                   
                    <View style={styles.fullNameContainer}>
                        <View style={styles.halfWidthContainer}>
                            <Text style={styles.labelText}>First Name</Text>
                            <TextInput 
                                style={ styles.inputContainer }
                                value={firstName}
                                onChangeText={(value) => setFirstName(value)}
                            />
                        </View>

                        <View style={styles.halfWidthContainer}>
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
                            style={ [styles.inputContainer, registered && styles.inactive ]}
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
            </View>
        </ImageBackground>
    )
}

export default AdminMigsDetailsScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
    },
    keypadContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',   
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',   
        alignItems: 'center',
        marginBottom: 80,  
    },
    errorMessageText: {
        color: CustomColors.error500,
        fontSize: 20,
        fontWeight: 'bold',
    },




    scrollView: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'cyan',
        marginBottom: 12,
        justifyContent: 'flex-center',   
        alignItems: 'center',
    },
    contentContainer: {
        justifyContent: 'flex-center',   
        alignItems: 'center',
    },
    golferImgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 12,
        width: '60%',
        height: '36%',
        marginBottom: 16,
    },
    golferImage: {
        width: '90%',
        height: '90%',
        borderRadius: 40,
    },
    //
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
    halfWidthContainer: {
        width: '45%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    //
    fullWidthContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 12,
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
    inactive: {
        backgroundColor: CustomColors.error100,
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
})