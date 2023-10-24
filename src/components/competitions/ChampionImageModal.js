import React from 'react'
import { StyleSheet, Text, View, Pressable, Modal, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CustomColors } from '../../constants/CustomColors'

const ChampionImageModal = ({ showChampionImageModal, setShowChampionImageModal, golferName, imageUrl }) => {
    
    const navigation = useNavigation()
    
    return (
        <Modal  
            visible={ showChampionImageModal } 
            transparent={ true }
            animationType='fade'
            hardwareAccelerated
        >
            <View style={styles.centeredModal}>
                <View style={styles.modal}>

                    <Image 
                        style={styles.image}
                        source={ imageUrl }
                        resizeMode='contain'
                    />

                    <View style={styles.golferInfo}>
                        <Text style={styles.nameText}>{ golferName }</Text>
                    </View>

                    
                    <Pressable 
                        style={styles.closeButton} 
                        onPress={ () => {
                            setShowChampionImageModal(false)
                        }}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </Pressable>
                         
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    centeredModal: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.blue050,
    },
    modal: {
        backgroundColor: CustomColors.gray100,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.95,
        width: '100%',
        height: '100%',
        padding: 12,
    },
    image: {
        width: 350,
        height: 350,
        marginVertical: 4,
        borderWidth: 2,
        borderColor: CustomColors.white,
        borderRadius: 20,
    },
    golferInfo: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.white,
        borderRadius: 12,
        marginBottom: 24,
        paddingVertical: 4,
        borderWidth: 2,
        borderColor: CustomColors.white,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: CustomColors.gray800,
    },
    closeButton: {
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
    closeButtonText: {
        color: CustomColors.white,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform:'capitalize',
        textAlign: 'center',
    },     
})

export default ChampionImageModal