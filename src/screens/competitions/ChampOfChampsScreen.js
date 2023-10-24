import React from 'react'
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native'

import { CustomColors } from '../../constants/CustomColors'
import { ChampOfChampionsData } from '../../data/Champions'
import Slider from '../../components/competitions/Slider'

const ChampOfChampsScreen = ({navigation}) => {
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View 
                style={styles.sliderContainer}>
                <Slider sliderData={ ChampOfChampionsData }/>          
            </View>

            <Text style={styles.subHeader}>Competition Rules:</Text>

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} >
                <Text style={styles.paragraph}>
                    This is the latest addition to our year long season calendar. The competition is played 
                    in STABLEFORD format and is contested by the following, a maximum of 16 possible golfers,
                </Text>

                <Text style={styles.paragraph} >1. Winners of all 8 MEDAL games for the season,</Text>
                <Text style={styles.paragraph} >2. Winners of the 4 STABLEFORD games played in that season,</Text>
                <Text style={styles.paragraph} >3. The reigning champions of all our competitions, i.e.</Text>
                <View>
                        <Text style={styles.competitionsText}>a) MEDAL/OOM,</Text>
                        <Text style={styles.competitionsText}>b) STABLEFORD/IPS, </Text>
                        <Text style={styles.competitionsText}>c) TUBS WHISKY MEMORIAL and </Text> 
                        <Text style={styles.competitionsText}>d) CHAMPION OF CHAMPIONS.</Text>         
                </View>

                <Text style={[styles.paragraph, styles.winnerText]}>
                    The golfer with the MOST points for the day is declared our championships champion golfer for that year.  
                </Text>
            </ScrollView>
        </SafeAreaView>  
    )
}

export default ChampOfChampsScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: CustomColors.white,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //paddingTop: 8,
        paddingHorizontal: 16,
        paddingBottom: 64,
    },
    sliderContainer: {
        backgroundColor: CustomColors.blue050,
        width: '100%',
        height: '30%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: CustomColors.blue400,
        borderBottomWidth: 1,
        borderRadius: 12,
        borderWidth: 2,
        marginTop: 4,
    },
    subHeader: {
        width: '100%',
        textAlign: 'left',
        color: CustomColors.gray1000,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12,
    },
    scrollView: {
        height: '100%',
        width: '100%',
        backgroundColor: CustomColors.blue050,
        width: '100%',
        marginBottom: 12,
        borderColor: CustomColors.blue400,
        borderWidth: 2,
        borderRadius: 12,
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12, 
    },
    paragraph: {
        marginVertical: 4,
        fontWeight: '600',
        letterSpacing: 1.1,
    },
    competitionsText: {
      marginLeft: 32,
      fontWeight: '600',
      letterSpacing: 1.1,
    },
    winnerText: {
        color: CustomColors.error500,
        fontWeight: 'bold',
    }
})