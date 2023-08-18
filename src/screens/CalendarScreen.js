import React, { useEffect ,useState } from 'react'
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native';

import { db } from '../firebaseConfig'
import { collection, query, getDocs, orderBy } from "firebase/firestore";

import CalendarList from '../components/calendar/CalendarList';
import { CustomColors } from '../constants/CustomColors';

const CalendarScreen = ({ navigation, route }) => {
    const bgImage = require('../images/login_background.jpeg')
    const [ games, setGames ] = useState([])
    const isFocused = useIsFocused();

    const user = route.params.user

    useEffect( () => {
        // console.log('in useEffect() loading year schedule...')
        const loadYearSchedule = async () => {
            const arrayGames = []
            const querySnapshot = await getDocs( query(collection(db, "calendar"), orderBy("sequence")) )
            if (querySnapshot.empty) {
                console.log('Impossible! Empty CALENDAR?')
                return
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
        }

        if (isFocused) { 
            loadYearSchedule()
        }
    }, [ isFocused ])

    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>
            <View style={ styles.listContainer }>
                <CalendarList user={ user } games={ games } /> 
            </View>
        </ImageBackground>
    )
}

export default CalendarScreen

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
})