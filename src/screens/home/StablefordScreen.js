import React from 'react'
import { Image, StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native'

import { CustomColors } from '../../constants/CustomColors'

const StablefordScreen = ({navigation}) => {
    const currentChampion = require('../../images/Stableford-Champion-2022.jpg')
    return (
        <SafeAreaView style={styles.mainContainer}>

            <Text style={styles.mainHeader} >Stableford Champion 2022</Text>
            
            <View style={styles.imageContainer}>
                <Image
                    style={styles.golferImage}
                    source={ currentChampion }
                />               
            </View>

            <Text style={styles.championsName} >David Malose Mokgohloa</Text>

            <Text style={styles.subHeader}>Rules & Regulations:</Text>

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} >
                    <Text style={styles.paragraph}>
                        This is what we commonly refer to as our IPS championship. 
                        This is a format where for each hole played, a golfer is allocated points depending on 
                        the hole's stroke rating and the golfer's handicap. The players plays until they cannot 
                        score a point. At that point they can pick up and declare a zero point for that hole.     
                    </Text>

                    <Text style={styles.paragraph}>
                        Over a year we play four stableford games and we use only your best three scores to determine 
                        your score for the year. Note that a golfer is automatically out of contention if he has not played a 
                        minimum of three games required to permute their final score for the year.   
                    </Text>
                    <Text style={[styles.paragraph, styles.winnerText]}>
                        The golfer with the highest number of points is declared our IPS/STABLEFORD champion golfer of the year.  
                    </Text>
            </ScrollView>
        
        </SafeAreaView> 
    )
}

export default StablefordScreen

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