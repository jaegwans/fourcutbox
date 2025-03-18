import React, {useEffect, useState} from 'react';
import {Platform, StatusBar, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './MapScreen.styles';

interface PhotoBooth {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: '인생네컷' | '포토이즘' | '포토그레이' | '하루필름' | '돈룩업';
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const PHOTO_BOOTHS: PhotoBooth[] = [
  {
    id: '1',
    name: '인생네컷 홍대점',
    latitude: 37.557527,
    longitude: 126.924191,
    type: '인생네컷',
  },
  {
    id: '2',
    name: '포토이즘 홍대점',
    latitude: 37.558527,
    longitude: 126.925191,
    type: '포토이즘',
  },
  // ... 더 많은 네컷사진관 데이터 추가 필요
];

export const MapScreen = () => {
  const [region, setRegion] = useState<Region>({
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    // 상태바 스타일 설정
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }

    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth === 'granted') {
          getCurrentLocation();
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          setRegion(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    requestLocationPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation
        showsMyLocationButton>
        {PHOTO_BOOTHS.map(booth => (
          <Marker
            key={booth.id}
            coordinate={{
              latitude: booth.latitude,
              longitude: booth.longitude,
            }}
            title={booth.name}
            description={booth.type}>
            <View style={styles.markerContainer}>
              <View style={styles.marker} />
            </View>
          </Marker>
        ))}
      </MapView>
    </SafeAreaView>
  );
};
