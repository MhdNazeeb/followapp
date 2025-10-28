import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Animated, Dimensions } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState, useRef, useCallback } from 'react'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import NotificationBellIcon from '../assets/icons/NotificationIcon'
import { useNavigation } from '@react-navigation/native'
import { routeNames } from '../navgation/Screens'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navgation/navigation.types'
import { getHeight, getWidth, lightenColor } from '../Theme/constens'
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

// Responsive breakpoints using your existing functions
const isTablet = Dimensions.get('window').width >= getWidth(1.95); // ~768px threshold
const isSmallScreen = Dimensions.get('window').width < getWidth(10.4); // ~360px threshold

const Header = ({ values, setValues, searchJob, isLoading, screen, scrollY = new Animated.Value(0) }: headerProps) => {
    const navigation = useNavigation<NavigationProps>();
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions(window);
        });

        return () => subscription?.remove();
    }, []);

    const triggerCustomHaptic = useCallback(() => {
        ReactNativeHapticFeedback.trigger('impactLight', {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
        });

    }, []);

    // Render the appropriate blur effect based on platform
    const renderGlassmorphism = () => {
        return (
       
                <BlurView
                    style={styles.blurView}
                    blurType="light"
                    reducedTransparencyFallbackColor="white"
                />
    
        );
    };

    return (
        <View style={styles.container}>
            <View>
                <LinearGradient
                    // colors={['rgba(76, 102, 159, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                    colors={[lightenColor(Colors.primary,0),lightenColor(Colors.primary,7100)]}

                    style={[styles.gradientContainer]}
                >

                    {renderGlassmorphism()}

                    <View style={styles.header}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleQatar}>Qatar </Text>
                            <Text style={styles.titleFollow}>Follow</Text>
                        </View>
                        <TouchableOpacity style={styles.notificationButton} onPress={triggerCustomHaptic}>
                            <NotificationBellIcon
                                width={getWidth(12.5)} // ~30px on 375px width
                                height={getWidth(12.5)}
                                fill='#000000'
                            />
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
                                    numberOfLines={1}
                                    multiline={false}
                                />
                            ) : (
                                <Text
                                    style={styles.searchPlaceholder}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    Search your job title
                                </Text>
                            )}
                            <TouchableOpacity
                                style={styles.findButton}
                                onPress={searchJob}
                                disabled={isLoading}
                                activeOpacity={0.7}
                            >
                                <View style={styles.searchIconContainer}>
                                    <SearchIcon />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                </LinearGradient>
            </View>
        </View>
    )
}

export default React.memo(Header)

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    gradientContainer: {
        overflow: 'hidden',
        paddingBottom: getHeight(101), // ~8px on 812px height
        elevation: 4, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: getHeight(203) }, // ~4px on 812px height
        shadowOpacity: 0.2,
        shadowRadius: getWidth(46.9), // ~8px on 375px width
        minHeight: getHeight(6.8), // ~120px on 812px height
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: getWidth(23.4), // ~16px on 375px width
        paddingVertical: getHeight(67.7), // ~12px on 812px height
        zIndex: 1,
        minHeight: getHeight(13.5), // ~60px on 812px height
        marginTop: Platform.OS === "ios" ? getWidth(37.5) : getWidth(12.5) // ios: ~10px, android: ~30px
    },
    titleContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    titleQatar: {
        fontSize: isTablet ? getWidth(14.4) : isSmallScreen ? getWidth(20.8) : getWidth(17), // 26px, 18px, 22px respectively
        fontWeight: 'bold',
        color: '#800020',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: getWidth(375), height: getHeight(812) }, // 1px, 1px respectively
        textShadowRadius: getWidth(187.5), // ~2px on 375px width
        letterSpacing: 0.5,
    },
    titleFollow: {
        fontSize: isTablet ? getWidth(14.4) : isSmallScreen ? getWidth(20.8) : getWidth(17), // 26px, 18px, 22px respectively
        fontWeight: 'bold',
        color: '#0047AB',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: getWidth(375), height: getHeight(812) }, // 1px, 1px respectively
        textShadowRadius: getWidth(187.5), // ~2px on 375px width
        letterSpacing: 0.5,
    },
    notificationButton: {
        height: isTablet ? getWidth(7.8) : getWidth(9.4), // 48px, 40px respectively
        width: isTablet ? getWidth(7.8) : getWidth(9.4),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: isTablet ? getWidth(15.6) : getWidth(18.8), // 24px, 20px respectively
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: getWidth(375), // ~1px on 375px width
        borderColor: 'rgba(255, 255, 255, 0.5)',
        marginLeft: getWidth(46.9), // ~8px on 375px width
    },
    searchContainer: {
        paddingHorizontal: getWidth(23.4), // ~16px on 375px width
        paddingBottom: getHeight(67.7), // ~12px on 812px height
        zIndex: 1,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: getWidth(31.25), // ~12px on 375px width
        paddingHorizontal: getWidth(31.25), // ~12px on 375px width
        paddingVertical: getHeight(90),
        position: "relative",
        borderWidth: getWidth(375), // ~1px on 375px width
        borderColor: 'rgba(255, 255, 255, 0.8)',
        minHeight: getHeight(16.9), // ~48px on 812px height
    },
    searchInput: {
        flex: 1,
        marginRight: getWidth(7.5), // ~50px on 375px width
        color: '#000',
        fontSize: isTablet ? getWidth(20.8) : isSmallScreen ? getWidth(26.8) : getWidth(23.4), // 18px, 14px, 16px respectively
        paddingVertical: Platform.OS === 'ios' ? getHeight(101.5) : getHeight(203), // 8px, 4px respectively
        textAlignVertical: 'center',
        includeFontPadding: false,
    },
    searchPlaceholder: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: isTablet ? getWidth(20.8) : isSmallScreen ? getWidth(26.8) : getWidth(23.4), // 18px, 14px, 16px respectively
        paddingVertical: Platform.OS === 'ios' ? getHeight(101.5) : getHeight(203), // 8px, 4px respectively
        flex: 1,
        marginRight: getWidth(7.5), // ~50px on 375px width
        textAlignVertical: 'center',
        includeFontPadding: false,
    },
    searchIconContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: getWidth(18.75), // ~20px on 375px width
        padding: isTablet ? getWidth(37.5) : getWidth(46.9), // 10px, 8px respectively
        borderWidth: getWidth(375), // ~1px on 375px width
        borderColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    findButton: {
        position: "absolute",
        right: getWidth(46.9),
        top: '80%',
        transform: [{ translateY: -getWidth(18.75) }],
        borderRadius: getWidth(18.75),
        height: getWidth(9.4),
        width: getWidth(9.4),
        justifyContent: 'center',
        alignItems: 'center',
    },
});