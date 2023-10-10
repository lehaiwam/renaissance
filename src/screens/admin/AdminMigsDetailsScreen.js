import React, { useEffect ,useState, useContext } from 'react'
import { ImageBackground, ScrollView, KeyboardAvoidingView, 
         StyleSheet, Text, View, TextInput, Image } from 'react-native'

import {db} from '../../firebaseConfig'
import { doc, updateDoc } from "firebase/firestore"

import { AuthContext } from '../../util/auth-context'

import { CustomColors } from '../../constants/CustomColors'
import CustomButton from '../../components/UI/CustomButton'
import OutlineButton from '../../components/UI/OutlineButton'

const MEMBER = 1
const OFFICIAL = 2
const ADMINISTRATOR = 3

const AdminMigsDetailsScreen = ({navigation, route}) => {
    const { member} = route.params
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
        const { member } = route.params
        setId(member.id)
        setImageUrl(member.imageUrl)
        setFirstName(member.firstName)
        setLastName(member.lastName)
        setCell(member.cell)
        setEmail(member.email)
        setAuthLevel(member.authLevel.toString())
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
    
        console.log('Successfully updated this MIGS record: ', lastName)
        navigation.navigate('AdminMigs')
    }


    const processAuthLevel = (value) => {
        console.log('Value: ', value)

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

            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >                
                <View style={styles.displayWrapper}>
                    { errorMessage &&  <Text style={styles.errorTextMessage}>{errorMessage}</Text> }
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
            </KeyboardAvoidingView>
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
    container: {
        flex: 1,
        paddingVertical: 20,
        justifyContent: 'center',   
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    displayWrapper: {
        justifyContent: 'center',   
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingVertical: 16,
    },
    golferImgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 175,
        width: '62%',
        height: '35%',
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
        marginBottom: 16,
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