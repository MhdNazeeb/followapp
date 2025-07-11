import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Animated, Dimensions } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState, useRef, useCallback } from 'react'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import NotificationBellIcon from '../assets/icons/NotificationIcon'
import { useNavigation } from '@react-navigation/native'
import { routeNames } from '../navgation/Screens'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navgation/navigation.types'
import { getHeight, getWidth } from '../Theme/constens'
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

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive breakpoints
const isTablet = screenWidth >= 768;
const isSmallScreen = screenWidth < 360;
const isLargeScreen = screenWidth >= 414;

// Responsive scaling functions
const scale = (size: number) => (screenWidth / 375) * size;
const verticalScale = (size: number) => (screenHeight / 812) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

const Header = ({ values, setValues, searchJob, isLoading, screen, scrollY = new Animated.Value(0) }: headerProps) => {
    const navigation = useNavigation<NavigationProps>();
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions(window);
        });

        return () => subscription?.remove();
    }, []);

    // Calculate opacity based on scroll position
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [0.8, 1],
        extrapolate: 'clamp'
    });

    const triggerCustomHaptic = useCallback(() => {
        ReactNativeHapticFeedback.trigger('impactLight', {
          enableVibrateFallback: true,
          ignoreAndroidSystemSettings: false,
        });
        
      }, []);

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
                        <TouchableOpacity style={styles.notificationButton} onPress={triggerCustomHaptic}>
                            <NotificationBellIcon 
                                width={moderateScale(30)} 
                                height={moderateScale(30)} 
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
        borderBottomLeftRadius: moderateScale(10),
        borderBottomRightRadius: moderateScale(10),
        overflow: 'hidden',
        paddingBottom: verticalScale(8),
        elevation: 4, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        minHeight: verticalScale(120),
        paddingTop: Platform.OS === 'ios' ? 0 : verticalScale(10),
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
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(12),
        zIndex: 1,
        minHeight: verticalScale(60),
    },
    titleContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    titleQatar: {
        fontSize: moderateScale(isTablet ? 26 : isSmallScreen ? 18 : 22),
        fontWeight: 'bold',
        color: '#800020',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        letterSpacing: 0.5,
    },
    titleFollow: {
        fontSize: moderateScale(isTablet ? 26 : isSmallScreen ? 18 : 22),
        fontWeight: 'bold',
        color: '#0047AB',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        letterSpacing: 0.5,
    },
    notificationButton: {
        height: moderateScale(isTablet ? 48 : 40),
        width: moderateScale(isTablet ? 48 : 40),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(isTablet ? 24 : 20),
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        marginLeft: scale(8),
    },
    searchContainer: {
        paddingHorizontal: scale(16),
        paddingBottom: verticalScale(12),
        zIndex: 1,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: moderateScale(12),
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(isTablet ? 16 : 12),
        position: "relative",
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        minHeight: verticalScale(48),
    },
    searchInput: {
        flex: 1,
        marginRight: scale(50),
        color: '#000',
        fontSize: moderateScale(isTablet ? 18 : isSmallScreen ? 14 : 16),
        paddingVertical: verticalScale(Platform.OS === 'ios' ? 8 : 4),
        textAlignVertical: 'center',
        includeFontPadding: false,
    },
    searchPlaceholder: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: moderateScale(isTablet ? 18 : isSmallScreen ? 14 : 16),
        paddingVertical: verticalScale(Platform.OS === 'ios' ? 8 : 4),
        flex: 1,
        marginRight: scale(50),
        textAlignVertical: 'center',
        includeFontPadding: false,
    },
    searchIconContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: moderateScale(20),
        padding: moderateScale(isTablet ? 10 : 8),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    findButton: {
        position: "absolute",
        right: scale(8),
        top: '80%',
        transform: [{ translateY: -moderateScale(20) }],
        borderRadius: moderateScale(20),
        height: moderateScale(40),
        width: moderateScale(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
});