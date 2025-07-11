
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const Haptics = {
  success: () => ReactNativeHapticFeedback.trigger("notificationSuccess", options),
  warning: () => ReactNativeHapticFeedback.trigger("notificationWarning", options),
  error: () => ReactNativeHapticFeedback.trigger("notificationError", options),
  light: () => ReactNativeHapticFeedback.trigger("impactLight", options),
  medium: () => ReactNativeHapticFeedback.trigger("impactMedium", options),
  heavy: () => ReactNativeHapticFeedback.trigger("impactHeavy", options),
  selection: () => ReactNativeHapticFeedback.trigger("selection", options),
};
