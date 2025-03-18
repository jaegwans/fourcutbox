import {
  appleAuth,
  AppleButton,
  AppleCredentialState, // 로그인 기능
  AppleError,
  AppleRequestOperation,
  AppleRequestScope,
} from '@invertase/react-native-apple-authentication';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text from '../../components/common/Text';
import type {LoginScreenNavigationProp} from '../../navigation/navigation';
import {styles} from './LoginScreen.styles';

async function onAppleLogin() {
  try {
    // Apple 로그인 요청
    const appleAuthResponse = await appleAuth.performRequest({
      requestedOperation: AppleRequestOperation.LOGIN,
      requestedScopes: [AppleRequestScope.FULL_NAME, AppleRequestScope.EMAIL],
    });

    // 결과 확인
    console.log('AppleAuthResponse', appleAuthResponse);

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthResponse.user,
    );
    console.log('CredentialState', credentialState);
    if (credentialState === AppleCredentialState.AUTHORIZED) {
      // 로그인 성공 처리
      console.log('로그인 성공 - Authorized');
      // 여기서 앱 내 전역 상태관리 (Redux/Zustand 등)나 AsyncStorage/SecureStore에 저장 가능
    } else {
      console.log('로그인 실패 - Not authorized');
    }
  } catch (error: any) {
    // 로그인 취소 시 처리
    if (error.code === AppleError.CANCELED) {
      console.log('로그인 취소');
    } else {
      console.log('로그인 에러', error);
    }
  }
}

export const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>4cut box</Text>
      </View>
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        cornerRadius={8}
        style={{width: 200, height: 50}}
        onPress={() => {
          navigation.navigate('MainTab');
        }}
      />
      <Text style={styles.copyright}>@fourcutbox</Text>
    </SafeAreaView>
  );
};
