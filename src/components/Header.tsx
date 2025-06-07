import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react'
import NotificationBellIcon from '../assets/icons/NotificationIcon'
import { useNavigation } from '@react-navigation/native'
import { routeNames } from '../navgation/Screens'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navgation/navigation.types'
import { getHeight } from '../Theme/constens'
import SearchIcon from '../assets/icons/SearchIcon'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../Theme/Colors'
import { BlurView } from '@react-native-community/blur';

type headerProps = {
    values?: string
    setValues?: Dispatch<SetStateAction<string>>;
    searchJob?: () => void
    isLoading?: boolean
    screen?: string
    scrollY?: Animated.Value;
}

type NavigationProps = StackNavigationProp<RootStackParamList>;

const Header = ({ values, setValues, searchJob, isLoading, screen, scrollY = new Animated.Value(0) }: headerProps) => {
    const navigation = useNavigation<NavigationProps>();


    // Calculate opacity based on scroll position
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [0.8, 1],
        extrapolate: 'clamp'
    });



    // Render the appropriate blur effect based on platform
    const renderGlassmorphism = () => {
        return (
            <Animated.View style={styles.absoluteFill}>
                <BlurView
                    style={styles.blurView}
                    blurType="light"
                    reducedTransparencyFallbackColor="white"
                />
            </Animated.View>
        );

    };

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[
                {
                    opacity: headerOpacity,

                }

            ]}>
                <LinearGradient
                    colors={['rgba(76, 102, 159, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                    style={[styles.gradientContainer]}
                >
                    {renderGlassmorphism()}

                    <View style={styles.header}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleQatar}>Qatar </Text>
                            <Text style={styles.titleFollow}>Follow</Text>
                        </View>
                        <TouchableOpacity style={styles.notificationButton}>
                            <NotificationBellIcon width={30} height={30} fill='#000000' />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.searchContainer}
                        onPress={() => screen === "home" && navigation.navigate(routeNames.search)}
                    >
                        <View style={styles.searchBar}>
                            {screen !== "home" ? (
                                <TextInput
                                    style={styles.searchInput}
                                    value={values}
                                    onChangeText={(text) => setValues?.(text)}
                                    placeholder="Search your job title"
                                    placeholderTextColor="rgba(0,0,0,0.5)"
                                />
                            ) : (
                                <Text style={styles.searchPlaceholder}>Search your job title</Text>
                            )}
                            <TouchableOpacity
                                style={styles.findButton}
                                onPress={searchJob}
                                disabled={isLoading}
                            >
                                <View style={styles.searchIconContainer}>
                                    <SearchIcon />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    gradientContainer: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
        paddingBottom: 8,
        elevation: 4, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        height: getHeight(5.50)
    },
    absoluteFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    blurView: {
        flex: 1,
    },
    androidGlass: {
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        zIndex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
    },
    titleQatar: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#800020',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    titleFollow: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0047AB',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    notificationButton: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingBottom: 8,
        zIndex: 1,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 12,
        padding: 12,
        position: "relative",
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginRight: 40,
        color: '#000',
        height: getHeight(30),
        fontSize: 16,
    },
    searchPlaceholder: {
        color: 'rgba(0, 0, 0, 0.5)',
        height: getHeight(30),
        fontSize: 16,
        paddingVertical: 5,
    },
    searchIconContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 20,
        padding: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    findButton: {
        position: "absolute",
        right: 10,
        top: 8,
        borderRadius: 20,
    },
});

