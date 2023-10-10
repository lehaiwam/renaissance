import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import ResultsModal from './ResultsModal'
import { CustomColors } from '../../constants/CustomColors'
import { Entypo } from '@expo/vector-icons';

const CalendarItem = ({ userId, game }) => {
    const [ resultsModal, setResultsModal] = useState(false)
    const navigation = useNavigation()
    
    return (
        <View style={ styles.gameContainer }>
            <ResultsModal 
                resultsModal={ resultsModal }
                setResultsModal={ setResultsModal }
                game={ game }
            />

            <View style={styles.topText}>
                <Text style={[styles.baseText, styles.titleText]}>{ game.title }</Text>
                <Text style={[styles.baseText, styles.dateText]}>{ game.date }</Text>  
                <Text style={[styles.baseText, styles.timeText]}>{ game.teeOff }</Text> 
            </View>

            <View style={styles.middleText}>
                <Text 
                    style={[styles.baseText, styles.uniformText]}>
                    Tops: <Text style={styles.titleText} >{ game.tops }</Text>    Bottoms: <Text style={styles.titleText}>{ game.bottoms }</Text>
                </Text>
            </View>







            <View style={styles.bottomText}>
                <Text style={[styles.baseText, styles.courseText]} > {game.course} </Text>
                <Text 
                    style={[styles.baseText, styles.courseText]} >
                     R {game.fees}
                </Text>
                <Text style={[styles.baseText, styles.weekendText]}>
                    Away? { (game.weekendAway) ? 
                    <Entypo name="emoji-happy" size={20} color={CustomColors.green800} /> : 
                    <Entypo name="emoji-sad" size={20} color="gray" />}
                </Text> 
            </View>
            
            <Pressable 
                style={({ pressed }) => [styles.confirmAction, pressed && styles.pressed]} 
                onPress={ () => game.status > '3' ? setResultsModal(true) : navigation.navigate('Confirmations', { game: game, userId: userId}) }
            >
                <Text style={[styles.confirmText]}>Click for Confirmations or Results</Text>
            </Pressable>
        </View>
    )
}    
    
export default CalendarItem

const styles = StyleSheet.create({
    gameContainer: {
        backgroundColor: CustomColors.blue050,
        marginVertical: 8,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 8,
        padding: 8,
    },
    topText: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    middleText: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 4,
    },
    bottomText: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
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
    uniformText: {
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
    weekendText: {
        fontSize: 16,
        color: CustomColors.gray800,
        fontWeight: '800',
    },
    confirmAction: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: CustomColors.blue400,
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 16,
        paddingHorizontal: 2,
        paddingVertical: 2,
        marginTop: 4,
    },
    pressed: {
        opacity: 0.5,
    },
    confirmText: {
        fontSize: 16,
        textAlign: 'center',
        color: CustomColors.white,
        fontWeight: '800',
    },
})