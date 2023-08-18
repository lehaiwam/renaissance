import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View, Modal } from 'react-native'

import ConfirmModal from './ConfirmModal'
import ResultsModal from './ResultsModal'
import { CustomColors } from '../../constants/CustomColors'
import { Entypo } from '@expo/vector-icons';

const CalendarItem = ({ user, game }) => {
    const [showModal, setShowModal] = useState(false)
    const [showResultsModal, setShowResultsModal] = useState(false)

    return (
        <View style={ styles.gameContainer }>
            <ConfirmModal 
                showModal={ showModal }
                setShowModal={ setShowModal }
                user={ user }
                game={ game }
            />
            <ResultsModal 
                showResultsModal={ showResultsModal }
                setShowResultsModal={ setShowResultsModal }
                game={ game }
            />

            <View style={styles.topText}>
                <Text style={[styles.baseText, styles.titleText]}>{ game.title}</Text>
                <Text style={[styles.baseText, styles.dateText]}> { game.date }</Text>  
                <Text style={[styles.baseText, styles.timeText]}> {game.teeOff} </Text> 
            </View>
            <View style={styles.bottomText}>
            <Text style={[styles.baseText, styles.courseText]} >{game.course}</Text>
                <Text style={[styles.baseText, styles.weekendText]}>
                    Weekend away? { (game.weekendAway) ? 
                    <Entypo name="emoji-happy" size={20} color={CustomColors.green800} /> : 
                    <Entypo name="emoji-sad" size={20} color="gray" />}
                </Text> 
            </View>
            <Pressable 
                style={({ pressed }) => [styles.confirmAction, pressed && styles.pressed]} 
                onPress={ () => game.status === 2 ? setShowResultsModal(true) : setShowModal(true) }
            >
                <Text style={[styles.confirmText]}>Click to confirm, cancel or see results</Text>
            </Pressable>
        </View>
    )
}    
    
export default CalendarItem

const styles = StyleSheet.create({
    gameContainer: {
        backgroundColor: CustomColors.blue050,
        marginVertical: 8,
        borderColor: CustomColors.gray600,
        borderWidth: 2,
        borderRadius: 8,
        padding: 8,
    },
    topText: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
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