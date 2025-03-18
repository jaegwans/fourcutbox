import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './MainScreen.styles';

export const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>메인 화면 (저장된 사진 목록)</Text>
    </SafeAreaView>
  );
};
