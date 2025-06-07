/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navgation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet } from 'react-native';
import Colors from './src/Theme/Colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App(): React.JSX.Element {
  const queryClient = new QueryClient();

  return (

    <NavigationContainer >
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigation />
        </GestureHandlerRootView>
        <Toast   />
      </QueryClientProvider>
    </NavigationContainer>
  );
}



export default App;

const styles = StyleSheet.create({
  screenColor: {
    backgroundColor: Colors.primery,

  }
})