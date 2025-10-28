import { SectionHeader } from "./SectionHeader";
import { StyleSheet, Text, TouchableOpacity,View } from "react-native";
import { getHeight, getWidth } from "../../../Theme/constens";
import React from "react";

interface JobDescriptionProps {
    description: string;
    expanded: boolean;
    onToggleExpand: () => void;
  }
  
const JobDescriptionComponent: React.FC<JobDescriptionProps> = ({ description, expanded, onToggleExpand }) => {
    const truncatedText = description?.slice(0, 200);
    const shouldShowToggle = description?.length > 200;
  
    return (
      <View style={descriptionStyles.container}>
        <SectionHeader title="Job Description" />
        
        <View style={descriptionStyles.textContainer}>
          <Text style={descriptionStyles.text}>
            {expanded ? description : `${truncatedText}${shouldShowToggle ? '...' : ''}`}
          </Text>
          
          {shouldShowToggle && (
            <TouchableOpacity style={descriptionStyles.toggleButton} onPress={onToggleExpand}  activeOpacity={0.7}>
              <Text style={descriptionStyles.toggleText}>
                {expanded ? 'Show Less ▲' : 'Show More ▼'}
              </Text>
            </TouchableOpacity>
          )}
          
          {expanded && (
            <Text style={descriptionStyles.helpText}>
              Long press to select or copy this text.
            </Text>
          )}
        </View>
      </View>
    );
  };

  export const JobDescription = React.memo(
    JobDescriptionComponent,
  );
  
  const descriptionStyles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: getWidth(50),
      marginTop: getHeight(60),
      marginHorizontal: getWidth(25),
      padding: getWidth(30),
      elevation: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: '#e9ecef',
    },
    textContainer: {
      marginTop: getHeight(60),
    },
    text: {
      fontSize: getHeight(60),
      lineHeight: getHeight(45),
      color: '#495057',
      textAlign: 'justify',
    },
    toggleButton: {
      paddingVertical: getHeight(100),
      paddingHorizontal: getWidth(150),
      alignSelf: 'flex-start',
      marginTop: getHeight(100),
      backgroundColor: 'rgba(124, 58, 237, 0.1)',
      borderRadius: 8,
      minHeight: 44,
      minWidth: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toggleText: {
      color: '#7c3aed',
      fontWeight: '600',
      fontSize: getHeight(60),
    },
    helpText: {
      fontSize: 12,
      color: '#999',
      marginTop: 8,
    },
  });