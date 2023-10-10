import { StyleSheet, Text, View, Pressable, Modal } from 'react-native'
import React from 'react'

import { CustomColors } from '../../constants/CustomColors'
import { createDbTables } from '../../util/initialize-db-tables'

const WarningModal = ({ showModal, setShowModal, message }) => {


    const initDatabaseHandler = async () => {
        console.log('   INITIALIZING DATABASE...')
        await createDbTables()
        setShowModal(false)
    }


    return (
        <Modal  
            visible={ showModal } 
            transparent={ false }
            animationType='fade'
            hardwareAccelerated
        >
            <View style={styles.centeredModal}>
                <View style={styles.modal}>
                    <View style={styles.warningImage}>
                        



                    </View>

                    <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>
                                {message}
                            </Text> 
                    </View>

                    <View style={styles.actionsContainer}>
                        <Pressable 
                            style={[styles.continueButton, ({pressed}) => pressed && styles.btnPressed]} 
                            onPress={ initDatabaseHandler }
                        >
                            <Text style={styles.continueButtonText}>continue</Text>
                        </Pressable>

                        <Pressable 
                            style={[styles.cancelButton, ({pressed}) => pressed && styles.btnPressed]} 
                            onPress={() => {
                                setShowModal(false)
                            }}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
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
    },
    modal: {
        // backgroundColor: CustomColors.blue050,
        opacity: 0.9,
        width: '100%',
        height: 250,
        padding: 16,
        borderWidth: 3,
        borderColor: CustomColors.green800,
        borderRadius: 20,
    },

    messageContainer: {
        width: '100%',
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
    },
    messageText: {
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
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    continueButton: {
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
    cancelButton: {
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

    continueButtonText: {
        color: CustomColors.white,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform:'capitalize',
        textAlign: 'center',
    },    
    cancelButtonText: {
        color: CustomColors.blue600,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform:'capitalize',
        textAlign: 'center',
    }, 
    btnPressed: {
        opacity: 0.45,
    },
})

export default WarningModal