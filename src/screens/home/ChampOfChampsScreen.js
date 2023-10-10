import React from 'react'
import { Image, StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native'

import { CustomColors } from '../../constants/CustomColors'

const MedalScreen = ({navigation}) => {
    const currentChampion = require('../../images/human.png')
    return (
        <SafeAreaView style={styles.mainContainer}>

            <Text style={styles.mainHeader} >Champ Of Champions 2022</Text>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.golferImage}
                    source={ currentChampion }
                />               
            </View>

            <Text style={styles.championsName} >Joe Blogg</Text>

            <Text style={styles.subHeader}>Rules & Regulations</Text>

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} >
                <Text style={styles.paragraph}>
                    This is the club's flagship contest of the year, also popularly known amongst members, as the Order Of Merit (OOM). 
                    As the name clearly states, its played in a MEDAL format. In this format, the golfer plays each hole until 
                    they get the ball into the hole. As maby shots as it takes. If you pick up before that, you get disqualified.          
                </Text>
                <Text style={styles.paragraph}>
                    Over a year we play eight medal games and we use only the golfer's best six scores to determine the winner.
                    Note that a golfer is automatically out of contention if he has not played a minimum of 
                    six games required to permute their final score. The golfer with least score is declared our MEDAL/OOM champion 
                    golfer of the year.  
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