import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { CustomColors } from '../../constants/CustomColors'

const ScoreItem = ({ gameScoreData }) => {
    // console.log('\n   GameScoreData: ', gameScoreData)
    return (
        <View style={ styles.gameScoreWrapper }>
            <Text style={styles.gameTitle}>{gameScoreData.title}</Text>

            { gameScoreData.title.slice(0,3) === 'ips' && 
                <>
                { gameScoreData.score > 30 &&
                    <Text style={[styles.gameScore, styles.gameScoreGreen]}>{gameScoreData.score}</Text>
                }

                { (gameScoreData.score < 31 && gameScoreData.score > 24) &&
                    <Text style={[styles.gameScore, styles.gameScoreYellow]}>{gameScoreData.score}</Text>
                }

                { (gameScoreData.score < 25 && gameScoreData.score > 0) &&
                    <Text style={[styles.gameScore, styles.gameScoreRed]}>{gameScoreData.score}</Text>
                }

                { gameScoreData.score === 0 &&
                    <Text style={[styles.gameScore, styles.gameScoreNotplayed]}>{gameScoreData.score}</Text>
                }
                </>
            }

            { gameScoreData.title.slice(0,3) === 'med' && 
                <>
                { gameScoreData.score < 76 &&
                    <Text style={[styles.gameScore, styles.gameScoreGreen]}>{gameScoreData.score}</Text>
                }

                { (gameScoreData.score < 81 && gameScoreData.score > 75) &&
                    <Text style={[styles.gameScore, styles.gameScoreYellow]}>{gameScoreData.score}</Text>
                }

                { (gameScoreData.score > 80 && gameScoreData.score < 200 ) &&
                    <Text style={[styles.gameScore, styles.gameScoreRed]}>{gameScoreData.score}</Text>
                }
                
                { gameScoreData.score === 200 &&
                    <Text style={[styles.gameScore, styles.gameScoreNotplayed]}>{gameScoreData.score}</Text>
                }  
                </>
            }
        </View>     
    )
}

export default ScoreItem

const styles = StyleSheet.create({
    gameScoreWrapper : {
        backgroundColor: CustomColors.blue050,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 2,
        marginTop: 4,
        color: CustomColors.gray800,
        fontSize: 16,
        fontWeight: '600',
        borderRadius: 4,
        borderColor: CustomColors.white,
        borderWidth: 1,
    }, 
    gameTitle:  {
        width: 100,
        backgroundColor: CustomColors.white,
        paddingLeft: 16,
        textTransform: 'uppercase',
        marginRight: 16,
        borderRadius: 12,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    gameScore:  {
        width: 100,
        paddingLeft: 16,
        textAlign: 'center',
        borderRadius: 12,
        fontWeight: '800',
    }, 
    gameScoreGreen: {
        backgroundColor: CustomColors.green1000,
    },
    gameScoreYellow: {
        backgroundColor: CustomColors.yellow500,
    },
    gameScoreRed: {
        backgroundColor: CustomColors.error500,
    },
    gameScoreNotplayed : {
        backgroundColor: CustomColors.gray100,
        //color: CustomColors.gray100,
    }
})