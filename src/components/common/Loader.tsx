import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import colors from '../../theme/colors';

const Loader = ({
  size = 'large',
  color,
}: {
  size?: 'small' | 'large';
  color?: string;
}) => {
  const theme = useColorScheme(); // 다크모드 대응
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size}
        color={color || colors.primary[theme || 'light']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
