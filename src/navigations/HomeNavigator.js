import React from 'react'
import {  } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import all the screens
import HomeScreen from '../screens/home/HomeScreen'
import MyProfileScreen from '../screens/home/MyProfileScreen'
import MigsScreen from '../screens/home/MigsScreen'
import CalendarScreen from '../screens/home/CalendarScreen'
import ConfirmationsScreen from '../screens/home/ConfirmationsScreen'
import MigsDetailsScreen from '../screens/home/MigsDetailsScreen'
import UpdateProfilePictureScreen from '../screens/home/UpdateProfilePictureScreen'
import { CustomColors } from '../constants/CustomColors'

const Stack = createNativeStackNavigator()

const HomeNavigator = () => {
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
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            />
            <Stack.Screen 
                name="UpdateProfilePicture" 
                component={ UpdateProfilePictureScreen } 
                options={{
                    title: 'Update Profile Picture',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            />
            <Stack.Screen 
                name="Migs" 
                component={MigsScreen} 
                options={{
                    title: 'MIGS',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            />
            <Stack.Screen 
                name="Calendar" 
                component={CalendarScreen} 
                options={{
                    title: 'Calendar',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            />   
            <Stack.Screen 
                name="Confirmations" 
                component={ConfirmationsScreen} 
                options={{
                    title: 'Confirmations',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            /> 
            <Stack.Screen 
                name="MigsDetails" 
                component={MigsDetailsScreen} 
                options={{
                    title: 'Golfer Competitions Scores',
                    headerStyle: {
                        backgroundColor: CustomColors.blue050,
                    },
                }}
            /> 
        </Stack.Navigator>
    )
}

export {HomeNavigator }