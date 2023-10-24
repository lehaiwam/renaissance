import React, { useEffect ,useState, useContext } from 'react'
import { ImageBackground, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { db } from '../../firebaseConfig'
import { collection, query, orderBy, getDocs } from "firebase/firestore";

import { AuthContext } from '../../util/auth-context'

import { CustomColors } from '../../constants/CustomColors'
import CustomButton from '../../components/UI/CustomButton'
import OutlineButton from '../../components/UI/OutlineButton'
import MigsList from '../../components/migs/MigsList'

const MigsScreen = ({navigation}) => {
    const bgImage = require('../../images/login_background.jpeg')
    const authCtx = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false)
    const [migs, setMigs] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    const isFocused = useIsFocused()

    if ( !authCtx) {
        console.log('Not Authorized! User not authenticated!!!')
        return 
    }

    useEffect(() => {   
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
                    // console.log(doc.id, " => ", doc.data())
                    arrayMigs.push({
                        id: doc.id, 
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        email: doc.data().email,
                        cell: doc.data().cell,
                        imageUrl: doc.data().imageUrl,
                    })
                })
                setMigs(arrayMigs)
            }
            setIsLoading(false)
        }

        if (isFocused) {
            setIsLoading(true)
            getAllMigs()
        }
    }, [isFocused])


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
                <MigsList migs={ migs } /> 
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
        paddingBottom: 64,
    },
    //
    errorMessageText: {
      color: CustomColors.error500,
      fontSize: 20,
      fontWeight: 'bold',
    },
})