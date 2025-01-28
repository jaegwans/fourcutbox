import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  LoginScreen,
  MainScreen,
  MapScreen,
  SavePhotoScreen,
  SettingsScreen,
} from '../screens';

export type RootStackParamList = {
  Login: undefined;
  MainTab: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{title: '사진목록'}}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{title: '부스찾기'}}
      />
      <Tab.Screen
        name="SavePhoto"
        component={SavePhotoScreen}
        options={{title: '사진저장'}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: '설정'}}
      />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainTab"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
