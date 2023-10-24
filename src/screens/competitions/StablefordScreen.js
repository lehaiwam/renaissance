import React, { useEffect, useState} from 'react'
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

// import CurrentStandingsModal from '../../components/competitions/CurrentStandingsModal'
import { CustomColors } from '../../constants/CustomColors'
import IconButton from '../../components/UI/IconButton'
import { StablefordChampionsData } from '../../data/Champions'
import Slider from '../../components/competitions/Slider'

const StablefordScreen = ({navigation}) => {
    const isFocused = useIsFocused()
    // const [showStandingsModal, setShowStandingsModal] = useState(false)

    useEffect(() => {
        
        const showLogIcon = async () => {
            navigation.setOptions({
                headerStyle: {
                    backgroundColor: CustomColors.blue050,
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: ({tintColor}) => {
                    return (
                        <IconButton 
                            iconName={'format-list-numbered'}
                            size={28}
                            color={tintColor}
                            onPressIcon={ () => navigation.navigate('LogStandings', { competition: 'stableford' }) }
                        />
                    )
                },
            })  
        }

        if (isFocused) {
            showLogIcon()
        }
    }, [])

    return (
        <SafeAreaView style={styles.mainContainer}>
            {/*
           
            <CurrentStandingsModal 
                showStandingsModal = { showStandingsModal }
                setShowStandingsModal = { setShowStandingsModal }
                competition = { 'ips' }
            />
            */}
            
            <View 
                style={styles.sliderContainer}>
                <Slider sliderData={ StablefordChampionsData }/>          
            </View>

            <Text style={styles.subHeader}>Competition Rules:</Text>

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
                        The golfer with the MOST cumulative points from his/her three best scores is declared our IPS/STABLEFORD champion golfer of the year.  
                    </Text>
            </ScrollView>
        </SafeAreaView>  
    )
}

export default StablefordScreen

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
        marginVertical: 8,
        fontWeight: '600',
        letterSpacing: 1.1,
    },
    winnerText: {
        color: CustomColors.error500,
        fontWeight: 'bold',
    }
})