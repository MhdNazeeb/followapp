import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { routeNames } from './Screens';
import ManiNavigation from './main/MainNavigation';
import TabNavigation from './tabs/TabNavigation';
import { SignInScreen, SignUpScreen } from '../screens';
import { getItem } from '../utils/storage';
import IndiCatorLoading from '../components/IndiCatorLoading';
import ForgotPasswordScreen from '../screens/onBoarding/ResetPassword/ResetPassword';

export default function Navigation() {
    const Stack = createStackNavigator();


    return (
        <Stack.Navigator
            initialRouteName={routeNames.main}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={routeNames.login} component={SignInScreen
            } />
            {/* <Stack.Screen name={routeNames.signUp} component={SignUpScreen
            } /> */}
            <Stack.Screen name={routeNames.forgotPassword} component={ForgotPasswordScreen} />

            <Stack.Screen name={routeNames.main} component={ManiNavigation
            } />

        </Stack.Navigator>

    )
}