import React, { useState, useContext, Profiler } from 'react'
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../util/auth-context'
import { CustomColors } from '../../constants/CustomColors'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MigsItem = ({ member }) => {
    const authCtx = useContext(AuthContext)
    const defaultGolferImageUrl = require('../../images/human.png')

    const navigation = useNavigation()
    
    // const profileGolferImageUrl =  'https://console.firebase.google.com/project/renaissance-5112a/storage/renaissance-5112a.appspot.com/files/profile-images'
    // profileGolferImageUrl = profileGolferImageUrl + authCtx.firstName + '-' + authCtx.lastName + '.jpg'








    return (
        <Pressable 
            style={ ({pressed}) => [styles.itemContainer, pressed && styles.pressed ]}
            onPress={ () => navigation.navigate('MigsDetails', { member: member }) }>

            <View style={styles.golferImgContainer}>
                <Image
                    style={styles.golferImage}
                    source={ defaultGolferImageUrl }
                />
            </View>

            <View style={styles.nameContainer}>
                <Text style={[styles.baseText, styles.firstName]}>{ member.firstName}</Text>
                <Text style={[styles.baseText]}>{ member.lastName }</Text>  
            </View>
            <View style={styles.cellEmail}>
                <MaterialCommunityIcons name="cellphone-wireless" size={24} color="black" />
                <Text style={[styles.baseText, styles.cellEmailText]}> {member.cell} </Text> 
            </View>
            <View style={styles.cellEmail}>
                <MaterialCommunityIcons name="email" size={24} color="black" />
                <Text style={[styles.baseText, styles.cellEmailText]}> {member.email} </Text> 
            </View>
        </Pressable>
    )
}    
    
export default MigsItem

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        //height: '25%',
        backgroundColor: '#e7eced',
        opacity: 0.5,
        marginVertical: 8,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 16,
        //paddingVertical: 8,
    },
    golferImgContainer: {
        width: '90%',
       // height: 120,
        marginTop: 4,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        //borderColor: CustomColors.white,
        //borderWidth: 2,
        borderRadius: 10,
        //width: 40,
        //height :40,

        borderColor: 'green',
        borderWidth: 1,
    },

    golferImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'green',
        borderWidth: 1, 
    },

    nameContainer: {
        width: '90%',
        //height: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,

        borderColor: 'red',
        borderWidth: 1,
    },
    firstName: {
        marginRight: 12,
    },
    //
    cellEmail: {
        width: '90%',
       // height: '15',   
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //paddingLeft: 44,
        paddingVertical: 4,

        borderColor: 'red',
        borderWidth: 1,
    },
    baseText: {
        color: 'black',
        textAlign: 'left',
        //marginRight: 12,
        fontWeight: '800',
    },
    cellEmailText: {
        marginLeft: 8,
    },


    ////
    topText: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    bottomText: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
        paddingHorizontal: 8,
    },

    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: CustomColors.blue600,
    },
    timeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: CustomColors.error500,
        textAlign: 'right',
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: CustomColors.primary800,
        textTransform: 'uppercase',
        textAlign: 'left',
    },
    courseText: {
        //width: '70%',
        fontSize: 16,
        color: CustomColors.primary500,
        fontWeight: '800',
    },

    button:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.blue600,
        elevation: 1,
        borderColor: CustomColors.white,
        borderWidth: 1,
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
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '800',
        color: CustomColors.white,
    },
    pressed: {
        opacity: 0.5,
    },    
})