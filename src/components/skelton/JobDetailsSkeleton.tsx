import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { getHeight, getWidth } from '../../Theme/constens';

const JobDetailsSkeleton = () => (
  <SkeletonPlaceholder borderRadius={8}>
    <View>
      {/* Header with back and share */}
      <View style={styles.headerBackContainer}>
        <View style={styles.headerRow}>
          <SkeletonPlaceholder.Item width={80} height={44} borderRadius={8} />
          <SkeletonPlaceholder.Item width={40} height={40} borderRadius={20} />
        </View>
      </View>

      {/* Use a View instead of ScrollView for skeleton */}
      <View style={styles.scrollContentContainer}>
        {/* Title & Job Type */}
        <View style={styles.headerContainer}>
          <SkeletonPlaceholder.Item width={180} height={30} borderRadius={6} marginBottom={16} />
          <SkeletonPlaceholder.Item width={90} height={28} borderRadius={20} />
        </View>

        {/* Job Overview Card */}
        <View style={styles.card}>
          <SkeletonPlaceholder.Item width={120} height={24} borderRadius={6} marginBottom={24} />
          <View style={styles.rowContainer}>
            {[...Array(4)].map((_, idx) => (
              <View style={styles.infoItem} key={idx}>
                <SkeletonPlaceholder.Item width={22} height={22} borderRadius={11} marginRight={12} />
                <View style={{ flex: 1 }}>
                  <SkeletonPlaceholder.Item width={70} height={16} borderRadius={4} marginBottom={8} />
                  <SkeletonPlaceholder.Item width={90} height={14} borderRadius={4} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Job Description */}
        <View style={styles.descriptionContainer}>
          <SkeletonPlaceholder.Item width={140} height={24} borderRadius={6} marginBottom={16} />
          <SkeletonPlaceholder.Item width="100%" height={80} borderRadius={6} marginBottom={12} />
          <SkeletonPlaceholder.Item width={100} height={20} borderRadius={6} />
        </View>
      </View>
    </View>
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  headerBackContainer: {
    paddingVertical: getHeight(80),
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollContentContainer: {
    paddingBottom: getHeight(50),
  },
  headerContainer: {
    paddingVertical: getHeight(50),
    paddingHorizontal: getWidth(25),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: getWidth(50),
    marginTop: getHeight(60),
    marginHorizontal: getWidth(25),
    padding: getWidth(30),
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '48%',
    marginBottom: getHeight(55),
    paddingRight: getWidth(70),
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    borderRadius: getWidth(50),
    marginTop: getHeight(60),
    marginHorizontal: getWidth(25),
    padding: getWidth(30),
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 32,
  },
});

export default JobDetailsSkeleton;