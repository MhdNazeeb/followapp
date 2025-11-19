import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { useJobs } from '../../../services/api/useGetJobs';
import JobCard from '../../../components/JobCard';
import Header from '../../../components/Header';
import { getHeight, getWidth } from '../../../Theme/constens';
import LoginPromptModal from '../../../components/LoginPromptModal';
import { useNavigation } from '@react-navigation/native';
import { routeNames } from '../../../navgation/Screens';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navgation/navigation.types';
import { Portal } from 'react-native-paper';
import JobCardSkeleton from '../../../components/skelton/JobCardSkeleton';
import { LegendList } from "@legendapp/list"
import BannerAdd from '../../../components/adds/BannerAdd';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


const HomeScreen = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useJobs(20);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const jobs = useMemo(() => {
    return data?.pages.flatMap((page) => page.jobs) ?? [];
  }, [data]);

  const handleShowLoginModal = useCallback(() => setShowLoginModal(true), []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);


  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#6366f1" />
        <Text style={styles.footerText}>Loading more jobs...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View>
          {[...Array(4)].map((_, idx) => (
            <JobCardSkeleton key={idx} />
          ))}
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No jobs found</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={[styles.container]} edges={['top', 'left', 'right']}>


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

      <Header screen="home" />

      <LegendList
        contentContainerStyle={[
          {
            justifyContent: 'center',
            paddingTop: Platform.OS === 'android' ? getHeight(4) : getHeight(6),
          },
        ]}
        showsVerticalScrollIndicator={false}
        data={jobs}
        keyExtractor={(item: any) => item?._id}
        renderItem={({ item, index }: any) => {
          if (index + 1 % 2 === 0) {
            return <BannerAdd />;
          } else {
            return (
              <JobCard
                job={item}
                screen="home"
                setShowLoginModal={handleShowLoginModal}
              />
            );
          }
        }}

        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onRefresh={handleRefresh}
        refreshing={isRefetching}
        scrollEventThrottle={16}
        recycleItems={true}
        initialScrollIndex={0}
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
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;