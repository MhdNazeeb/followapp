import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from "@d11/react-native-fast-image";

import { View } from 'react-native';
import { getHeight, getWidth } from '../../../Theme/constens';
import { InfoRow } from './InfoRow';
import { SectionHeader } from './SectionHeader';

interface JobOverviewCardProps {
  job: any;
  onImagePress: () => void;
}

export const JobOverviewCard: React.FC<JobOverviewCardProps> = ({ job, onImagePress }) => {
  return (
    <View style={overviewStyles.card}>
      <SectionHeader title="Job Overview" />

      {job?.image && job.image !== "" && job.image !== null && (
        <TouchableOpacity style={overviewStyles.thumbnailContainer} onPress={onImagePress}>
          <FastImage source={{ uri: job.image }} style={overviewStyles.thumbnailImage} resizeMode="cover" />
        </TouchableOpacity>
      )}

      <View style={overviewStyles.detailsGrid}>
        <InfoRow icon="work" label="Job Title" value={job?.jobTitle} />
        <InfoRow icon="business" label="Company Name" value={job?.companyName} />
        <InfoRow icon="work-outline" label="Job Type" value={job?.jobType} />
        <InfoRow icon="email" label="Email" value={job?.email} isLink />
        <InfoRow icon="phone" label="Phone" value={job?.phone} />
        <InfoRow icon="language" label="Website Link" value={job?.websiteLink} isLink />
        <InfoRow icon="access-time" label="Experience" value={job?.experience} />
        <InfoRow icon="location-on" label="Location" value={job?.location} />
        <InfoRow icon="category" label="Industry" value={job?.industry} />
      </View>

      <View style={overviewStyles.bottomDecoration} />
    </View>
  );
};

const overviewStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: getWidth(50),
    marginTop: getHeight(60),
    marginHorizontal: getWidth(25),
    padding: getWidth(30),
    elevation: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  thumbnailContainer: {
    width: '100%',
    height: getHeight(5.5),
    borderRadius: getWidth(50),
    overflow: 'hidden',
    marginBottom: getHeight(50),
    backgroundColor: '#f3f4f6',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  detailsGrid: {
    gap: getHeight(80),
  },
  bottomDecoration: {
    marginTop: getHeight(50),
    height: 4,
    backgroundColor: '#ede9fe',
    borderRadius: 2,
    opacity: 0.3,
  },
});
