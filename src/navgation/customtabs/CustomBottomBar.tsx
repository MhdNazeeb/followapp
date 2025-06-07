



import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TouchableNativeFeedback, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '../../Theme/Colors';
import HomeIcon from '../../assets/icons/HomeIcon';
import { routeNames } from '../Screens';
import SavedIcon from '../../assets/icons/SavedIcon';
import ProfileIcon from '../../assets/icons/ProfileIcon';
import { getWidth } from '../../Theme/constens';

const CustomBottomBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();

  const scale = useState(new Animated.Value(1))[0];

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1.2,
      duration: 330,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  // Function to render tab content
  const renderTabContent = (route: any, isFocused: boolean) => {
    return (
      <>
        <Animated.View style={{ transform: [{ scale: isFocused ? scale : 1 }] }}>
          {route.name === routeNames.home ? (
            <HomeIcon width={20} height={25} fill={Colors.secondery} />
          ) : (
            route.name === routeNames.saved_list ? <SavedIcon height={25} width={20} color={Colors.secondery} /> : <ProfileIcon height={25} width={20} color={Colors.secondery} />
          )}
        </Animated.View>
        <Animated.Text
          style={{
            color: isFocused ? '#673ab7' : '#222',
            fontSize: 12,
            transform: [{ scale: isFocused ? scale : 1 }],
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
        { paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0 }
      ]}
      edges={['bottom']}
    >
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

        // Use TouchableNativeFeedback for Android ripple effect
        // and TouchableOpacity as fallback for iOS
        if (Platform.OS === 'android') {
          return (
            <TouchableNativeFeedback
              key={route.name}
              background={TouchableNativeFeedback.Ripple('#eaebfe', true)}
              onPress={onPress}
              onLongPress={onLongPress}
              useForeground={true}
            >
              <View
                style={[styles.tab, styles.androidTab]}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
              >
                {renderTabContent(route, isFocused)}
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
            style={styles.tab}>
            {renderTabContent(route, isFocused)}
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10, 
  },
  androidTab: {
    overflow: 'hidden',
    borderRadius: 20,
  }
});

export default CustomBottomBar;