import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../components/Header'
import { getHeight, getWidth } from '../../../Theme/constens'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import JobCard from '../../../components/JobCard'
import { JobData } from '../../../types/JobData'
import { useGetSaved } from '../../../services/api/useGetSaved'
import { getItem } from '../../../utils/storage'
import CommonStyles from '../../../Theme/commonStyles'



const SavedList = () => {
  const [userid, setUserId] = useState<string>('');

  const { data: jobs, isLoading } = useGetSaved(userid);
  const [savedJobs, setSavedJobs] = useState<any>([]);

  useEffect(() => {
    const fetchUserId = async () => {
      const yourId: string = (await getItem<string>('userId')) ?? '';
      setUserId(yourId);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    console.log('jobs', jobs);
    if (jobs) {
      console.log('jobs', isLoading);
      setSavedJobs(jobs?.savedJobs);
    }
  }, [jobs]);



  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        maxWidth: getWidth(1), minHeight: getHeight(15), marginTop: getWidth(20)
      }}>
        <Text style={{ fontSize: getWidth(17), fontWeight: "bold", color: "black" }}>Saved Jobs</Text>
      </View>

      {/* First Job Card */}
      <View style={{ flex: 1 }}>
        {savedJobs && savedJobs.length > 0 ? (
          <FlatList
            data={savedJobs}
            keyExtractor={(item) => item?._id}
            renderItem={({ item }) => <JobCard job={item} screen='saved' />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={[CommonStyles.centerContainer]}>
            <Text>Empty no Data</Text>
          </View>
        )}
      </View>

    </SafeAreaView>
  )
}

export default SavedList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: getWidth(20),
    paddingRight: getWidth(20),
    backgroundColor: "white"
  },
  jobList: {
    flex: 1,
  },

})