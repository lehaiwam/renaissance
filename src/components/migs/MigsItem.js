import React, { useState, useContext, Profiler, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../util/auth-context'
import { CustomColors } from '../../constants/CustomColors'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MigsItem = ({ member }) => {
    const authCtx = useContext(AuthContext)
    const defaultGolferImageUrl = require('../../images/human.png')
    const navigation = useNavigation()
    
    const { imageUrl } = member
    
    let reformattedCell = ''

    useEffect (() => {
        const reformattCell = () => {
            const strCell = member.cell
            const part1 = strCell.slice(1, 3)
            const part2 = strCell.slice(3, 6)
            const part3 = strCell.slice(6, 10)
            /*
            console.log('+27 '+ part1 + ' ' + part2 + ' '+ part3)
            reformattedCell = '+27 '+part1+' '+part2+' '+part3
            */
        }
        reformattCell()
    })

    return (
        <Pressable 
            style={ ({pressed}) => [styles.itemContainer, pressed && styles.pressed ]}
            onPress={ () => navigation.navigate('MigsDetails', { member: member }) }>

            <View style={styles.golferImgContainer}>
                { !imageUrl  &&
                    <Image
                        style={styles.golferImage}
                        source={ defaultGolferImageUrl }
                    />               
                }
                { imageUrl &&
                    <Image
                        style={styles.golferImage}
                        source={{ uri: member.imageUrl }}
                    />
                }
            </View>

            <View style={styles.nameContainer}>
                <Text style={[styles.baseText, styles.firstName]}>{ member.firstName}</Text>
                <Text style={[styles.baseText]}>{ member.lastName }</Text>  
            </View>

            <View style={styles.cellEmail}>
                <MaterialCommunityIcons name="cellphone-wireless" size={24} color="black" />
                <Text style={[styles.baseText, styles.cellEmailText]}>{member.cell} </Text> 
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
        backgroundColor: '#e7eced',
        opacity: 0.8,
        marginVertical: 8,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 16,
    },
    golferImgContainer: {
        width: '90%',
        marginTop: 4,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 10,
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomColor: CustomColors.gray800,
        borderBottomWidth: 1,
    },
    firstName: {
        marginRight: 4,
    },
    //
    cellEmail: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
        borderBottomColor: CustomColors.gray800,
        borderBottomWidth: 1,
        marginBottom: 4,
    },
    baseText: {
        color: 'black',
        textAlign: 'left',
        fontWeight: '800',
    },
    cellEmailText: {
        marginLeft: 8,
    },
    //
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