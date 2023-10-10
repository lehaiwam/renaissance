import React, { useContext } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' 

import { AuthContext } from '../util/auth-context'

import { CustomColors } from '../constants/CustomColors'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//import HomeScreen from '../screens/home/HomeScreen'
//import MyProfileScreen from '../screens/MyProfileScreen'
//import CalendarScreen from '../screens/home/CalendarScreen'

import CompetitionsScreen from '../screens/home/CompetitionsScreen'
import ContactUsScreen from '../screens/ContactUsScreen'
import { AdminNavigator } from './AdminNavigator'
import { HomeNavigator } from './HomeNavigator'
import { CompetitionsNavigator } from './CompetitionsNavigator'
const BottomTab = createBottomTabNavigator()

const BottomTabNavigator = ({route}) => {

  const authCtx = useContext(AuthContext);

  const homeImage = require('../images/home.png')
  // console.log('\n\n\n   In BottomTabNavigator, authUser: ', authCtx.authUser)

  return (
      <BottomTab.Navigator 
          initialRouteName='HomeNavigator'
          screenOptions={({route}) => ({
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: { 
              position: 'absolute',
              bottom: 8,
              left: 12,
              right: 12,
              elevation: 0,
              height: 58,
              borderWidth: 2,
              borderColor: CustomColors.gray600,
              borderRadius: 16, 
              backgroundColor: CustomColors.blue050,
            },

              /*
              tabBarInactiveBackgroundColor: CustomColors.blue100,
              tabBarActiveBackgroundColor: CustomColors.primary500,
              tabBarActiveTintColor: CustomColors.white,
              tabBarInactiveTintColor: CustomColors.gray1000,
              
              tabBarIcon: ({color, size, focused}) => {
                let iconName
                if (route.name === 'HomeNavigator') {
                  iconName = focused ? 'md-home-sharp' : 'md-home-outline'
                  return <Ionicons name={iconName} size={28} color={color}/>
                } 
                if (route.name === 'ContactUs') {
                  iconName = focused ? 'email-send' : 'email-send-outline'
                  return <MaterialCommunityIcons name={iconName} size={28} color={color}/>
                }
                if (route.name === 'Competitions  ') {
                  iconName = focused ? 'md-trophy-sharp' : 'md-trophy-outline'
                  return <Ionicons name={iconName} size={24} color="color" />
                }
                if (route.name === 'AdminNavigator') {
                  iconName = focused ? 'tools' : 'tools'
                  return <MaterialCommunityIcons name={iconName} size={28} color={color}/>
                }
              },
              */

          })}
      >
          <BottomTab.Screen 
            name={'HomeNavigator'} 
            component={HomeNavigator}
            options={{
              headerShown:false,
              tabBarIcon: ({focused}) => (
                <View style={styles.optionContainer}>
                  <Image 
                    style={{
                      width: 25,
                      height: 25,
                      //tintActiveColor: focused ? '#e32f45' : CustomColors.gray800,
                    }}
                    source={ require('../images/home.png') }
                    resizeMode='contain'
                  />
                  <Text 
                    style={{ 
                      color: focused ? '#e32f45' : CustomColors.gray800,
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    Home
                  </Text>
                </View>
              ),  
            }}
          />

          <BottomTab.Screen 
            name={'CompetitionsNavigator'} 
            component={CompetitionsNavigator}
            options={{
              headerShown:false,
              tabBarIcon: ({focused}) => (
                <View style={styles.optionContainer}>
                  <Image 
                    style={{
                      width: 25,
                      height: 25,
                      //tintColor: focused ? '#f2eeee' : '#748c94'
                    }}
                    source={ require('../images/trophy.png') }
                    resizeMode='contain'
                  />

                  <Text 
                    style={{ 
                      color: focused ? CustomColors.primary500 : CustomColors.gray800,
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    Competitions
                  </Text>
                </View>
              ),  
            }}
          />

          <BottomTab.Screen 
            name={'ContactUs'} 
            component={ContactUsScreen}
            options={{
              headerShown:false,
              tabBarIcon: ({focused}) => (
                <View style={styles.optionContainer}>
                  <Image 
                    style={{
                      width: 25,
                      height: 25,
                      //tintColor: focused ? '#f2eeee' : '#748c94'
                    }}
                    source={ require('../images/email.png') }
                    resizeMode='contain'
                  />

                  <Text 
                    style={{ 
                      color: focused ? '#e32f45' : CustomColors.gray800,
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    Contact Us
                  </Text>
                </View>
              ),  
            }}
          />

          <BottomTab.Screen 
            name={'AdminNavigator'} 
            component={AdminNavigator}
            options={{
              headerShown:false,
              tabBarIcon: ({focused}) => (
                <View style={styles.optionContainer}>
                  <Image 
                    style={{
                      width: 25,
                      height: 25,
                      //tintColor: focused ? '#f2eeee' : '#748c94'
                    }}
                    source={ require('../images/admin.png') }
                    resizeMode='contain'
                  />

                  <Text 
                    style={{ 
                      color: focused ? CustomColors.primary500 : CustomColors.gray800,
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    Administrator
                  </Text>
                </View>
              ),  
            }}
          />

      </BottomTab.Navigator>
  )
}

const styles = StyleSheet.create({
  optionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}) 

export { BottomTabNavigator }