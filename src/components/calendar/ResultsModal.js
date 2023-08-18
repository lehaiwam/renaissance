import { StyleSheet, Text, View, Pressable, Modal, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { CustomColors } from '../../constants/CustomColors'

import { db } from '../../firebaseConfig'
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";

const ResultsModal = ({ showResultsModal, setShowResultsModal, game }) => {
    const [gameScores, setGameScores] = useState([])
    const [ errorMessage, setErrorMessage] = useState('')
    

    useEffect(() => {
        // get the game's scores
        const getGameScores = async() => {
            const scoresArray = []
            const tableRef = collection(db, game.title)
            let querySnapshot 
            // in case of a medal game the least score is at the top
            if ( game.title.slice(0,3) === 'med' || game.title.slice(0,3) === 'tub') {
                querySnapshot = await getDocs(query( tableRef, where("score", "!=", 200), orderBy("score")));
            } else {
                querySnapshot = await getDocs(query( tableRef,  where("score", "!=", 0), orderBy("score", "desc")));
            }
            
            if (querySnapshot.empty) {
                // console.log('Scores not captured yet! Apologies.')
                setErrorMessage('Scores not captured yet! Apologies.')
            } else {
                let position = 0
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    position++
                    scoresArray.push({
                        position: position,
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        score:  doc.data().score,
                    })
                });
            }
            setGameScores(scoresArray)
        }

        getGameScores()

    }, [])

    return (
        <Modal  
            visible={showResultsModal} 
            transparent={true}
            animationType='fade'
            hardwareAccelerated
        >

            <View style={styles.centeredModal}>
                <View style={styles.modal}>
                    <View style={styles.gameInfo}>
                        <View style={styles.infoTop}>                 
                            <Text style={[styles.gameText, styles.gameTitle]}>{ game.title }   RESULTS</Text>
                            <Text style={styles.gameText}>{ game.date }</Text>
                            <Text style={styles.gameText}>@ { game.course }</Text>
                        </View>
                    </View>

                    { errorMessage &&
                        <View style={styles.errorTextContainer}>                   
                            <Text style={styles.errorTextMessage}>{ errorMessage }</Text> 
                        </View> 
                    }        
                    
                    { !errorMessage &&
                        <View style={styles.listContainer}> 
                            <FlatList 
                                data={ gameScores }
                                keyExtractor={(item) => item.position}
                                renderItem={({ item }) => {
                                    return (
                                        <Text style={styles.itemText}>{item.position}. {item.firstName} {item.lastName} ({item.score})</Text>
                                    )
                                }}
                            />
                        </View>
                    }

                    <View style={styles.actionsContainer}>
                        <Pressable style={styles.closeButton} onPress={ () => setShowResultsModal(!showResultsModal) } >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    centeredModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: CustomColors.gray200,
    },
    modal: {
        flex: 1,
        backgroundColor: CustomColors.blue050,
        opacity: 0.95,
        width: '80%',
        height: '75%',
        padding: 12,
        borderWidth: 3,
        borderColor: CustomColors.green800,
        borderRadius: 20,

    },
    gameInfo: {
        width: '100%',
        height: '15%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: CustomColors.blue050,
        borderRadius: 20,
        //borderWidth: 2,
        //borderColor: CustomColors.green800,
    },
    infoTop: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    gameTitle: {
        textTransform: 'uppercase',
    },
    gameText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: CustomColors.gray800,
    },
    errorTextMessage: {
        width: '90%',
        color: CustomColors.error500,
        fontSize: 20,
        fontWeight: 'bold',
        borderColor: CustomColors.error500,
        borderWidth: 1,
        padding: 8,
        textAlign: 'center',
    },
    listContainer: {
        backgroundColor: CustomColors.primary100,
        width: '100%',
        height: '75%',     
        borderRadius: 12, 
        padding: 12,
    },

    itemText: {
        fontSize: 16,
        fontWeight: '600',
    },
    actionsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '12%',
    },

    closeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.blue600,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 20,
        width: 150,
        height: 45,
    },
    closeButtonText: {
        color: CustomColors.white,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform:'capitalize',
        textAlign: 'center',
    },    
})

export default ResultsModal