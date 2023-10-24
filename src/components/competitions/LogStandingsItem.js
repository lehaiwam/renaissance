import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { CustomColors } from '../../constants/CustomColors'
import GolferScoresModal from './GolferScoresModal'

const LogStandingsItem = ({item, competition}) => {
    const [ showGolferScoresModal, setShowGolferScoresModal ] = useState(false)

    return (
        <View style={styles.itemContainer}>
            <GolferScoresModal 
                showGolferScoresModal = { showGolferScoresModal }
                setShowGolferScoresModal = { setShowGolferScoresModal }
                dataItem = { item }
                competition = { competition }
            />

            <View style={styles.scoreItemContainer}>

                <Text style={styles.scoreItem}> {item.firstName} </Text>
                <Text style={styles.scoreItem}> {item.lastName} </Text>
                <Text style={styles.colon}> : </Text>

                <Pressable
                    onPress={ () => setShowGolferScoresModal(true) }
                >
                    <Text style={styles.score}> {item.overallScore}</Text>
                </Pressable>

            </View>
                        
        </View>
    )
}

export default LogStandingsItem

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        //height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        //marginHorizontal: 110,
    },
    scoreItemContainer: {
        width: '100%',
        flexDirection: 'row',
        //justifyContent: 'flex-start',
        //alignItems: 'center',
        //paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: 'cyan',
    },
    scoreItem: {
        fontSize: 16,
        width: 100,
        fontWeight: 'bold',
        color: CustomColors.black,
        textTransform: 'capitalize',
        marginBottom: 4,
    },
    score: {
        fontSize: 16,
        width: 50,
        fontWeight: 'bold',
        color: CustomColors.orange600,
        textTransform: 'capitalize',
        marginBottom: 4,
    },  
})