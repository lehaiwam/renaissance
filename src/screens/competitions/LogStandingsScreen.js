import React, {useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, ImageBackground, ActivityIndicator, FlatList } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { db } from '../../firebaseConfig'
import { collection, query, getDocs } from "firebase/firestore";

import { CustomColors } from '../../constants/CustomColors'
import { currentCompetionStanding } from '../../util/competition-standing';
 import LogStandingsItem from '../../components/competitions/LogStandingsItem';

const LogStandingsScreen = ({ navigation, route }) => {  
    const bgImage = require('../../images/tiger-fist-pump.jpeg')
    const isFocused = useIsFocused()

    const [isLoading, setIsLoading] = useState(false)
    const [golferScores, setGolferScores] = useState([])

    const [errorMessage, setErrorMessage] = useState('')

    const { competition } = route.params

    //console.log('competition: ', competition)

    useEffect(() => {   
        // get all scores from the all-scores collection
        getAllScores = async() => {
            const arrayGolfers = []
            const q = query(collection(db, "all-scores"))
            const querySnapshot = await getDocs(q)
            if (querySnapshot.empty) {
                console.log('Empty ALL-SCORESS table? Impossible!!!')
                setErrorMessage('Empty ALL-SCORES table? Impossible!!!')
            } else {
                querySnapshot.forEach(async (doc) => {
                    //console.log(doc.id, " => ", doc.data().firstName, doc.data().lastName, doc.data().scores)
                    // read through all score iterations
                    let tmpScoresArray = []
                    doc.data().scores.forEach ( async (thisScore) => {                          
                        if ( competition === 'stableford' &&  thisScore.title.slice(0,3) === 'ips') {
                            tmpScoresArray.push(thisScore.score)
                        }
                        if ( competition === 'medal' && thisScore.title.slice(0,3) === 'med') {
                            tmpScoresArray.push(thisScore.score)
                        }
                    })

                    const overallScore = currentCompetionStanding( competition, tmpScoresArray )
                    arrayGolfers.push({
                        id: doc.id, 
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        scores: [...tmpScoresArray],
                        overallScore: overallScore,
                    })
                })

                if (competition === 'medal') {
                    //console.log('MEDAL: Sorting arrayGolfers array...')
                    arrayGolfers.sort( (p1, p2) => {
                        if (p1.overallScore < p2.overallScore) return -1;
                        if (p1.overallScore > p2.overallScore) return 1;
                        return 0;
                    });
                }
                if (competition === 'stableford') {
                    //console.log('STABLEFORD: Sorting arrayGolfers array...')
                    arrayGolfers.sort( (p1, p2) => {
                        if (p1.overallScore < p2.overallScore) return 1;
                        if (p1.overallScore > p2.overallScore) return -1;
                        return 0;
                    });
                }
                // console.log('arrayGolfers: ', arrayGolfers)
                setGolferScores(arrayGolfers)
            }
            setIsLoading(false)
        }

        if (isFocused) {
            setIsLoading(true)
            getAllScores()
        }
    }, [isFocused])


    if (isLoading) {
        return(
            <View style={ styles.dataLoadingContainer }>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text style={styles.dataLoadingText}>Please be patient!</Text>
                <Text style={styles.dataLoadingText}>Fetching ALL SCORES data online...</Text>
            </View>
        )
    }

    return (
        <ImageBackground resizeMode='cover' style={styles.bgImage} source={ bgImage }>

            <View style={styles.mainContainer}>

                { errorMessage &&  <Text style={styles.errorTextMessage}>{errorMessage}</Text> }

                <View style={styles.headerContainer}> 
                    <Text style={styles.headerText}>2023 {competition}</Text>
                </View>

                <View style={styles.listContainer}> 
                    <FlatList 
                        data={ golferScores }
                        keyExtractor={(item) => item.id}
                        renderItem={  ({item}) => <LogStandingsItem item={item} competition={competition} /> } 
                    />
                </View>

            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        //alignSelf: 'center',
        width: '100%',
    },
    mainContainer: {
        flex: 1,
        // backgroundColor: CustomColors.blue050,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        //paddingVertical: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: CustomColors.gray600,
    },
    headerContainer: {
        height: '8%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //marginBottom: 4,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: CustomColors.gray800,
        textTransform: 'capitalize',
    },
    listContainer: {
        width: '100%',
        height: '82%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: CustomColors.blue050,
        borderRadius: 12,
        //marginBottom: 24,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: CustomColors.primary500,
    },
    //
    backButton: {
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.blue800,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 24,
        width: '50%',
        height: 35,
        marginTop: 20,
    },
    backButtonText: {
        color: CustomColors.white,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform:'capitalize',
        textAlign: 'center',
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
        color: CustomColors.green1000,
    },
    //  
    errorTextMessage: {
        color: CustomColors.error500,
        fontSize: 20,
        fontWeight: 'bold',
      },
})

export default LogStandingsScreen