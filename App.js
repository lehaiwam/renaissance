import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import auth from './src/firebaseConfig';
import { CustomColors } from './src/constants/CustomColors';

// import all the screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import StatusCheckScreen from './src/screens/StatusCheckScreen';
import MigsScreen from './src/screens/MigsScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ContactUsScreen from './src/screens/ContactUsScreen';

const Stack = createNativeStackNavigator()

/*
const firebaseConfig = {
  apiKey: "AIzaSyDc8GKVNr_3cC9VmH1HFq1rD6mnwGtS-5c",
  authDomain: "renaissance-5112a.firebaseapp.com",
  projectId: "renaissance-5112a",
  storageBucket: "renaissance-5112a.appspot.com",
  messagingSenderId: "413866920022",
  appId: "1:413866920022:web:6d5368d8e39582658853f7"
}
/*
appId: "1:413866920022:web:6d5368d8e39582658853f7"
appId: "1:413866920022:web:73dc99f0c9f178dd8853f7"
*

console.log('\n\n   Initializing firebase in APP.js...')

// Initialize Firebase
let app
if (firebase.app.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth

console.log('\n\n   Looks like Initializing of firebase successful, ', app)
*/

export default function App() {

  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: CustomColors.blue050,
            },
            headerTintColor: CustomColors.gray800,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
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
            name="Home" 
            component={HomeScreen} 
            options={({ route }) => ({ title: route.params.name })}
          />

          <Stack.Screen 
            name="Migs" 
            component={MigsScreen} 
          />
          <Stack.Screen 
            name="Calendar" 
            component={CalendarScreen} 
          />

          <Stack.Screen 
            name="ContactUs" 
            component={ContactUsScreen} 
          />


        </Stack.Navigator>
      </NavigationContainer>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})