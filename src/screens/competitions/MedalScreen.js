import React, { useEffect, useState} from 'react'
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

//import CurrentStandingsModal from '../../components/competitions/CurrentStandingsModal'
import { CustomColors } from '../../constants/CustomColors'
import IconButton from '../../components/UI/IconButton'
import { MedalChampionsData } from '../../data/Champions'
import Slider from '../../components/competitions/Slider'

const MedalScreen = ({ navigation, route }) => {
    const isFocused = useIsFocused()
    // [showStandingsModal, setShowStandingsModal] = useState(false)

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
                            onPressIcon={ () => navigation.navigate('LogStandings', { competition: 'medal' }) }
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
            {/**
            
            <CurrentStandingsModal 
                showStandingsModal = { showStandingsModal }
                setShowStandingsModal = { setShowStandingsModal }
                competition = { 'medal' }
            />
             */}

            <View 
                style={styles.sliderContainer}>
                <Slider sliderData={ MedalChampionsData }/>          
            </View>

            <Text style={styles.subHeader}>Competition Rules:</Text>

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
                    six games required to permute their final score. 
                </Text>
                <Text style={[styles.paragraph, styles.winnerText]}>
                    The golfer with the LEAST cumulative score from his/her best six games is declared our MEDAL/OOM champion 
                    golfer of the year.   
                </Text>
            </ScrollView>
        </SafeAreaView>  
    )
}

export default MedalScreen

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