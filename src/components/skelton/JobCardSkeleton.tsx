import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { getHeight, getWidth } from '../../Theme/constens';

const JobCardSkeleton = () => (
  <View style={styles.jobCard}>
    <SkeletonPlaceholder borderRadius={12}>
      <SkeletonPlaceholder.Item flexDirection="row">
        {/* Animated Gradient Circle */}
        <SkeletonPlaceholder.Item width={50} height={50} borderRadius={8} />

        <SkeletonPlaceholder.Item flex={1} marginLeft={12}>
          {/* Job Title */}
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginBottom={8}>
            <SkeletonPlaceholder.Item width={20} height={20} borderRadius={4} />
            <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} marginLeft={8} />
          </SkeletonPlaceholder.Item>
          {/* Company Name */}
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginBottom={4}>
            <SkeletonPlaceholder.Item width={20} height={10} borderRadius={2} />
            <SkeletonPlaceholder.Item width={80} height={14} borderRadius={4} marginLeft={8} />
          </SkeletonPlaceholder.Item>
          {/* Location */}
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginBottom={4}>
            <SkeletonPlaceholder.Item width={20} height={10} borderRadius={2} />
            <SkeletonPlaceholder.Item width={60} height={14} borderRadius={4} marginLeft={8} />
          </SkeletonPlaceholder.Item>
          {/* Salary */}
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginBottom={12}>
            <SkeletonPlaceholder.Item width={20} height={10} borderRadius={2} />
            <SkeletonPlaceholder.Item width={60} height={14} borderRadius={4} marginLeft={8} />
          </SkeletonPlaceholder.Item>
          {/* Footer */}
          <SkeletonPlaceholder.Item flexDirection="row-reverse" justifyContent="space-between" alignItems="center">
            {/* Saved Icon */}
            <SkeletonPlaceholder.Item width={24} height={24} borderRadius={12} />
            {/* Tags */}
            <SkeletonPlaceholder.Item flexDirection="row">
              <SkeletonPlaceholder.Item width={60} height={24} borderRadius={20} marginRight={8} />
              <SkeletonPlaceholder.Item width={60} height={24} borderRadius={20} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </View>
);

const styles = StyleSheet.create({
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: getHeight(60),
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    maxWidth: getWidth(1),
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
});

export default JobCardSkeleton;