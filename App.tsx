/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navgation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Alert, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Colors from './src/Theme/Colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { getWidth } from './src/Theme/constens';
import { toastConfig } from './src/components/CustomToast';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import mobileAds from 'react-native-google-mobile-ads';





function App(): React.JSX.Element {
  const queryClient = new QueryClient();
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: "739541554715-08giuaq6deric8f1vlt7nro8633vin2r.apps.googleusercontent.com",
  //     iosClientId: "739541554715-11vliebjmrtlslbafrgu2292mv16hj24.apps.googleusercontent.com",
  //     // scopes: ['profile', 'email'],
  // });
  // }, []);

  useEffect(() => {
    mobileAds()
    .setRequestConfiguration({
      testDeviceIdentifiers: ['EMULATOR'],
    })
    .then(() => mobileAds().initialize());  
  }, []);

  return (

    <NavigationContainer >
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider>
            <Navigation />
          </PaperProvider>
        </GestureHandlerRootView>
        <Toast config={toastConfig} />
      </QueryClientProvider>
    </NavigationContainer>

  );
}



export default App;

const styles = StyleSheet.create({
  screenColor: {
    backgroundColor: Colors.primary,

  }
})