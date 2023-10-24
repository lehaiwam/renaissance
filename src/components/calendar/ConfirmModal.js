import { StyleSheet, Text, View, Pressable, Modal } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { db } from '../../firebaseConfig'
import { doc, getDoc, updateDoc } from "firebase/firestore"

import { CustomColors } from '../../constants/CustomColors'
// import { sendConfirmStatusSMS } from '../../util/sendSMSNotifications'

const ConfirmModal = ({ confirmActionModal, setConfirmActionModal, userId, game }) => {
    const [currConfirmedStatus, setCurrConfirmedStatus] = useState(undefined)
    const navigation = useNavigation()

    useLayoutEffect(() => {

        const getCurrentConfirmedStatus = async () => {
            // get the user's record from the table to determine if already confirmed
            try {
                // update boolean field "confirmed" field to "true" or "false"
                const docSnap = await getDoc( doc( db, game.title, userId ))
                if (docSnap.exists()) {
                    setCurrConfirmedStatus( docSnap.data().confirmed )
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log('This golfer has no record in this DB TABLE: ', game.title)
                }
                return
            } catch (error) {
                console.log('Failed getDoc(): ', error)
            } 
        }
        getCurrentConfirmedStatus()
    }, [])

    const toggleConfirmedStatus = async () => { 
        try {
            await updateDoc( doc( db, game.title, userId ), {
                confirmed: !currConfirmedStatus,
            })
            // send an SMS to tyourself and the Captain COMMENTED FOR NOW
            // sendConfirmStatusSMS(!currConfirmedStatus, game)

            setConfirmActionModal(false)
            navigation.navigate('Calendar')
        } catch (error) {
            console.log('Failed updateDoc() confirmed : ', error)
            setConfirmActionModal(false)
        }  
    }
   
    return (
        <Modal  
            visible={ confirmActionModal } 
            transparent={ true }
            animationType='fade'
            hardwareAccelerated
        >
            <View style={styles.centeredModal}>
                <View style={styles.modal}>
                    
                    <View style={styles.gameInfo}>
                        <View style={[styles.gameText, styles.titleDateContainer]}>
                            <Text style={[styles.gameText, styles.gameTitle]}>{ game.title }</Text>
                            <Text style={styles.gameText}>{ game.date }</Text>
                        </View>
                        <Text style={styles.gameText}>{ game.course }</Text>
                    </View>

                    { currConfirmedStatus && 
                        <>
                        <View style={styles.question}>
                            <Text style={styles.questionText}>
                                You are already confirmed!
                            </Text> 
                            <Text style={styles.questionText}>
                                Do you wish to cancel?
                            </Text>
                        </View>

                        <View style={styles.actionsContainer}>
                            <Pressable style={styles.yesButton} onPress={ toggleConfirmedStatus } >
                                <Text style={styles.yesButtonText}>Yes</Text>
                            </Pressable>
                            <Pressable style={styles.noButton} onPress={() => setConfirmActionModal(false) } >
                                <Text style={styles.noButtonText}>No</Text>
                            </Pressable>
                        </View>
                        </>
                    }

                    { !currConfirmedStatus && 
                        <>
                        <View style={styles.question}>
                            <Text style={styles.questionText}>
                                Are you joining us?
                            </Text> 
                        </View>

                        <View style={styles.actionsContainer}>
                            <Pressable style={styles.yesButton} onPress={ toggleConfirmedStatus } >
                                <Text style={styles.yesButtonText}>Yes</Text>
                            </Pressable>
                            <Pressable style={styles.noButton} onPress={() => setConfirmActionModal(false) } >
                                <Text style={styles.noButtonText}>No</Text>
                            </Pressable>
                        </View>
                        </>
                    }
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
        backgroundColor: CustomColors.white,
        opacity: 0.9,
        width: '95%',
        height: '40%', //300,
        padding: 16,
        borderWidth: 3,
        borderColor: CustomColors.green800,
        borderRadius: 20,
    },
    gameInfo: {
        width: '100%',
        height: '30%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: CustomColors.blue100,
        borderRadius: 12,
        marginBottom: 16,
        //borderWidth: 2,
        //borderColor: CustomColors.green800,
    },
    titleDateContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: CustomColors.gray800,
    },
    gameTitle: {
        textTransform: 'uppercase',
    },
    question: {
        width: '100%',
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
    },
    questionText: {
        //color: CustomColors.blue600,
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
        color: CustomColors.error500,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        //height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
    },
    yesButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.blue800,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 24,
        width: 100,
        height: 40,
        marginRight: 4,
    },
    noButton: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'invisible',
        borderColor: CustomColors.blue600,
        borderWidth: 2,
        borderRadius: 24,
        width: 100,
        height: 40,
        marginLeft: 4,
    },
    yesButtonText: {
        color: CustomColors.white,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform:'capitalize',
        textAlign: 'center',
    },    
    noButtonText: {
        color: CustomColors.blue600,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform:'capitalize',
        textAlign: 'center',
    }, 
})

export default ConfirmModal