import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/main/home/Home';
import TabNavigation from '../tabs/TabNavigation';
import { routeNames } from '../Screens';
import { JobDetails1, SearchScreen } from '../../screens';


export default function ManiNavigation() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator 
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={routeNames.tab} component={TabNavigation} />
            <Stack.Screen name={routeNames.jobDetails} component={JobDetails1} /> 
            <Stack.Screen name={routeNames.search} component={SearchScreen} /> 

        </Stack.Navigator>

    )
}