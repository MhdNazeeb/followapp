import React, { useState, useEffect, useRef, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TouchableNativeFeedback, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../Theme/Colors';
import HomeIcon from '../../assets/icons/HomeIcon';
import { routeNames } from '../Screens';
import SavedIcon from '../../assets/icons/SavedIcon';
import ProfileIcon from '../../assets/icons/ProfileIcon';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { TouchableRipple } from 'react-native-paper';
import { getHeight } from '../../Theme/constens';
import { Haptics } from '../../utils/Haptics';

// Memoize icons for performance
const MemoHomeIcon = React.memo(HomeIcon);
const MemoSavedIcon = React.memo(SavedIcon);
const MemoProfileIcon = React.memo(ProfileIcon);

const TAB_BAR_HEIGHT = getHeight(13.5);

const CustomBottomBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const tabCount = state.routes.length;
  const tabWidth = width / tabCount;

  // Animated value for pill indicator
  const indicatorAnim = useRef(new Animated.Value(state.index)).current;

  useEffect(() => {
    Animated.spring(indicatorAnim, {
      toValue: state.index,
      useNativeDriver: true, // Use native driver for transform
      speed: 16,
      bounciness: 8,
    }).start();
  }, [state.index]);

  // Responsive scaling
  const scale = (size: number) => (width / 375) * size;

  // Function to render tab content
  const renderTabContent = (route: any, isFocused: boolean) => {
    return (
      <>
        <Animated.View style={{
          transform: [{ scale: isFocused ? 1.18 : 1 }],
          marginBottom: scale(2),
        }}>
          {route.name === routeNames.home ? (
            <MemoHomeIcon width={scale(20)} height={scale(20)} fill={isFocused ? Colors.primery : '#B0B0B0'} />
          ) : (
            route.name === routeNames.saved_list ? <MemoSavedIcon height={scale(20)} width={scale(20)} color={isFocused ? Colors.primery : '#B0B0B0'} /> : <MemoProfileIcon height={scale(20)} width={scale(20)} color={isFocused ? Colors.primery : '#B0B0B0'} />
          )}
        </Animated.View>
        <Animated.Text
          style={{
            color: isFocused ? Colors.primery : '#B0B0B0',
            fontSize: scale(11),
            fontWeight: isFocused ? 'bold' : '500',
            transform: [{ scale: isFocused ? 1.08 : 1 }],
            marginTop: scale(1),
            letterSpacing: 0.2,
          }}>
          {route.name}
        </Animated.Text>
      </>
    );
  };



  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          height: TAB_BAR_HEIGHT + insets.bottom
          // paddingBottom: insets.bottom,
        }
      ]}
      edges={['bottom']}
    >
      {/* <BarBackground /> */}
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          Haptics.heavy()
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Use TouchableNativeFeedback for Android and TouchableOpacity for iOS
        if (Platform.OS === 'android') {
          return (
            <TouchableNativeFeedback
              key={route.name}
              onPress={onPress}
              onLongPress={onLongPress}
              background={TouchableNativeFeedback.Ripple('rgba(42, 79, 255, 0.08)', false)}
              useForeground={true}
            >
              <View
                style={[
                  styles.tab,
                  {
                    width: tabWidth,
                    zIndex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: scale(22),
                    overflow: 'hidden',
                  },
                ]}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
              >
                {isFocused ? (
                  <View
                    style={{
                      width: tabWidth * 0.7,
                      height: scale(44),
                      borderRadius: scale(22),
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    <Animated.View
                      style={[
                        styles.pill,
                        {
                          width: tabWidth * 0.7,
                          height: scale(44),
                          borderRadius: scale(22),
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          backgroundColor: '#fff',
                          elevation: 10,
                          borderWidth: 1,
                          opacity: 0.92,
                          borderColor: 'rgba(255, 255, 255, 0.06)',
                          shadowColor: Colors.primery,
                          shadowOpacity: 0.16,
                          shadowRadius: 16,
                          shadowOffset: { width: 0, height: 4 },
                          zIndex: 0,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                      ]}
                    />
                    <View style={{ zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      {renderTabContent(route, isFocused)}
                    </View>
                  </View>
                ) : (
                  renderTabContent(route, isFocused)
                )}
              </View>
            </TouchableNativeFeedback>
          );
        }

        // iOS fallback using TouchableOpacity with opacity feedback
        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            hitSlop={3}
            activeOpacity={0.6}
            style={[styles.tab, { width: tabWidth, zIndex: 1, justifyContent: 'center', alignItems: 'center', overflow: 'visible' }]}
          >
            {isFocused ? (
              <View style={{
                width: tabWidth * 0.7,
                height: scale(44),
                borderRadius: scale(22),
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}>
                <Animated.View
                  style={[
                    styles.pill,
                    {
                      width: tabWidth * 0.7,
                      height: scale(44),
                      borderRadius: scale(22),
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      paddingVertical: scale(10),
                      shadowColor: Colors.primery,
                      shadowOpacity: 0.16,
                      shadowRadius: 16,
                      shadowOffset: { width: 0, height: 4 },
                      elevation: 10,
                      opacity: 0.92,
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.06)',
                      backgroundColor: '#fff',
                      zIndex: 0,
                    },
                  ]}
                />
                <View style={{ zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  {renderTabContent(route, isFocused)}
                </View>
              </View>
            ) : (
              renderTabContent(route, isFocused)
            )}
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: TAB_BAR_HEIGHT,
    position: 'relative',
    // borderRadius: 32,
    overflow: 'visible',
  },
  pill: {
    position: 'absolute',
    bottom: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
  },
});

export default memo(CustomBottomBar);