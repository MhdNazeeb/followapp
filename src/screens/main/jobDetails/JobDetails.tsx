


import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Share, Linking, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { TouchableRipple } from 'react-native-paper';

import { RootStackParamList } from '../../../navgation/navigation.types';
import { routeNames } from '../../../navgation/Screens';
import { useGetJobById } from '../../../services/api/usegetJobById';
import { useSimilarJob } from '../../../services/api/useSimilarJob';
import { getHeight, getWidth } from '../../../Theme/constens';
import Colors from '../../../Theme/Colors';
import { Haptics } from '../../../utils/Haptics';

import ArrowComponent from '../../../components/ArrowComponent';
import ShareIcon from '../../../assets/icons/shareIcon';
import JobDetailsSkeleton from '../../../components/skelton/JobDetailsSkeleton';
import { createShareMessage } from '../../../utils/shareUtils';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { ErrorView } from '../../../components/ErrorView';
import { JobHeader } from './JobHeader';
import { JobOverviewCard } from './JobOverviewCard';
import { JobDescription } from './obDescription';
import { ApplyButtons } from '../../../components/ApplyButtons';
import { SimilarJobs } from './SimilarJobs';


interface JobDetailsProps {
  route: any;
}

const JobDetails: React.FC<JobDetailsProps> = React.memo(({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [expanded, setExpanded] = useState(false);

  const id = route.params?.jobid;
  const { data: job, isLoading, error }: any = useGetJobById(id);
  const { data: jobs }: any = useSimilarJob(id);

  const { scrollHandler, animatedHeaderStyle, animatedButtonsStyle } = useScrollAnimation();

  const handleBackPress = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  const handleShare = useCallback(async () => {
    if (!job) return;

    try {
      const message = createShareMessage(job);
      await Share.share({
        message,
        url: job.websiteLink || undefined,
        title: `Job Opportunity: ${job.jobTitle}`,
      });
      Haptics.success();
    } catch (error) {
      console.warn('Error sharing job:', error);
    }
  }, [job]);

  const handleToggleExpand = useCallback(() => {
    console.log('called toggle');
    
    setExpanded(prev => !prev);
  }, []);

  const handleWhatsAppApply = useCallback(() => {
    if (job?.phone) {
      const url = `whatsapp://send?phone=${job.phone}&text=Applying for ${job.jobTitle}`;
      Linking.openURL(url).catch(() => {
        console.warn('WhatsApp not installed or invalid number');
      });
      Haptics.success();
    }
  }, [job?.whatsappNumber, job?.jobTitle, job?.phone]);

  const handleEmailApply = useCallback(() => {
    if (job?.email) {
      const url = `mailto:${job.email}?subject=Application for ${job.jobTitle}`;
      Linking.openURL(url).catch(() => {
        console.warn('Email client not configured');
      });
      Haptics.success();
    }
  }, [job?.email, job?.jobTitle]);

  const handleImagePress = useCallback(() => {
    if (job?.image) {
      navigation.navigate(routeNames.fullImage, { image: job.image });
    }
  }, [job?.image, navigation]);

  if (isLoading) {
    return <JobDetailsSkeleton />;
  }

  if (error || !job) {
    return (
      <ErrorView
        message={error ? 'Error loading job details' : 'Job not found'}
        onBackPress={handleBackPress}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Animated Header */}
      <Animated.View style={[styles.headerBackContainer, animatedHeaderStyle]}>
        <View style={styles.headerInner}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
            hitSlop={10}
          >
            <ArrowComponent onPress={handleBackPress} />
          </TouchableOpacity>
          <TouchableRipple
            rippleColor="#808080"
            onPress={handleShare}
            style={styles.shareButton}
            borderless
            hitSlop={10}
          >
            <ShareIcon size={24} color="#000000" />
          </TouchableRipple>
        </View>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <JobHeader job={job} />

        <JobOverviewCard
          job={job}
          onImagePress={handleImagePress}
        />

        <JobDescription
          description={job?.jobDescription}
          expanded={expanded}
          onToggleExpand={handleToggleExpand}
        />

        {jobs?.length > 0 && <SimilarJobs jobs={jobs} />}
      </Animated.ScrollView>

      {/* Apply Buttons */}
      <ApplyButtons
        job={job}
        onWhatsAppPress={handleWhatsAppApply}
        onEmailPress={handleEmailApply}
        animatedStyle={animatedButtonsStyle}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerBackContainer: {
    paddingVertical: getHeight(80),
    backgroundColor: '#fff',
    minHeight: getHeight(25),
    zIndex: 1000,
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    minHeight: 44,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: getHeight(50),
    flexGrow: 1,
  },
});

export default JobDetails;

