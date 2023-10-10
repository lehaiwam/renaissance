import React from 'react'
import {  } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import all the screens
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ResetPasswordScreen from '../screens/ResetPasswordScreen'
import StatusCheckScreen from '../screens/StatusCheckScreen'
import { BottomTabNavigator } from './BottomTabNavigator'

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Login" 
                component={LoginScreen} 
                options={{headerShown:false}} 
            />

            <Stack.Screen 
                name="StatusCheck" 
                component={StatusCheckScreen} 
            />
            <Stack.Screen 
                name="Register" 
                component={RegisterScreen} 
            />   
            <Stack.Screen 
                name="ResetPassword" 
                component={ResetPasswordScreen} 
            />

            <Stack.Screen 
                name="HomeTab" 
                component={BottomTabNavigator} 
            />      
        </Stack.Navigator>
    )
}

export { AuthNavigator }
