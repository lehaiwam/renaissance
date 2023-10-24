import React, { Children, useContext } from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' 

import { AuthContext } from '../util/auth-context'

import { CustomColors } from '../constants/CustomColors'
import { Ionicons } from '@expo/vector-icons'; 

import { AdminNavigator } from './AdminNavigator'
import { HomeNavigator } from './HomeNavigator'
import { CompetitionsNavigator } from './CompetitionsNavigator'
import { NotificationsNavigator } from './NotificationsNavigator'

const BottomTab = createBottomTabNavigator()

const BottomTabNavigator = ({route}) => {

    const authCtx = useContext(AuthContext);

    const screenOptions = {
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 10,
        left:10, 
        right: 10,
        elevation: 0,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: CustomColors.gray600,
        backgroundColor: CustomColors.blue100,
      }
    }

    return (
        <BottomTab.Navigator
          screenOptions={screenOptions}
        > 
          <BottomTab.Screen 
            name={'HomeNavigator'} 
            component={ HomeNavigator }
            options={{
              tabBarHideOnKeyboard: true,
              tabBarIcon: ({focused}) => {
                return (
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons
                      name={ focused ? 'md-home-sharp' : 'md-home-outline' }
                      size={24} 
                      color={ focused ? CustomColors.primary500 : CustomColors.gray800 }
                    />
                    <Text style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: CustomColors.gray800,
                    }}>
                      Home
                    </Text>
                  </View>
                )
              }
            }}
          />

          <BottomTab.Screen 
            name={'CompetitionsNavigator'} 
            component={ CompetitionsNavigator }
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons
                      name={ focused ? 'md-trophy-sharp' : 'md-trophy-outline' }
                      size={24} 
                      color={focused ? CustomColors.primary500 : CustomColors.gray800 }
                    />
                    <Text style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: CustomColors.gray800,
                    }}>
                      Competitions
                    </Text>
                  </View>
                )
              }
            }}
          />

          <BottomTab.Screen 
            name={'NotificationsNavigator'} 
            component={ NotificationsNavigator }
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons
                      name={ focused ? 'notifications-sharp' : 'notifications-outline' }
                      size={24} 
                      color={focused ? CustomColors.primary500 : CustomColors.gray800 }
                    />
                    <Text style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: CustomColors.gray800,
                    }}>
                      Notifications
                    </Text>
                  </View>
                )
              }
            }}
          />

          <BottomTab.Screen 
            name={'AdminNavigator'} 
            component={ AdminNavigator }
            options={{
              tabBarHideOnKeyboard: true,
              tabBarIcon: ({focused}) => {
                return (
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons
                      name={ focused ? 'settings' : 'settings-outline' }
                      size={24} 
                      color={focused ? CustomColors.primary500 : CustomColors.gray800 }
                    />
                    <Text style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: CustomColors.gray800,
                    }}>
                      Administration
                    </Text>
                  </View>
                )
              }
            }}
          />

        </BottomTab.Navigator>
    )
}

const styles = StyleSheet.create({

}) 

export { BottomTabNavigator }