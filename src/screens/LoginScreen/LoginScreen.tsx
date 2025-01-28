import React from 'react';
import {Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthStore} from '../../stores/authStore';
import {useNavigation} from '@react-navigation/native';
import type {LoginScreenNavigationProp} from '../../navigation/navigation';

export const LoginScreen = () => {
  const login = useAuthStore(state => state.login);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  return (
    <SafeAreaView>
      <Text>로그인 화면</Text>
      <Button
        title="로그인"
        onPress={() => {
          login();
          navigation.navigate('MainTab');
        }}
      />
    </SafeAreaView>
  );
};
