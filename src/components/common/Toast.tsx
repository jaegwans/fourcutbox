import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, useColorScheme} from 'react-native';
import colors from '../../theme/colors';

const Toast = ({
  message,
  visible,
  duration = 3000,
}: {
  message: string;
  visible: boolean;
  duration?: number;
}) => {
  const theme = useColorScheme();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setTimeout(
        () =>
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(),
        duration,
      );
    }
  }, [visible, fadeAnim, duration]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {opacity: fadeAnim, backgroundColor: colors.gray700[theme || 'light']},
      ]}>
      <Text style={[styles.toastText, {color: colors.text[theme || 'light']}]}>
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 40,
    left: '10%',
    right: '10%',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  toastText: {
    fontSize: 14,
  },
});

export default Toast;
