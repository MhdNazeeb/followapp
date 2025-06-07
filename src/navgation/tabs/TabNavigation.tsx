import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManiNavigation from '../main/mainNavigation';
import { routeNames } from '../Screens';
import CustomBottomBar from '../customtabs/CustomBottomBar';
import Home from '../../screens/main/home/Home';
import { ProfileScreen, SaveListScreen,  } from '../../screens';


// Create Tab Navigator
const Tab = createBottomTabNavigator();


export default function TabNavigation() {

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomBottomBar {...props} />} >
            <Tab.Screen name={routeNames.home} component={Home} />
            <Tab.Screen name={routeNames.saved_list} component={SaveListScreen} />
            <Tab.Screen name={routeNames.profile} component={ProfileScreen} />

        </Tab.Navigator>
    );
}

