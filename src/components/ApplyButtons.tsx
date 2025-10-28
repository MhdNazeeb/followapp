import WhatsAppIcon from "../assets/icons/WhatsAppIcon";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { useMemo } from "react";
import Animated from "react-native-reanimated";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-gesture-handler";
import { getHeight, getWidth } from "../Theme/constens";
import Colors from "../Theme/Colors";

interface ApplyButtonsProps {
  job: any;
  onWhatsAppPress: () => void;
  onEmailPress: () => void;
  animatedStyle: any;
}

export const ApplyButtons: React.FC<ApplyButtonsProps> = ({ job, onWhatsAppPress, onEmailPress, animatedStyle }) => {
  const buttons = useMemo(() => {
    const result = [];
    if (job?.phone) {
      result.push({
        key: 'whatsapp',
        icon: <WhatsAppIcon />,
        text: 'Apply',
        backgroundColor: 'green',
        onPress: onWhatsAppPress,
      });
    }
    if (job?.email) {
      result.push({
        key: 'email',
        icon: <MaterialIcons name="email" size={18} color={Colors.white} />,
        text: 'Apply',
        backgroundColor: Colors.primary,
        onPress: onEmailPress,
      });
    }
    return result;
  }, [job?.phone, job?.email, onWhatsAppPress, onEmailPress]);

  if (buttons.length === 0) return null;

  return (
    <Animated.View style={[applyButtonsStyles.container, animatedStyle]}>
      {buttons.map(button => (
        <TouchableOpacity
          key={button.key}
          style={[applyButtonsStyles.button, { backgroundColor: button.backgroundColor }]}
          onPress={button.onPress}
          activeOpacity={0.7}
        >
          {button.icon}
          <Text style={applyButtonsStyles.text}>{button.text}</Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

const applyButtonsStyles = StyleSheet.create({
  container: {
    minWidth: getWidth(1),
    maxHeight: getHeight(20),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: getWidth(20),
    marginBottom: getWidth(60),
    paddingHorizontal: getWidth(25),
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  button: {
    flex: 1,
    paddingHorizontal: getWidth(7),
    paddingVertical: getHeight(90),
    borderRadius: getWidth(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getWidth(40),
  },
  text: {
    color: Colors.white,
    fontSize: getHeight(60),
    fontWeight: '600',
  },
});
