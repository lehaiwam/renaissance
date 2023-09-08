import React, { useEffect ,useState, useContext } from 'react'
import { ImageBackground, ScrollView, KeyboardAvoidingView, 
         StyleSheet, Text, View, TextInput, Image } from 'react-native'

import {db} from '../../firebaseConfig'
import { doc, updateDoc } from "firebase/firestore"

import { AuthContext } from '../../util/auth-context'

import { CustomColors } from '../../constants/CustomColors'
import CustomButton from '../../components/UI/CustomButton'
import OutlineButton from '../../components/UI/OutlineButton'


const AdminMigsDetailsScreen = ({navigation, route}) => {

    const MEMBER = 1
    const OFFICIAL = 2
    const ADMINISTRATOR = 3

    const bgImage = require('../../images/login_background.jpeg')
    const golferImage = require('../../images/human.png')
    const authCtx = useContext(AuthContext);

    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState( '')
    const [cell, setCell] = useState('')
    const [email, setEmail] = useState('')
    const [authLevel, setAuthLevel] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    
    useEffect(() => {
        const { member} = route.params
        setId(member.id)
        setFirstName(member.firstName)
        setLastName(member.lastName)
        setCell(member.cell)
        setEmail(member.email)
        setAuthLevel(member.authLevel.toString())
        setErrorMessage('')
    }, [])


    const saveChanges = async () => {
        console.log('\n   Saving changes made to Member details...')
        console.log('      New MIGS data firstName : ', firstName)
    
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
                <View style={styles.scrollViewContainer} >

                
                    <ScrollView style={styles.scrollView}>

                        { errorMessage &&  <Text style={styles.errorTextMessage}>{errorMessage}</Text> }

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

                    </ScrollView>

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
    container: {
        flex: 1,
        //paddingVertical: 20,
        //justifyContent: 'center',   
        //alignItems: 'center',
        //paddingHorizontal: 12,
    },
    scrollViewContainer: {
        flex: 1,
        justifyContent: 'flex-start',   
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    scrollView: {
        width: '100%',
        height: '100%',
        paddingVertical: 10,
        //justifyContent: 'center',   
        //alignItems: 'center',
        //paddingHorizontal: 20,
    },
    errorMessageText: {
      color: CustomColors.error500,
      fontSize: 20,
      fontWeight: 'bold',
    },

    golferImgContainer: {
        marginTop: 12,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 30,
        width: '100%',
        height: '35%',
        
    },

    golferImage: {
        width: '70%',
        borderRadius: 150,
    },

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
    }

})