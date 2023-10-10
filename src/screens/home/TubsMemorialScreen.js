import React from 'react'
import { Image, StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native'

import { CustomColors } from '../../constants/CustomColors'

const MedalScreen = ({navigation}) => {
    const currentChampion = require('../../images/Tubs-Memorial-Champion-2022.jpg')
    return (
        <SafeAreaView style={styles.mainContainer}>

            <Text style={styles.mainHeader} >Tubs Memorial Champion 2022</Text>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.golferImage}
                    source={ currentChampion }
                />               
            </View>

            <Text style={styles.championsName} >Charles Zanele Ngidi</Text>

            <Text style={styles.subHeader}>Rules & Regulations</Text>

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} >
                <Text style={styles.paragraph}>
                    This was originally the club's annual season ending whisky competition but after the passing of one of our 
                    founding members, i.e. Tubatsana Monareng, popularly known as Tubs, the club decided to rename the competition 
                    to 'Tubs Monareng Memorial' in remembrance of his contribution in building the club.
                                          
                </Text>
                <Text style={styles.paragraph}>
                    The competition is in a medal format and is usually played at the end of our year long season. Each 
                    participant is expected to contribute a bottle of 12 Year Old Whisky to the pool and the top five 
                    golfers on the day get to share the bottles.  
                </Text>
                <Text style={[styles.paragraph, styles.winnerText]}>
                    The golfer with least score is declared our championship golfer of the year.  
                </Text>
            </ScrollView>
        
        </SafeAreaView>  
    )
}

export default MedalScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: CustomColors.purple100,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 8,
        paddingHorizontal: 16,
        paddingBottom: 64,
    },
    mainHeader: {
        //marginTop: 16,
        width: '100%',
        textAlign: 'center',
        color: CustomColors.gray600,
        fontSize: 24,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: '90%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: CustomColors.blue400,
        borderWidth: 2,
        borderRadius: 24,
        padding: 8,
    },
    golferImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    championsName: {
        color: CustomColors.blue800,
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subHeader: {
        width: '100%',
        textAlign: 'left',
        color: CustomColors.gray600,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12,
    },
    scrollView: {
        height: '100%',
        width: '100%',
        backgroundColor: CustomColors.white,
        width: '100%',
        margin: 8,
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