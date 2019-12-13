import { NativeModules } from 'react-native';
import { MapView, Marker, Polyline, Polygon, Circle, HeatMap, MultiPoint, Offline } from './lib/amap3d';

const { AMapModule } = NativeModules;

export default AMapModule;
export { MapView, Marker, Polyline, Polygon, Circle, HeatMap, MultiPoint, Offline };
