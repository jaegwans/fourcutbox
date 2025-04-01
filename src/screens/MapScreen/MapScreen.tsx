import {
  Camera,
  Coord,
  NaverMapCircleOverlay,
  NaverMapMarkerOverlay,
  NaverMapPathOverlay,
  NaverMapView,
  NaverMapViewRef,
  Region,
} from '@mj-studio/react-native-naver-map';
import Geolocation from '@react-native-community/geolocation';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface PhotoBooth {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const fetchNearbyPhotoBooths = async (
  query: string,
  lat: number,
  lng: number,
) => {
  const response = await fetch(
    `https://naveropenapi.apigw.ntruss.com/map-place/v1/search?query=${encodeURIComponent(
      query,
    )}&coordinate=${lng},${lat}`,
    {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': 'YOUR_CLIENT_ID',
        'X-NCP-APIGW-API-KEY': 'YOUR_CLIENT_SECRET',
      },
    },
  );

  const data = await response.json();

  return data.places.map((place: any) => ({
    id: place.id,
    name: place.name,
    latitude: parseFloat(place.y),
    longitude: parseFloat(place.x),
  }));
};

export const MapScreen = () => {
  const mapRef = useRef<NaverMapViewRef>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [selectedBooth, setSelectedBooth] = useState<PhotoBooth | null>(null);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      getCurrentLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }, []);

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        mapRef.current?.animateCameraTo({
          latitude,
          longitude,
          zoom: 15,
          duration: 1000,
        });
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const photoBooths: PhotoBooth[] = [
    {
      id: '1',
      name: '인생네컷 강남점',
      latitude: 37.498095,
      longitude: 127.02761,
    },
    {
      id: '2',
      name: '포토이즘 강남점',
      latitude: 37.49959,
      longitude: 127.026397,
    },
  ];

  return (
    <View style={styles.container}>
      <Text>MapScreen</Text>
      <NaverMapView
        ref={mapRef}
        style={styles.map}
        mapType="Basic"
        minZoom={10}
        maxZoom={20}
        isShowZoomControls={true}
        isShowLocationButton={true}
        camera={{
          latitude: 37.498095,
          longitude: 127.02761,
          zoom: 15,
        }}
        onTapMap={(event: Coord & {x: number; y: number}) => {
          console.log('Map tapped', event);
          setSelectedBooth(null);
        }}
        onCameraIdle={(event: Camera & {region: Region}) => {
          console.log('Camera moved', event);
        }}>
        {currentLocation && (
          <NaverMapCircleOverlay
            latitude={currentLocation.latitude}
            longitude={currentLocation.longitude}
            radius={100}
            color="rgba(255,0,0,0.3)"
            outlineWidth={2}
            outlineColor="rgba(255,0,0,0.8)"
          />
        )}

        {photoBooths.map(booth => (
          <NaverMapMarkerOverlay
            key={booth.id}
            latitude={booth.latitude}
            longitude={booth.longitude}
            caption={{text: booth.name}}
            width={40}
            height={40}
            onTap={() => {
              setSelectedBooth(booth);
              mapRef.current?.animateCameraTo({
                latitude: booth.latitude,
                longitude: booth.longitude,
                zoom: 17,
                duration: 500,
              });
            }}
          />
        ))}

        {selectedBooth && currentLocation && (
          <NaverMapPathOverlay
            coords={[
              {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              },
              {
                latitude: selectedBooth.latitude,
                longitude: selectedBooth.longitude,
              },
            ]}
            width={3}
            color="rgba(0,0,255,0.5)"
            outlineWidth={1}
            outlineColor="rgba(0,0,255,0.8)"
          />
        )}
      </NaverMapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
