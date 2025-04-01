declare module 'react-native-naver-map' {
  import {Component} from 'react';
  import {ViewStyle} from 'react-native';

  interface NaverMapViewProps {
    style?: ViewStyle;
    center?: {
      latitude: number;
      longitude: number;
    };
    zoomControl?: boolean;
    locationButtonEnabled?: boolean;
    children?: React.ReactNode;
  }

  interface MarkerProps {
    coordinate: {
      latitude: number;
      longitude: number;
    };
    title?: string;
    caption?: string;
    children?: React.ReactNode;
  }

  class NaverMapView extends Component<NaverMapViewProps> {
    constructor(props: NaverMapViewProps);
  }

  export default NaverMapView;
}
