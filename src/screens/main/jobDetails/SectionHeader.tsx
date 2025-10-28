import { StyleSheet, Text, View } from "react-native";

import { getHeight, getWidth } from "../../../Theme/constens";

interface SectionHeaderProps {
    title: string;
  }
  
  export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
    return (
      <View style={sectionHeaderStyles.container}>
        <Text style={sectionHeaderStyles.title}>{title}</Text>
        <View style={sectionHeaderStyles.underline} />
      </View>
    );
  };
  
  const sectionHeaderStyles = StyleSheet.create({
    container: {
      marginBottom: getHeight(60),
    },
    title: {
      fontSize: getHeight(45),
      fontWeight: '700',
      color: '#212529',
      marginBottom: getHeight(100),
    },
    underline: {
      height: 4,
      width: getWidth(12),
      backgroundColor: '#7c3aed',
      borderRadius: 2,
    },
  });