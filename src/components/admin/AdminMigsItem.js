import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { db } from '../../firebaseConfig'
import { doc, deleteDoc } from "firebase/firestore"

// import ConfirmModal from './ConfirmModal'
import AdminMigsDeleteModal from './AdminMigsDeleteModal'
import { CustomColors } from '../../constants/CustomColors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

const AdminMigsItem = ({ member }) => {
    const [ confirmActionModal, setConfirmActionModal] = useState(false)

    const navigation = useNavigation()

    const deleteMigs = async (golferId) => {

        try {
            await deleteDoc(doc(db, "migs", golferId))
        } catch (error) {
            console.log('Error on deleteDoc(): ', error) 
        }
        console.log('Successfully deleted this MIGS record: ', member)
    }

    return (
        <View style={styles.itemContainer}>

            <AdminMigsDeleteModal 
                confirmActionModal={ confirmActionModal }
                setConfirmActionModal={setConfirmActionModal}
                deleteMigs={ deleteMigs }
                golfer={ member }
            />

            <View style={styles.name}>
                <Text style={[styles.nameText]}>{ member.firstName } { member.lastName } </Text> 
            </View>

            <View style={styles.metaData}>
                <Text style={[styles.baseText, styles.titleText]}>{ member.cell }</Text>
                <Text style={[styles.baseText, styles.dateText]}>{ member.email }</Text>    
            </View>

            <View style={styles.actions}>
                <Pressable
                    style={ ({pressed}) => [ styles.button, styles.editButton, pressed && styles.pressed ]}
                    onPress={ () => navigation.navigate('AdminMigsDetails', { member: member }) }>
                    <MaterialCommunityIcons name="account-edit-outline" size={20} color="white" />
                    <Text style={styles.buttonText}>Edit</Text>
                </Pressable>

                <Pressable 
                    style={ ({pressed}) => [ styles.button, styles.deleteButton, pressed && styles.pressed ]}
                    onPress={ () => setConfirmActionModal(true) }>
                    <MaterialIcons name="delete-outline" size={20} color="white" />
                    <Text style={styles.buttonText}>Delete</Text>
                </Pressable>  
            </View>

        </View>
    )
}    
    
export default AdminMigsItem

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        backgroundColor: CustomColors.blue100,
        marginVertical: 8,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 20,
        padding: 4,
    },
    name: {
        flexDirection: "row",
        justifyContent: 'space-around',
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    metaData: {
        flexDirection: "row",
        justifyContent: 'space-around',
    },
    actions: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 4,
        paddingHorizontal: 8,
    },
    editButton:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 1,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 28,
        width: '25%',
        paddingHorizontal: 8,
        paddingVertical: 4,
        /*
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowOffset: {width:1, height: 1},
        shadowRadius: 2,
        */
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 1,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 28,
        width: '30%',
        paddingHorizontal: 8,
        paddingVertical: 4,
        /*
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowOffset: {width:1, height: 1},
        shadowRadius: 2,
        */
    },
    editButton:{
        backgroundColor: CustomColors.blue600,
    },
    deleteButton:{
        backgroundColor: CustomColors.error500,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '800',
        color: CustomColors.white,
    },
    pressed: {
        opacity: 0.6,
    },    
})