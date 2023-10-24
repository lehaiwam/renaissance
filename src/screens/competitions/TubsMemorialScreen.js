import React from 'react'
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native'

import { CustomColors } from '../../constants/CustomColors'
import { TubsMemorialChampionsData } from '../../data/Champions'
import Slider from '../../components/competitions/Slider'

const TubsMemorialScreen = ({navigation}) => {
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View 
                style={styles.sliderContainer}>
                <Slider sliderData={ TubsMemorialChampionsData }/>          
            </View>

            <Text style={styles.subHeader}>Competition Rules:</Text>

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} >
                <Text style={styles.paragraph}>
                    This was originally the club's annual season ending whisky competition but after the passing of one of our 
                    founding members, i.e. Tubatsana Monareng, popularly known as Tubs, the club decided to rename the competition 
                    to 'Tubs Monareng Memorial' in remembrance of his contribution in building the club.
                                          
                </Text>
                <Text style={styles.paragraph}>
                    The competition is in a MEDAL format and is usually played at the end of our year long season. Each 
                    participant is expected to contribute a bottle of 12 Year Old Whisky to the pool and the top five 
                    golfers on the day get to share the bottles.  
                </Text>
                <Text style={[styles.paragraph, styles.winnerText]}>
                    The golfer with the LEAST score on the day is declared our championships champion golfer for that year.  
                </Text>
            </ScrollView>
        
        </SafeAreaView>  
    )
}

export default TubsMemorialScreen

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
        //height: '100%',
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
        marginVertical: 8,
        fontWeight: '600',
        letterSpacing: 1.1,
    },
    winnerText: {
        color: CustomColors.error500,
        fontWeight: 'bold',
    }
})