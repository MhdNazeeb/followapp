import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface ErrorViewProps {
    message: string;
    onBackPress: () => void;
  }
  
  export const ErrorView: React.FC<ErrorViewProps> = ({ message, onBackPress }) => {
    return (
      <SafeAreaView style={errorViewStyles.container}>
        <View style={errorViewStyles.content}>
          <Text style={errorViewStyles.message}>{message}</Text>
          <TouchableOpacity onPress={onBackPress} style={errorViewStyles.button}>
            <Text style={errorViewStyles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  const errorViewStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    message: {
      fontSize: 16,
      color: '#d32f2f',
      marginBottom: 20,
      textAlign: 'center',
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    buttonText: {
      color: '#4285f4',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  