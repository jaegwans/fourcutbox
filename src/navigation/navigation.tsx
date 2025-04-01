import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  LoginScreen,
  MainScreen,
  MapScreen,
  SavePhotoScreen,
  SettingsScreen,
} from '../screens';
import {colors} from '../theme/colors';

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
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.tab.active,
        tabBarInactiveTintColor: colors.tab.inactive,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: '사진목록',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="image-multiple-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: '부스찾기',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="map-marker-check-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SavePhoto"
        component={SavePhotoScreen}
        options={{
          title: '사진저장',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="folder-upload-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '설정',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={size}
              color={color}
            />
          ),
        }}
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
