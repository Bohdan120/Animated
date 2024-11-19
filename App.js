import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const LoadingDots = () => {
  const dotCount = 3; 
  const animationDuration = 500; 

  const animations = Array(dotCount)
    .fill(0)
    .map(() => useSharedValue(0));

  const dotStyles = animations.map((animation) =>
    useAnimatedStyle(() => ({
      opacity: animation.value,
      transform: [{ scale: animation.value }],
    }))
  );

  React.useEffect(() => {
    animations.forEach((animation, index) => {
      animation.value = withRepeat(
        withDelay(
          index * animationDuration, 
          withSequence(
            withTiming(1, { duration: animationDuration, easing: Easing.inOut(Easing.ease) }),
            withTiming(0, { duration: animationDuration, easing: Easing.inOut(Easing.ease) })
          )
        ),
        -1, 
        false
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      {dotStyles.map((style, index) => (
        <Animated.View
          key={index}
          style={[styles.dot, style]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#3498db',
    marginHorizontal: 5,
  },
});

export default LoadingDots;
