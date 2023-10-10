import React from 'react'
import {  } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AuthContext } from '../util/auth-context'

// import all the screens
import CompetitionsHomeScreen from '../screens/home/CompetitionsHomeScreen'
import MedalScreen from '../screens/home/MedalScreen'
import StablefordScreen from '../screens/home/StablefordScreen'
import ChampOfChampsScreen from '../screens/home/ChampOfChampsScreen'
import TubsMemorialScreen from '../screens/home/TubsMemorialScreen'
import { CustomColors } from '../constants/CustomColors'

const Stack = createNativeStackNavigator()

const CompetitionsNavigator = () => {

   // const authCtx = useContext(AuthContext)

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
    
        </Stack.Navigator>
    )
}

export {CompetitionsNavigator }