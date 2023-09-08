import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' 

import { AuthContext } from '../util/auth-context'

import { CustomColors } from '../constants/CustomColors'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//import HomeScreen from '../screens/home/HomeScreen'
//import MyProfileScreen from '../screens/MyProfileScreen'
//import CalendarScreen from '../screens/home/CalendarScreen'

import ContactUsScreen from '../screens/ContactUsScreen'
import { AdminNavigator } from './AdminNavigator'
import { HomeNavigator } from './HomeNavigator'

const BottomTab = createBottomTabNavigator()

const BottomTabNavigator = ({route}) => {

  const authCtx = useContext(AuthContext);

  // console.log('\n\n\n   In BottomTabNavigator, authUser: ', authCtx.authUser)

  return (
      <BottomTab.Navigator 
          initialRouteName='HomeNavigator'
          screenOptions={({route}) => ({
              headerShown: false,
              tabBarActiveTintColor: CustomColors.purple600,
              tabBarInactiveTintColor: CustomColors.gray800,
              tabBarIcon: ({color, size, focused}) => {
                let iconName
                if (route.name === 'HomeNavigator') {
                  iconName = focused ? 'md-home-sharp' : 'md-home-outline'
                  return <Ionicons name={iconName} size={24} color={color}/>
                }
                if (route.name === 'ContactUs') {
                  iconName = focused ? 'email-send' : 'email-send-outline'
                  return <MaterialCommunityIcons name={iconName} size={24} color={color}/>
                }
                if (route.name === 'AdminNavigator') {
                  iconName = focused ? 'tools' : 'tools'
                  return <MaterialCommunityIcons name={iconName} size={24} color={color}/>
                }
            },
          })}
      >
          <BottomTab.Screen 
            name={'HomeNavigator'} 
            component={HomeNavigator}
            options={{
              tabBarLabel: 'Home',
            }}
          />

          <BottomTab.Screen 
            name={'ContactUs'} 
            component={ContactUsScreen}
            options={{
              headerShown:false,
                tabBarLabel: 'Contact Us',
            }}
          />

          <BottomTab.Screen 
            name={'AdminNavigator'} 
            component={AdminNavigator}
            options={{
              headerShown:false,
                tabBarLabel: 'Administration',
            }}
          />

      </BottomTab.Navigator>
  )
}

export { BottomTabNavigator }