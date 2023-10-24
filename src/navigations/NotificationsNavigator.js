import React from 'react'
import {  } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AuthContext } from '../util/auth-context'

// import all the screens
import NotificationsHomeScreen from '../screens/notifications/NotificationsHomeScreen'
import NotificationsScreen from '../screens/notifications/NotificationsScreen'

const Stack = createNativeStackNavigator()

const NotificationsNavigator = () => {

   // const authCtx = useContext(AuthContext)

    return (
        <Stack.Navigator
            initialRouteName="NotificationsHome"
            screenOptions={{
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="NotificationsHome" 
                component={NotificationsHomeScreen} 
                options={{
                    headerShown:false,
                }}
            />
              <Stack.Screen
                name="Notifications" 
                component={NotificationsScreen} 
            />
        </Stack.Navigator>
    )
}

export { NotificationsNavigator }