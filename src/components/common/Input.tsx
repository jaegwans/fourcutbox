import React from 'react';
import {StyleSheet, TextInput, useColorScheme, View} from 'react-native';
import colors from '../../theme/colors';

const Input = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
}: {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}) => {
  const theme = useColorScheme();
  return (
    <View
      style={[
        styles.inputContainer,
        {borderColor: colors.border[theme || 'light']},
      ]}>
      <TextInput
        style={[styles.input, {color: colors.text[theme || 'light']}]}
        placeholder={placeholder}
        placeholderTextColor={colors.gray500[theme || 'light']}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
  },
});

export default Input;
