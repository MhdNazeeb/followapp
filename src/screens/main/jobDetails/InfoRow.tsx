import MaterialIcons from "@react-native-vector-icons/material-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getHeight, getWidth } from "../../../Theme/constens";

interface InfoRowProps {
    icon: string;
    label: string;
    value: string;
    isLink?: boolean;
  }
  
  export const InfoRow: React.FC<InfoRowProps> = React.memo(({ icon, label, value, isLink }) => {
    if (!value) return null;
  
    return (
      <View style={infoRowStyles.container}>
        <View style={infoRowStyles.iconWrapper}>
          <MaterialIcons name={icon as any} size={18} color="#7c3aed" />
        </View>
        <View style={infoRowStyles.textContainer}>
          <Text style={infoRowStyles.label}>{label}</Text>
          <Text style={[infoRowStyles.value, isLink && infoRowStyles.linkText]} numberOfLines={2} ellipsizeMode="tail">
            {value}
          </Text>
        </View>
      </View>
    );
  });
  
  const infoRowStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: getWidth(40),
      borderRadius: getWidth(50),
      backgroundColor: 'transparent',
    },
    iconWrapper: {
      width: getWidth(13),
      height: getWidth(13),
      borderRadius: getWidth(50),
      backgroundColor: '#ede9fe',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: getWidth(40),
      marginTop: getHeight(300),
    },
    textContainer: {
      flex: 1,
    },
    label: {
      fontSize: getHeight(70),
      fontWeight: '600',
      color: '#6b7280',
      marginBottom: getHeight(150),
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    value: {
      fontSize: getHeight(60),
      color: '#212529',
      fontWeight: '500',
      lineHeight: getHeight(50),
    },
    linkText: {
      color: '#7c3aed',
    },
  });