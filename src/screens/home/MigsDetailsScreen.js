import React, { useEffect, useState, useContext } from 'react'
import { ImageBackground, StyleSheet, Text, View, FlatList, Image, ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { AuthContext } from '../../util/auth-context'

import { db } from '../../firebaseConfig'
import { collection,  query, doc, getDoc } from "firebase/firestore"

import ScoreItem from '../../components/migs/ScoreItem'
import { CustomColors } from '../../constants/CustomColors'
import CustomButton from '../../components/UI/CustomButton'
import OutlineButton from '../../components/UI/OutlineButton'
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import { currentCompetionStanding } from '../../util/competition-standing'


const MigsDetailsScreen = ({navigation, route}) => {
    const bgImage = require('../../images/login_background.jpeg')
    const defaultGolferImage = require('../../images/human.png')

    const authCtx = useContext(AuthContext)

    const isFocused = useIsFocused()
    const [isLoading, setIsLoading] = useState(false)    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState( '')
    const [medalScores, setMedalScores] = useState([])
    const [ipsScores, setIpsScores] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [overallMedalScore, setOverallMedalScore] = useState([])
    const [overallIpsScore, setOverallIpsScore] = useState([])

    const { member} = route.params
    
    // console.log('\n   Member: ', member)
    
    useEffect(() => {

        const getCompetitionsScores = async() => {
            const arrayMedalScores = []
            const arrayIpsScores = []

            // get one document.....
            const docRef = doc(db, "all-scores", member.id)
            const docSnap = await getDoc(docRef)

            if (!docSnap.exists()) {
                console.log('ALL-SCORES record not found for ', + member.firstName + ' ' + member.lastName + '!!!')
                setErrorMessage('ALL-SCORES record not found for ', + member.firstName + ' ' + member.lastName + '!!!')
            } else {
                // console.log( docSnap.id, " => ", docSnap.data())
                for ( let iCount=0; iCount<docSnap.data().scores.length; iCount++ ) {
                    if (docSnap.data().scores[iCount].title.slice(0,3) === 'med') { 
                        arrayMedalScores.push({
                            id: iCount,
                            title: docSnap.data().scores[iCount].title,
                            score: docSnap.data().scores[iCount].score
                        })
                    } 

                    if (docSnap.data().scores[iCount].title.slice(0,3) === 'ips') { 
                        arrayIpsScores.push({
                            id: iCount,
                            title: docSnap.data().scores[iCount].title,
                            score: docSnap.data().scores[iCount].score
                        }) 
                    }
                }
            
                setMedalScores(arrayMedalScores)
                setIpsScores(arrayIpsScores)

                setFirstName(docSnap.data().firstName)
                setLastName(docSnap.data().lastName)

                //setOverallMedalScore( currentCompetionStanding('medal', medalScores) )
                //setOverallIpsScore( currentCompetionStanding('stableford', ipsScores) )
            }
            setIsLoading(false)
        }

        if (isFocused) {
            setIsLoading(true)
            getCompetitionsScores()
        }
        
    }, [isFocused])


    if (isLoading) {
        return (
            <LoadingOverlay message={'Please be patient! Fetching SCORES data online...'} />
        )
    }

    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>
            <View 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                { errorMessage && <Text style={styles.errorMessageText}>{errorMessage}</Text> }

                <View style={styles.golferDataWrapper}>
                    { !member.imageUrl  &&
                        <Image
                            style={styles.golferImage}
                            source={ defaultGolferImage }
                        />               
                    }
                    { member.imageUrl &&
                        <Image
                            style={styles.golferImage}
                            source={{ uri: member.imageUrl }}
                        />
                    }                            
                    <Text style={ styles.nameText }>
                        { firstName } { lastName }
                    </Text>
                </View>

                <View style={styles.ipsListContainer}>
                    <Text style={ styles.gameTypeHeader }>
                        IPS Games: 
                    </Text>

                    <FlatList 
                        data={ ipsScores }
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <ScoreItem gameScoreData={ item } />
                            )
                        }}
                    />

                    <Text style={ styles.overallScore }>
                       {overallIpsScore}
                    </Text>

                </View>
                
                <View style={styles.medalListContainer}>
                    <Text style={ styles.gameTypeHeader }>
                        Medal Games: 
                    </Text>

                    <FlatList 
                        data={ medalScores }
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <ScoreItem gameScoreData={ item } />
                            )
                        }}
                    />

                    <Text style={ styles.overallScore }>
                       {overallMedalScore}
                    </Text>
                </View>
                
            </View>
        </ImageBackground>
    )
}

export default MigsDetailsScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignSelf: 'cover',
    },
    container: {
        width: '100%',
        height: '90%',
        paddingHorizontal: 16,
        justifyContent: 'flex-start',   
        alignItems: 'center',
        paddingBottom: 16,
    },
    golferDataWrapper: {
        height: '30%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',   
    },
    //
    ipsListContainer: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        width: '100%',
        height: '30%',
        borderColor: 'cyan',
        borderWidth: 2, 
        borderRadius: 12,
        marginBottom: 8,
    },
    medalListContainer: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        width: '100%',
        height: '40%',
        borderColor: 'cyan',
        borderWidth: 2,
        borderRadius: 12,
    },
    //
    errorMessageText: {
        width: '90%',
        color: CustomColors.error500,
        fontSize: 20,
        fontWeight: 'bold',
        borderColor: CustomColors.error500,
        borderWidth: 1,
        padding: 8,
        textAlign: 'center',
    },
    golferImage: {
        width: '50%',
        height: '80%',
        borderRadius: 135,
    },
    nameText: {
        backgroundColor: CustomColors.blue050,
        textAlign: 'center',
        width: '60%',
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
    gameGoupWrapper: {
        height: '70%',
        width: '100%',
        marginTop: 16,
        opacity: 0.85,
        borderColor: 'red',
        borderWidth: 2,
    },
    contentContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    gameTypeHeader : {
        backgroundColor: CustomColors.blue050,
        textAlign: 'left',
        width: '40%',
        paddingHorizontal: 12,
        paddingVertical: 2,
        color: CustomColors.gray800,
        fontSize: 16,
        fontWeight: '800',
        borderRadius: 4,
        borderColor: CustomColors.white,
        borderWidth: 2,
    },

})