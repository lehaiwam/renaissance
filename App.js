import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
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