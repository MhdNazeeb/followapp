import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';

import { useJobs } from '../../../services/api/useGetJobs';
import JobCard from '../../../components/JobCard';
import Header from '../../../components/Header';
import { useSearchJob } from '../../../services/api/useSearchJob';
import { getHeight, getWidth } from '../../../Theme/constens';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LoginPromptModal from '../../../components/LoginPromptModal';
import { useNavigation } from '@react-navigation/native';
import { routeNames } from '../../../navgation/Screens';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navgation/navigation.types';
import { Portal } from 'react-native-paper';

const HomeScreen = () => {
  const { data: jobs, refetch, isLoading } = useJobs();
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  // Calculate proper bottom padding to account for the tab bar
  const TAB_BAR_HEIGHT = 0; // Estimate of your tab bar height
  const bottomPadding = Platform.OS === 'ios' ?
    TAB_BAR_HEIGHT + insets.bottom :
    TAB_BAR_HEIGHT;

  // Calculate the content padding from the top based on header height
  const contentPaddingTop = getHeight(5.50);

  // Add state for login modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <Portal>
        <LoginPromptModal
          visible={showLoginModal}
          onCancel={() => setShowLoginModal(false)}
          onLogin={() => {
            setShowLoginModal(false);
            navigation.navigate(routeNames.login);
          }}
        />
      </Portal>
      {/* Glassmorphism Header with scroll blur effect */}
      <Header
        screen="home"
        scrollY={scrollY}
      />

      <Animated.FlatList
        contentContainerStyle={[
          {
            paddingTop: contentPaddingTop,
            flexGrow: 1,
            justifyContent: 'center',
            paddingLeft:getWidth(23)
          }
        ]}
        showsVerticalScrollIndicator={false}
        data={jobs || []}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => <JobCard job={item} screen="home" setShowLoginModal={setShowLoginModal} />}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={7}
        removeClippedSubviews={true}
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.loadingText}>Loading jobs...</Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No jobs found</Text>
            </View>
          )
        }
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
 
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: getHeight(20),
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;