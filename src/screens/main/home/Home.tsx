
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import BackArrowIcon from '../../../assets/icons/BackArrow';
import NotificationBellIcon from '../../../assets/icons/NotificationIcon';
import { getItem } from '../../../utils/storage';
import { useJobs } from '../../../services/api/useGetJobs';
import JobCard from '../../../components/JobCard';
import Header from '../../../components/Header';
import { useSearchJob } from '../../../services/api/useSearchJob';
import { getHeight } from '../../../Theme/constens';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { data: jobs, refetch, isLoading } = useJobs();
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  // useEffect(() => {
  //   refetch();    
  // }, []);

  // Calculate proper bottom padding to account for the tab bar
  const TAB_BAR_HEIGHT = 0; // Estimate of your tab bar height
  const bottomPadding = Platform.OS === 'ios' ?
    TAB_BAR_HEIGHT + insets.bottom :
    TAB_BAR_HEIGHT;

  // Calculate the content padding from the top based on header height
  const contentPaddingTop = getHeight(5.50);
  useEffect(() => {
    console.log(isLoading, 'this is is loading..>>');

  }, [isLoading])
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Glassmorphism Header with scroll blur effect */}
      <Header
        screen="home"
        scrollY={scrollY}
      />

      <Animated.FlatList
        contentContainerStyle={[
          styles.jobListContent,
          {
            paddingTop: contentPaddingTop,
            paddingBottom: bottomPadding
          }
        ]}
        showsVerticalScrollIndicator={false}
        data={jobs || []}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => <JobCard job={item} screen="home" />}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
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
  jobListContent: {
    // paddingBottom is now calculated and applied dynamically
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