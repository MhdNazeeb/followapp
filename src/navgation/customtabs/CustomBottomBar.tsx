import React, { useRef, useEffect, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TouchableNativeFeedback, Platform, useWindowDimensions, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../Theme/Colors';
import HomeIcon from '../../assets/icons/HomeIcon';
import { routeNames } from '../Screens';
import SavedIcon from '../../assets/icons/SavedIcon';
import ProfileIcon from '../../assets/icons/ProfileIcon';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { TouchableRipple } from 'react-native-paper';
import { getHeight, getWidth, lightenColor } from '../../Theme/constens';
import { Haptics } from '../../utils/Haptics';

// Memoize icons for performance
const MemoHomeIcon = React.memo(HomeIcon);
const MemoSavedIcon = React.memo(SavedIcon);
const MemoProfileIcon = React.memo(ProfileIcon);

const TAB_BAR_HEIGHT = Platform.OS == "android" ? getHeight(13.5) : getHeight(22.5);

const CustomBottomBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const tabCount = state.routes.length;
  const tabWidth = width / tabCount;

  // Responsive scaling
  const scale = (size: number) => (width / 375) * size;

  // Function to render tab content (no animation)
  const renderTabContent = (route: any, isFocused: boolean) => {
    return (
      <>
        <View style={{
          marginBottom: scale(2),
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {route.name === routeNames.home ? (
            <MemoHomeIcon width={scale(20)} height={scale(20)} fill={isFocused ? lightenColor(Colors.primary, 1) : lightenColor(Colors.black, 12)
            } />
          ) : (
            route.name === routeNames.saved_list ? <MemoSavedIcon height={scale(20)} width={scale(20)} color={isFocused ? lightenColor(Colors.primary, 1) : lightenColor(Colors.black, 12)} /> : <MemoProfileIcon height={scale(20)} width={scale(20)} color={isFocused ? lightenColor(Colors.primary, 1) : lightenColor(Colors.black, 12)
            } />
          )}
          <Text
            style={{
              color: isFocused ? lightenColor(Colors.primary, 1) : lightenColor(Colors.black, 12)
              ,
              fontSize: scale(11),
              fontWeight: isFocused ? 'bold' : '500',
              marginTop: scale(1),
              letterSpacing: 0.2,
            }}>
            {route.name}
          </Text>
        </View>

      </>
    );
  };

  const indicatorAnim = useRef(new Animated.Value(state.index)).current;

  useEffect(() => {
    Animated.spring(indicatorAnim, {
      toValue: state.index,
      useNativeDriver: true,
      speed: 16,
      bounciness: 8,
    }).start();
  }, [state.index]);

  return (
    <View
      style={[
        styles.container,
        {
          height: TAB_BAR_HEIGHT + insets.bottom
        }
      ]}
    >
      <StatusBar backgroundColor={"transparent"} barStyle={'dark-content'} />

      <Animated.View
        style={[
          styles.pill,
          {
            width: tabWidth * 0.7,

            // height: 55,
            borderRadius: getWidth(20),
            backgroundColor: lightenColor(Colors.primary, 95),
            position: 'absolute',
            left: 0,
            top: 0,
            transform: [
              {
                translateX: indicatorAnim.interpolate({
                  inputRange: [0, state.routes.length - 1],
                  outputRange: [tabWidth * 0.15, tabWidth * (state.routes.length - 1 + 0.15)],
                }),
              },
            ],
            // elevation: 10,
            borderWidth: 1,
            // opacity: 0.92,
            borderColor: 'rgba(0,0,0,0.06)',

            zIndex: 0,
          },
        ]}
      />
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
            {renderTabContent(route, isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
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