import React from 'react'
import {  } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import all the screens
import CompetitionsHomeScreen from '../screens/competitions/CompetitionsHomeScreen'
import MedalScreen from '../screens/competitions/MedalScreen'
import StablefordScreen from '../screens/competitions/StablefordScreen'
import ChampOfChampsScreen from '../screens/competitions/ChampOfChampsScreen'
import TubsMemorialScreen from '../screens/competitions/TubsMemorialScreen'
import LogStandingsScreen from '../screens/competitions/LogStandingsScreen'
import { CustomColors } from '../constants/CustomColors'

const Stack = createNativeStackNavigator()

const CompetitionsNavigator = () => {

    return (
        <Stack.Navigator
            initialRouteName="CompetitionsHome"
            screenOptions={{
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="CompetitionsHome" 
                component={CompetitionsHomeScreen} 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="Medal" 
                component={MedalScreen} 
                options={{
                    title: 'Medal',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            />
            <Stack.Screen 
                name="Stableford" 
                component={ StablefordScreen } 
                options={{
                    title: 'Stableford',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            />
            <Stack.Screen 
                name="ChampOfChamps" 
                component={ChampOfChampsScreen} 
                options={{
                    title: 'Champ Of Champs',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            />
            <Stack.Screen 
                name="TubsMemorial" 
                component={TubsMemorialScreen} 
                options={{
                    title: 'Tubs Monareng Memorial',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            />   
            <Stack.Screen 
                name="LogStandings" 
                component={ LogStandingsScreen } 
                options={{
                    title: 'Current Log Standings',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            />   

        </Stack.Navigator>
    )
}

export {CompetitionsNavigator }