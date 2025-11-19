import { 
  useAnimatedScrollHandler, 
  useAnimatedStyle, 
  useSharedValue, 
  interpolate, 
  Extrapolation,
  withSpring
} from "react-native-reanimated";

export const useScrollAnimation = () => {
  const scrollY = useSharedValue(0);
  const lastScrollY = useSharedValue(0);
  const scrollDirection = useSharedValue(0); // 1 for down, -1 for up

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.value) {
        scrollDirection.value = 1; // scrolling down
      } else if (currentScrollY < lastScrollY.value) {
        scrollDirection.value = -1; // scrolling up
      }
      
      lastScrollY.value = currentScrollY;
      scrollY.value = currentScrollY;
    },
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    // Smooth interpolation for header
    const translateY = interpolate(
      scrollY.value,
      [0, 100, 150],
      [0, -15, -30],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollY.value,
      [0, 100, 150],
      [1, 0.5, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: withSpring(translateY, { damping: 20, stiffness: 90 }) }],
      opacity: withSpring(opacity, { damping: 20, stiffness: 90 }),
    };
  });

  const animatedButtonsStyle = useAnimatedStyle(() => {
    // Smooth interpolation for buttons
    const translateY = interpolate(
      scrollY.value,
      [0, 100, 150],
      [0, 15, 30],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollY.value,
      [0, 100, 150],
      [1, 0.5, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: withSpring(translateY, { damping: 20, stiffness: 90 }) }],
      opacity: withSpring(opacity, { damping: 20, stiffness: 90 }),
    };
  });

  return { scrollHandler, animatedHeaderStyle, animatedButtonsStyle };
};