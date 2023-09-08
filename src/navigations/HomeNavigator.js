import React from 'react'
import {  } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AuthContext } from '../util/auth-context'

// import all the screens
import HomeScreen from '../screens/home/HomeScreen'
import MyProfileScreen from '../screens/home/MyProfileScreen'
import MigsScreen from '../screens/home/MigsScreen'
import CalendarScreen from '../screens/home/CalendarScreen'
import ConfirmationsScreen from '../screens/home/ConfirmationsScreen'
import MigsDetailsScreen from '../screens/home/MigsDetailsScreen'
import UpdateProfilePictureScreen from '../screens/home/UpdateProfilePictureScreen'

const Stack = createNativeStackNavigator()

const HomeNavigator = () => {

   // const authCtx = useContext(AuthContext)

    return (
        <Stack.Navigator
            initialRouteName="HomeNavigator"
            screenOptions={{
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="Home" 
                component={HomeScreen} 
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen 
                name="MyProfile" 
                component={MyProfileScreen} 
                options={{
                    title: 'My Profile',
                }}
            />
            <Stack.Screen 
                name="UpdateProfilePicture" 
                component={ UpdateProfilePictureScreen } 
                options={{
                    title: 'Update Profile Picture',
                }}
            />
            <Stack.Screen 
                name="Migs" 
                component={MigsScreen} 
                options={{
                    title: 'MIGS',
                }}
            />
            <Stack.Screen 
                name="Calendar" 
                component={CalendarScreen} 
                options={{
                    title: 'Calendar',
                }}
            />   
            <Stack.Screen 
                name="Confirmations" 
                component={ConfirmationsScreen} 
                options={{
                    title: 'Confirmations',
                }}
            /> 
            <Stack.Screen 
                name="MigsDetails" 
                component={MigsDetailsScreen} 
                options={{
                    title: 'MIGS Details',
                }}
            /> 
        </Stack.Navigator>
    )
}

export {HomeNavigator }