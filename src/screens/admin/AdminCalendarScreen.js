import React, { useEffect ,useState, useContext } from 'react'
import { ImageBackground, StyleSheet, View, Text} from 'react-native'
import { useIsFocused } from '@react-navigation/native';

import { db } from '../../firebaseConfig'
import { collection, query, getDocs, orderBy } from "firebase/firestore";

import { AuthContext } from '../../util/auth-context'

import AdminCalendarList from '../../components/admin/AdminCalendarList';
import AdminCalendarItem from '../../components/admin/AdminCalendarItem';
import { CustomColors } from '../../constants/CustomColors';
import LoadingOverlay from '../../components/UI/LoadingOverlay';

const AdminCalendarScreen = ({ navigation, route }) => {
    const bgImage = require('../../images/login_background.jpeg')
    const [ games, setGames ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const isFocused = useIsFocused();

    const authCtx = useContext(AuthContext);

    useEffect( () => {
        // console.log('in useEffect() loading year schedule...')
        const loadYearSchedule = async () => {
            const arrayGames = []
            const querySnapshot = await getDocs( query(collection(db, "calendar"), orderBy("sequence")) )
            if (querySnapshot.empty) {
                console.log('Impossible! Empty CALENDAR?')
            } else {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshot
                    const newDate = doc.data().date.toString()
                    arrayGames.push({
                        id: doc.id, 
                        teeOff: doc.data().teeOff,
                        date: new Date(newDate).toDateString(),
                        title: doc.data().title,
                        course: doc.data().course,
                        status:  doc.data().status,
                        weekendAway: doc.data().weekendAway,
                    })
                });
                setGames(arrayGames)
            }
            setIsLoading(false)
        }

        if (isFocused && authCtx.authUser) { 
            setIsLoading(true)
            loadYearSchedule()
        }
    }, [ isFocused, authCtx.authUser ])


    if (!authCtx.authUser) {
        return (
            <View style={styles.notLoggedInContainer}>
                <Text stylele={styles.notLoggedInText}>  You need to be logged in to access this page!!!</Text>
            </View>
        )
    }

    if (isLoading) {
        return(
          <LoadingOverlay message={'Please be patient! Loading our year calendar...'}/>
        )
    }


    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>
            <View style={ styles.listContainer }>
                <AdminCalendarList userId= { authCtx.id } games={ games } /> 
            </View>
        </ImageBackground>
    )
}

export default AdminCalendarScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
    },
    listContainer: {
        width: '100%',
        height: '100%',
        paddingVertical: 20,
        paddingHorizontal: 12,
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