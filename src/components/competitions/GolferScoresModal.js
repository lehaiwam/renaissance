import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'

import { CustomColors } from '../../constants/CustomColors'

const GolferScoresModal = ({ showGolferScoresModal,setShowGolferScoresModal, dataItem, competition }) => {
    
    // console.log(competition, scores, overallScore)

    return (
        <Modal  
            visible={ showGolferScoresModal } 
            transparent={ true }
            animationType='fade'
            hardwareAccelerated
        >
            <View style={styles.modal}>
                <View style={styles.header} >
                    <Text style={styles.headerText}>{dataItem.firstName} {dataItem.lastName}</Text>
                </View>

                <View style={styles.scoresContainer}>
                    {
                        dataItem.scores.map( (score, index) => {
                            return (
                                <View style={styles.scoreItemContainer}>
                                    <Text style={styles.gameDescription}>
                                        {competition}-{index+1} :
                                    </Text> 
                                    <Text style={styles.scoreText}>
                                        {score} 
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>

                <View style={styles.overallScoreContainer}>
                    <Text style={styles.overallTotalDescription} >Current Score: </Text>
                    <Text  style={styles.overallScoreText}>{ dataItem.overallScore }</Text>
                </View>

                <Pressable 
                    style={styles.closeButton} 
                    onPress={ () => {
                        setShowGolferScoresModal(false)
                    }}
                >
                    <Text style={styles.closeButtonText}>Close</Text>
                </Pressable> 

                <Text style={styles.notebeneText}>
                    NB: A score of 200 denotes, golfer was absent or game is still to be played 
                </Text>
            </View>
        </Modal>
    )
}

export default GolferScoresModal

const styles = StyleSheet.create({

    //
    modal: {
        flex: 1,
        backgroundColor: CustomColors.gray100,
        justifyContent: 'flex-start',
        alignItems: 'center',
        opacity: 0.95,
        width: '100%',
        paddingTop: 84,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: CustomColors.gray600,
    },

    header: {
        backgroundColor: CustomColors.blue050,
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        //height: '20%',
        borderWidth: 1,
        borderColor: CustomColors.white,
        borderRadius: 12,
        //marginBottom: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    headerText: {
        width: '100%',
        color: CustomColors.black,
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        //marginBottom: 4,
        textTransform: 'capitalize',
    },
    scoresContainer: {
        backgroundColor: CustomColors.blue050,
        width: '75%',
        //height: '20%',
        borderWidth: 1,
        borderColor: CustomColors.white,
        borderRadius: 12,
        marginVertical: 16,
        paddingVertical: 12,
    },
    scoreItemContainer: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    gameDescription: {
        width: '70%',
        color: CustomColors.black,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 4,
        textTransform: 'capitalize',
    },
    scoreText: {
        width: '30%',
        color: CustomColors.error500,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'left',
        marginBottom: 4,
        textTransform: 'capitalize',
    },
    overallScoreContainer: {
        backgroundColor: CustomColors.blue050,
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: CustomColors.white,
        borderRadius: 12,
        paddingVertical: 12,
    },
    overallTotalDescription: {
        width: '64%',
        color: CustomColors.black,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',  
    },
    overallScoreText: {
        width: '36%',
        color: CustomColors.error500,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'left',
        paddingLeft: 6,  
    },
    closeButton: {
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.blue800,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 24,
        width: '50%',
        height: 35,
        marginVertical: 16,
    },
    closeButtonText: {
        color: CustomColors.white,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform:'capitalize',
        textAlign: 'center',
    },  
    notebeneText: {
        color: CustomColors.white,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '800',
        paddingHorizontal: 16,
        marginTop: 16,
    },
})