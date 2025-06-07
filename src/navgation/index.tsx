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

export default function Navigation() {
    const Stack = createStackNavigator();
    const [initialRoute, setInitialRoute] = useState<string | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            const userName = await getItem("userName");
            setInitialRoute(userName ? routeNames.main : routeNames.login);
        };
        checkUser();
    }, []);

    if (initialRoute === null) {
        return (
            <>
                <IndiCatorLoading />
            </>
        );
    }


    return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={routeNames.login} component={SignInScreen
            } />
            <Stack.Screen name={routeNames.signUp} component={SignUpScreen
            } />
            <Stack.Screen name={routeNames.main} component={ManiNavigation
            } />

        </Stack.Navigator>

    )
}