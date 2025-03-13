import React from 'react';
import {Text as RNText, TextProps, useColorScheme} from 'react-native';
import colors from '../../theme/colors';

const Text = ({style, ...props}: TextProps) => {
  const theme = useColorScheme();
  return (
    <RNText
      style={[{color: colors.text[theme || 'light']}, style]}
      {...props}
    />
  );
};

export default Text;
