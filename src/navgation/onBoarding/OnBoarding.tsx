import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/main/home/Home';
import TabNavigation from '../tabs/TabNavigation';
import { routeNames } from '../Screens';
import { SignInScreen, SignUpScreen } from '../../screens';


export default function OnBoarding() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator 
            
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={routeNames.login} component={SignInScreen} /> 
            <Stack.Screen name={routeNames.signUp} component={SignUpScreen} /> 

        </Stack.Navigator>

    )
}