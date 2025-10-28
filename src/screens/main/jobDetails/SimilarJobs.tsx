import { FlatList, StyleSheet, View } from 'react-native';
import { SectionHeader } from './SectionHeader';
import JobCard from '../../../components/JobCard';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getHeight, getWidth } from '../../../Theme/constens';

interface SimilarJobsProps {
  jobs: any[];
}

export const SimilarJobs: React.FC<SimilarJobsProps> = ({ jobs }) => {
  return (
    <View style={similarJobsStyles.container}>
      <View style={similarJobsStyles.header}>
        <SectionHeader title="Similar Jobs" />
      </View>
      <FlatList
        data={jobs}
        renderItem={({ item }) => <JobCard job={item} screen="search" />}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={similarJobsStyles.separator} />}
        contentContainerStyle={similarJobsStyles.listContainer}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
      />
    </View>
  );
};

const similarJobsStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginTop: getHeight(70),
    paddingVertical: getHeight(60),
  },
  header: {
    paddingHorizontal: getWidth(25),
    marginBottom: getHeight(40),
  },
  listContainer: {
    paddingHorizontal: getWidth(25),
    paddingBottom: getHeight(40),
  },
  separator: {
    height: getHeight(60),
  },
});
