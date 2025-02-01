import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootNavigator} from './src/navigation/navigation';

function App(): JSX.Element {
  useEffect(() => {
    // 앱 초기화가 완료되면 스플래시 스크린을 숨깁니다
    const init = async () => {
      // 여기에 필요한 초기화 작업을 추가할 수 있습니다
      await RNBootSplash.hide({fade: true});
    };

    init();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
