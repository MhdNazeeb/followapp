import { Easing, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export const useScrollAnimation = () => {
    const translateYHeader = useSharedValue(0);
    const opacityHeader = useSharedValue(1);
    const opacityButtons = useSharedValue(1);
    const translateYButtons = useSharedValue(0);
  
    const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
        const scrollY = event.contentOffset.y;
  
        if (scrollY > 100) {
          translateYHeader.value = withTiming(-30, { duration: 300, easing: Easing.inOut(Easing.ease) });
          opacityHeader.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) });
          opacityButtons.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) });
          translateYButtons.value = withTiming(30, { duration: 300, easing: Easing.inOut(Easing.ease) });
        }
      },
      onMomentumEnd: () => {
        translateYHeader.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) });
        opacityHeader.value = withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) });
        opacityButtons.value = withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) });
        translateYButtons.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) });
      },
    });
  
    const animatedHeaderStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateYHeader.value }],
      opacity: opacityHeader.value,
    }));
  
    const animatedButtonsStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateYButtons.value }],
      opacity: opacityButtons.value,
    }));
  
    return { scrollHandler, animatedHeaderStyle, animatedButtonsStyle };
  };