import { Location } from "react-native-a-map-module/lib/geolocation";
/**
 * 坐标信息
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Coordinates
 */
export interface Coordinates {
    latitude: number;
    longitude: number;
    altitude: number;
    accuracy: number;
    altitudeAccuracy: number;
    heading: number;
    speed: number;
}
/**
 * 定位信息
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Position
 */
export interface Position {
    coords: Coordinates;
    timestamp: number;
    location: Location;
}
/**
 * 定位错误信息
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/PositionError
 */
export declare class PositionError {
    static PERMISSION_DENIED: 1;
    static POSITION_UNAVAILABLE: 2;
    static TIMEOUT: 3;
    code: number;
    message: string;
    location: Location;
    constructor(code: number, message: string, location: Location);
}
/**
 * 定位选项
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/PositionOptions
 */
export interface PositionOptions {
    timeout?: number;
    maximumAge?: number;
    enableHighAccuracy?: boolean;
    /**
     * @see [[setDistanceFilter]]
     */
    distanceFilter?: number;
}
/**
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation
 */
export default class Geolocation {
    /**
     * 获取当前位置信息
     *
     * 注意：使用该方法会停止持续定位
     *
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition
     */
    static getCurrentPosition(success: (position: Position) => void, error?: (error: PositionError) => void, options?: PositionOptions): void;
    /**
     * 注册监听器进行持续定位
     *
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition
     */
    static watchPosition(success: (position: Position) => void, error?: (error: PositionError) => void, options?: PositionOptions): number;
    /**
     * 移除位置监听
     *
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/clearWatch
     */
    static clearWatch(id: number): void;
}
