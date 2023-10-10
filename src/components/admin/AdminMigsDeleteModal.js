
import React from 'react'
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { CustomColors } from '../../constants/CustomColors'

const AdminMigsDeleteModal = ({ confirmActionModal, setConfirmActionModal, deleteMigs, golfer }) => {
    
    const navigation = useNavigation()

    const handleDeleteMigs = () => {
        console.log('Calling the deleteMigs, passing paramenter ', golfer.id)
        deleteMigs(golfer.id) 
        navigation.goBack()
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
                    
                    <View style={styles.golferInfo}>
                        <Text style={styles.nameText}>{ golfer.firstName } { golfer.lastName }</Text>
                    </View>

                    <View style={styles.question}>
                        <Text style={styles.questionText}>
                            You are about to delete MIGS record for this golfer?
                        </Text> 
                    </View>

                    <View style={styles.actionsContainer}>
                        <Pressable style={styles.yesButton} onPress={ handleDeleteMigs } >
                            <Text style={styles.yesButtonText}>Yes</Text>
                        </Pressable>
                        <Pressable style={styles.noButton} onPress={() => setConfirmActionModal(false) } >
                            <Text style={styles.noButtonText}>No</Text>
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
        backgroundColor: CustomColors.gray100,
        justifyContent: 'flex-start',
        alignItems: 'center',
        opacity: 0.8,
        width: '90%',
        height: '40%', //300,
        padding: 20,
        borderWidth: 3,
        borderColor: CustomColors.error500,
        borderRadius: 20,
    },
    golferInfo: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.blue050,
        borderRadius: 20,
        marginBottom: 12,
        paddingVertical: 4,
        borderWidth: 2,
        borderColor: CustomColors.error500,
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: CustomColors.gray800,
    },
    question: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
    },
    questionText: {
        //color: CustomColors.blue600,
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
        color: CustomColors.error500,
    },
    actionsContainer: {
        //flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: 8,
    },

    yesButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.blue800,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 24,
        width: '85%',
        height: 35,
        marginBottom: 4,
    },
    noButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:CustomColors.white,
        borderColor: CustomColors.blue600,
        borderWidth: 2,
        borderRadius: 24,
        width: '85%',
        height: 35,
        marginTop: 4,
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

export default AdminMigsDeleteModal