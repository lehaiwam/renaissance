import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContextProvider, AuthContext } from './src/util/auth-context';

import { AuthNavigator } from './src/navigations/AuthNavigator';

export default function App() {

  const authCtx = useContext(AuthContext)

  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <NavigationContainer>
          <AuthNavigator /> 
        </NavigationContainer>
      </AuthContextProvider>
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