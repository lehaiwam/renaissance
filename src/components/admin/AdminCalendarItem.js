import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { updateGameScores } from '../../util/initialize-db-tables'
import { CustomColors } from '../../constants/CustomColors'

const AdminCalendarItem = ({ userId, game }) => {
    
    const navigation = useNavigation()

    const captureGameScores = async () => {
        updateGameScores(game.title)
        navigation.goBack()
    }

    return (
        
        <View style={[styles.itemContainer]} >
            <View style={styles.topText}>
                <Text style={[styles.baseText, styles.titleText]}>{ game.title}</Text>
                <Text style={[styles.baseText, styles.dateText]}> { game.date }</Text>  
                <Text style={[styles.baseText, styles.timeText]}> {game.teeOff} </Text> 
            </View>

            <View style={styles.bottomText}>
                <Text style={[styles.baseText, styles.courseText]} >
                    {game.course}
                </Text>
                <Pressable 
                    style={ ({pressed}) => [ styles.button, pressed && styles.pressed ]}
                    onPress={ () => navigation.navigate('AdminGameDetails', {game: game}) }>
                    <Text style={styles.buttonText}>
                        Edit 
                    </Text>
                </Pressable>
            </View>

            { (game.status > 3)  &&
            
                <View style={styles.captureButtonWrapper}>
                    <Pressable 
                        style={ ({pressed}) => [ styles.captureScoresButton, pressed && styles.pressed ]}
                        onPress={ captureGameScores }>
                        <Text style={styles.buttonText}>
                            Capture Game Scores 
                        </Text>
                    </Pressable>
                </View>
            }
        </View>
    )
}    
    
export default AdminCalendarItem

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        backgroundColor: CustomColors.blue050,
        marginVertical: 8,
        borderColor: CustomColors.gray600,
        borderWidth: 2,
        borderRadius: 16,
        padding: 4,
    },
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
    baseText: {
        color: CustomColors.gray600,
        textAlign: 'left',
        marginRight: 8,
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
    captureButtonWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureScoresButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.gray800,
        elevation: 1,
        borderColor: CustomColors.white,
        borderWidth: 1,
        borderRadius: 28,
        width: '80%',
        paddingHorizontal: 8,
        paddingVertical: 4,

        /*
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowOffset: {width:1, height: 1},
        shadowRadius: 2,
        */
    },
    pressed: {
        opacity: 0.5,
    },    
})