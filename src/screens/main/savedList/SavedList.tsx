import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../../../components/Header'
import { getHeight, getWidth } from '../../../Theme/constens'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import JobCard from '../../../components/JobCard'
import { JobData } from '../../../types/JobData'
import { useGetSaved } from '../../../services/api/useGetSaved'
import { getItem } from '../../../utils/storage'
import CommonStyles from '../../../Theme/commonStyles'
import { useNavigation } from '@react-navigation/native';
import { routeNames } from '../../../navgation/Screens';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navgation/navigation.types';


const SavedList = () => {
  const [userid, setUserId] = useState<string>('');
  const insets = useSafeAreaInsets();
  const TAB_BAR_HEIGHT = 68;
  const bottomPadding = Platform.OS === 'ios' ? 
  TAB_BAR_HEIGHT + insets.bottom : 
  TAB_BAR_HEIGHT;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
            renderItem={({ item }) => <JobCard job={item} screen='saved'  />}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={7}
            removeClippedSubviews={true}
            contentContainerStyle={[
              { 
                paddingBottom: bottomPadding ,
                justifyContent: 'center',
              }
            ]}
          />
          
        ) : (
          <View style={[CommonStyles.centerContainer]}>
            {(!userid || userid === 'null' || userid === '') ? (
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate(routeNames.login)}
              >
                <Text style={styles.loginButtonText}>Login to view saved jobs</Text>
              </TouchableOpacity>
            ) : (
              <Text>Empty no Data</Text>
            )}
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
    backgroundColor: "white",
    padding:getWidth(23)
  },
  jobList: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginBottom: 0,
    elevation: 2,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})