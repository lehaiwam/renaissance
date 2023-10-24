import React from 'react'
import {  } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AuthContext } from '../util/auth-context'

// import all the screens
import AdminHomeScreen from '../screens/admin/AdminHomeScreen'
import AdminAddNewMigsScreen from '../screens/admin/AdminAddNewMigsScreen'
import AdminMigsScreen from '../screens/admin/AdminMigsScreen'
import AdminMigsDetailsScreen from '../screens/admin/AdminMigsDetailsScreen'
import AdminCalendarScreen from '../screens/admin/AdminCalendarScreen'
import AdminGameDetailsScreen from '../screens/admin/AdminGameDetailsScreen'

import { CustomColors } from '../constants/CustomColors'

const Stack = createNativeStackNavigator()

const AdminNavigator = () => {

   // const authCtx = useContext(AuthContext)

    return (
        <Stack.Navigator
            initialRouteName="AdminHome"
            screenOptions={{
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="AdminHome" 
                component={AdminHomeScreen} 
                options={{
                    headerShown:false,
                }}
            />

            <Stack.Screen 
                name="AdminMigs" 
                component={AdminMigsScreen}
                
                /*
                options={{
                    title: 'MIGS Maintenance',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
                */
            
            />

            <Stack.Screen 
                name="AdminAddNewMigs" 
                component={AdminAddNewMigsScreen} 
                options={{
                    title: 'Add MIGS',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            />

            <Stack.Screen 
                name="AdminMigsDetails" 
                component={AdminMigsDetailsScreen} 
                options={{
                    title: 'MIGS Details Maintenance',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            />    
            <Stack.Screen 
                name="AdminCalendar" 
                component={AdminCalendarScreen} 
                options={{
                    title: 'Calendar Maintenance',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            />   
            <Stack.Screen 
                name="AdminGameDetails" 
                component={AdminGameDetailsScreen} 
                options={{
                    title: 'Game Details Maintenance',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            />    
        </Stack.Navigator>
    )
}

export { AdminNavigator }