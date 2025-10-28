import { StyleSheet, Text, View } from "react-native";
import { getHeight, getWidth } from "../../../Theme/constens";
import Colors from "../../../Theme/Colors";

interface JobHeaderProps {
    job: any;
  }
  
  export const JobHeader: React.FC<JobHeaderProps> = ({ job }) => {
    return (
      <View style={headerStyles.container}>
        <View style={headerStyles.titleContainer}>
          <Text style={headerStyles.title} numberOfLines={2} ellipsizeMode="tail">
            {job?.jobTitle || 'Job Title'}
          </Text>
          {job?.jobType && (
            <View style={headerStyles.jobTypeBadge}>
              <Text style={headerStyles.jobTypeText}>{job.jobType}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  
  const headerStyles = StyleSheet.create({
    container: {
      paddingVertical: getHeight(50),
      paddingHorizontal: getWidth(25),
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#e9ecef',
      minHeight: getHeight(8),
    },
    titleContainer: {
      flexDirection: 'column',
      gap: getHeight(80),
    },
    title: {
      fontSize: getHeight(35),
      fontWeight: '700',
      color: '#212529',
      lineHeight: getHeight(30),
    },
    jobTypeBadge: {
      backgroundColor: Colors.primary,
      borderRadius: getWidth(35),
      paddingVertical: getHeight(120),
      paddingHorizontal: getWidth(35),
      alignSelf: 'flex-start',
      borderWidth: 1,
      borderColor: '#bbdefb',
    },
    jobTypeText: {
      color: Colors.white,
      fontWeight: '600',
      fontSize: getHeight(70),
    },
  });
  
  