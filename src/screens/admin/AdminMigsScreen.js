import React, { useEffect ,useState, useContext } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { ImageBackground, StyleSheet, Text, View, ActivityIndicator } from 'react-native'

import {db} from '../../firebaseConfig'
import { collection, query, orderBy, getDocs } from "firebase/firestore"

import { AuthContext } from '../../util/auth-context'

import LoadingOverlay from '../../components/UI/LoadingOverlay'
import { CustomColors } from '../../constants/CustomColors'
import AdminMigsList from '../../components/admin/AdminMigsList'

import IconButton from '../../components/UI/IconButton'

const AdminMigsScreen = ({navigation}) => {
    const MEMBER = 1
    const OFFICIAL = 2
    const ADMINISTRATOR = 3

    const bgImage = require('../../images/login_background.jpeg')
    const authCtx = useContext(AuthContext);

    // console.log('\n\n\n  Logged In User Username: ', authCtx.authUser.email)

    const [isLoading, setIsLoading] = useState(false)
    const [migs, setMigs] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    const isFocused = useIsFocused();

    useEffect(() => {
        // ADD addition button in the header....        
        const showAddIcon = async () => {

            navigation.setOptions({
                title: 'MIGS Maintenance',
                headerStyle: {
                    backgroundColor: CustomColors.blue050,
                },
                headerRight: ({tintColor}) => {
                    return (
                        <IconButton 
                            name={'person-add'}
                            size={24}
                            color={tintColor}
                            onPressIcon={ () => navigation.navigate('AdminAddNewMigs') }
                        />
                    )
                },
            }) 
        }

        // get all MIGS (Members In Good Standing)
        getAllMigs = async() => {
            const arrayMigs = []
            const q = query(collection(db, "migs"), orderBy("firstName"),)
            const querySnapshot = await getDocs(q)
            if (querySnapshot.empty) {
                console.log('Empty MIGS table? Impossible!!!')
                setErrorMessage('Empty MIGS table? Impossible!!!')
            } else {
                querySnapshot.forEach(async (doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data().firstName, doc.data().lastName, )
                    arrayMigs.push({
                        id: doc.id, 
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        email: doc.data().email,
                        cell: doc.data().cell,
                        authLevel:  doc.data().authLevel,
                        imageUrl: doc.data().imageUrl,
                        registered: doc.data().registered,
                    })
                })
                setMigs(arrayMigs)
            }
            setIsLoading(false)
        }

        if (isFocused &&  authCtx.authUser) {
            showAddIcon()
            setIsLoading(true)
            getAllMigs()
        }
        
    }, [isFocused])


    if ( authCtx.authLevel <= MEMBER ) {
        return (
            <View style={styles.notLoggedInContainer}>
                <Text stylele={styles.notLoggedInText}>  You are not authorized to access this functionality!!!</Text>
                <Text stylele={styles.notLoggedInText}>  Please, contact Club Captain or Application Admistrator.</Text>
            </View>
        )
    }
    
    // Not sure if this is necessary
    if (isLoading) {
        return(
            <View style={ styles.dataLoadingContainer }>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text style={styles.dataLoadingText}>Please be patient!</Text>
                <Text style={styles.dataLoadingText}>Fetching MIGS data online...</Text>
            </View>
        )
    }
    
   
    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>
            <View style={ styles.listContainer }>
                { errorMessage && <Text style={styles.errorMessageText}>{errorMessage}</Text> }
                <AdminMigsList migs={ migs } /> 
            </View>    
        </ImageBackground>
    )
}

export default AdminMigsScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
    },
    //
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
    //
    dataLoadingContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    dataLoadingText: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '800',
        color: CustomColors.green800,
    },
    //
    listContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        paddingHorizontal: 8, 
    },
    //
    errorMessageText: {
      color: CustomColors.error500,
      fontSize: 20,
      fontWeight: 'bold',
    },
})