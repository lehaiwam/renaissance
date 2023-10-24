import React, { Children, useContext } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' 

import { AuthContext } from '../util/auth-context'

import { CustomColors } from '../constants/CustomColors'
import { Ionicons } from '@expo/vector-icons';

import { AdminNavigator } from './AdminNavigator'
import { HomeNavigator } from './HomeNavigator'
import { CompetitionsNavigator } from './CompetitionsNavigator'
import CustomTabBarButton from '../components/UI/CustomTabBarButton'

const BottomTab = createBottomTabNavigator()

const BottomTabNavigator = ({route}) => {

  const authCtx = useContext(AuthContext);

  const homeImage = require('../images/home.png')
  // console.log('\n\n\n   In BottomTabNavigator, authUser: ', authCtx.authUser)

  return (
      <BottomTab.Navigator 
          initialRouteName='HomeNavigator'
          screenOptions={({route}) => ({
            headerShown: false, 
            //tabBarInactiveTintColor: CustomColors.black,
            //tabBarActiveTintColor: CustomColors.primary500,
            tabBarIcon: ({color, size, focused}) => {
              let iconName
              if (route.name === 'HomeNavigator') {
                iconName = focused ? 'md-home-sharp' : 'md-home-outline'
                return <Ionicons name={iconName} size={20} color={color}/>
              } 
              if (route.name === 'CompetitionsNavigator') {
                iconName = focused ? 'md-trophy-sharp' : 'md-trophy-outline'
                return <Ionicons name={iconName} size={20} color={color} />
              }
              if (route.name === 'AdminNavigator') {
                iconName = focused ? 'settings' : 'settings-outline'
                return <Ionicons name={iconName} size={20} color={color}/>
              }
            },
            tabBarStyle: styles.tabBarStyle,
          })}
      >
          <BottomTab.Screen 
            name={'HomeNavigator'} 
            component={HomeNavigator}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <CustomTabBarButton { ...props} />
            }}
          />

          <BottomTab.Screen 
            name={'CompetitionsNavigator'} 
            component={CompetitionsNavigator}
            options={{
              tabBarLabel:'Competitions',
              tabBarButton: props => <CustomTabBarButton { ...props} />
            }}
          />

          <BottomTab.Screen 
            name={'AdminNavigator'} 
            component={AdminNavigator}
            options={{
              tabBarLabel:'Administration',
              tabBarButton: props => <CustomTabBarButton { ...props} />,
            }}
          />

      </BottomTab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    borderRadius: 16,
    /*
    backgroundColor: CustomColors.blue100,
    borderColor: CustomColors.gray800,
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 2,
    //flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    */
  },
}) 

export { BottomTabNavigator }