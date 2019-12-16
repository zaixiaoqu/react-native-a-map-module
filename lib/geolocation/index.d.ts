import { Location, ReGeocode, AppKey, LocationMode, LocationPurpose, GeoLanguage } from "react-native-a-map-module/lib/geolocation/types";
/**
 * 初始化 SDK
 *
 * @param key 高德开放平台应用 Key
 */
export declare function init(key: AppKey): Promise<void>;
/**
 * 添加定位监听函数
 *
 * @param listener
 */
export declare function addLocationListener(listener: (location: Location & ReGeocode) => void): import("react-native").EmitterSubscription;
/**
 * 开始持续定位
 */
export declare function start(): void;
/**
 * 停止持续定位
 */
export declare function stop(): void;
/**
 * 获取当前是否正在定位的状态
 */
export declare function isStarted(): boolean;
/**
 * 设置发起定位请求的时间间隔（毫秒），默认 2000，最小值为 1000
 *
 * @default 2000
 * @platform android
 */
export declare function setInterval(interval: number): void;
/**
 * 设置是否单次定位
 *
 * @default false
 * @platform android
 */
export declare function setOnceLocation(isOnceLocation: boolean): void;
/**
 * 设置是否允许调用 WiFi 刷新
 *
 * 当设置为 `false` 时会停止主动调用 wifi 刷新，将会极大程度影响定位精度，
 * 但可以有效的降低定位耗电。
 *
 * @default true
 * @platform android
 */
export declare function setWifiScan(isWifiScan: boolean): void;
/**
 * 设置是否使用设备传感器
 *
 * @default false
 * @platform android
 */
export declare function setSensorEnable(enable: boolean): void;
/**
 * 设置是否开启wifi始终扫描
 *
 * 只有设置了 `android.permission.WRITE_SECURE_SETTINGS` 权限后才会开启。
 * 开启后，即使关闭 wifi 开关的情况下也会扫描 wifi。
 * 此方法为静态方法，设置一次后其他定位 client 也会生效。
 *
 * @default true
 * @platform android
 */
export declare function setOpenAlwaysScanWifi(isOpen: boolean): void;
/**
 * 设置定位是否等待 WiFi 列表刷新
 *
 * 定位精度会更高，但是定位速度会变慢 1-3 秒，
 * 当设置为 `true` 时，连续定位会自动变为单次定位。
 *
 * @default false
 * @platform android
 */
export declare function setOnceLocationLatest(isOnceLocationLatest: boolean): void;
/**
 * 设置是否返回地址信息，默认返回地址信息
 *
 * GPS 定位时也可以返回地址信息，但需要网络通畅，第一次有可能没有地址信息返回。
 *
 * @default true
 * @platform android
 */
export declare function setNeedAddress(isNeedAddress: boolean): void;
/**
 * 设置是否允许模拟位置
 *
 * @default true
 * @platform android
 */
export declare function setMockEnable(enable: boolean): void;
/**
 * 设置是否使用缓存策略
 *
 * @default true
 * @platform android
 */
export declare function setLocationCacheEnable(enable: boolean): void;
/**
 * 设置联网超时时间（毫秒）
 *
 * @default 30000
 * @platform android
 */
export declare function setHttpTimeout(timeout: number): void;
/**
 * 设置优先返回卫星定位信息时等待卫星定位结果的超时时间（毫秒）
 *
 * 只有在 `setGpsFirst(true)` 时才有效。
 *
 * @platform android
 */
export declare function setGpsFirstTimeout(timeout: number): void;
/**
 * 设置首次定位是否等待卫星定位结果
 *
 * 只有在单次定位高精度定位模式下有效，设置为 `true` 时，会等待卫星定位结果返回，
 * 最多等待 30 秒，若 30 秒后仍无卫星定位结果返回，返回网络定位结果。
 * 等待卫星定位结果返回的时间可以通过 [[setGpsFirstTimeout]] 进行设置。
 *
 * @default false
 * @platform android
 */
export declare function setGpsFirst(isGpsFirst: boolean): void;
/**
 * 设置定位模式
 *
 * @platform android
 */
export declare function setLocationMode(mode: LocationMode): void;
/**
 * 设置定位场景
 *
 * 根据场景快速修改 option，不支持动态改变，修改后需要调用 [[start]] 使其生效，当不需要场景时，可以设置为 `null`。
 *
 * 注意：不建议设置场景和自定义 option 混合使用。设置场景后，如果已经开始定位了，建议调用一次 [[stop]]，然后主动调用一次 [[start]]
 * 以保证 option 正确生效。当主动设置的 option 和场景中的 option 有冲突时，以后设置的为准，比如：签到场景中默认的为单次定位，
 * 当主动设置 option 为连续定位时，如果先设置的场景，后改变的 option，这时如果不调用 [[start]] 不会变为连续定位，
 * 如果调用了 [[start]] 则会变为连续定位，如果先改变 option，后设置场景为签到场景，则会变为单次定位。
 *
 * @platform android
 */
export declare function setLocationPurpose(purpose: LocationPurpose): void;
/**
 * 设置逆地理信息的语言，目前支持中文和英文
 *
 * @default GeoLanguage.DEFAULT
 */
export declare function setGeoLanguage(language: GeoLanguage): void;
/**
 * 设定定位的最小更新距离（米）
 *
 * 默认为 `kCLDistanceFilterNone`，表示只要检测到设备位置发生变化就会更新位置信息。
 *
 * @platform ios
 */
export declare function setDistanceFilter(distance: number): void;
/**
 * 设定期望的定位精度（米）
 *
 * 默认为 `kCLLocationAccuracyBest`。
 * 定位服务会尽可能去获取满足 `desiredAccuracy` 的定位结果，但不保证一定会得到满足期望的结果。
 *
 * 注意：设置为 `kCLLocationAccuracyBest` 或 `kCLLocationAccuracyBestForNavigation` 时，
 * 单次定位会在达到 `locationTimeout` 设定的时间后，将时间内获取到的最高精度的定位结果返回。
 *
 * @platform ios
 */
export declare function setDesiredAccuracy(desiredAccuracy: number): void;
/**
 * 指定定位是否会被系统自动暂停
 *
 * @default false
 * @platform ios
 */
export declare function setPausesLocationUpdatesAutomatically(isPause: boolean): void;
/**
 * 是否允许后台定位
 *
 * 只在iOS 9.0 及之后起作用。
 * 设置为YES的时候必须保证 `Background Modes` 中的 `Location updates` 处于选中状态，否则会抛出异常。
 * 由于iOS系统限制，需要在定位未开始之前或定位停止之后，修改该属性的值才会有效果。
 *
 * @default false
 * @platform ios
 */
export declare function setAllowsBackgroundLocationUpdates(isAllow: boolean): void;
/**
 * 指定单次定位超时时间（秒）
 *
 * 最小值是 2s。注意在单次定位请求前设置。
 *
 * 注意: 单次定位超时时间从确定了定位权限（非 `kCLAuthorizationStatusNotDetermined` 状态）后开始计算。
 *
 * @default 10
 * @platform ios
 */
export declare function setLocationTimeout(timeout: number): void;
/**
 * 指定单次定位逆地理超时时间（秒）
 *
 * 最小值是 2s。注意在单次定位请求前设置。
 *
 * @default 5
 * @platform ios
 */
export declare function setReGeocodeTimeout(timeout: number): void;
/**
 * 连续定位是否返回逆地理编码
 *
 * @default false
 * @platform ios
 */
export declare function setLocatingWithReGeocode(withReGeocode: boolean): void;
export * from "react-native-a-map-module/lib/geolocation/types";
export * from "react-native-a-map-module/lib/geolocation/geolocation";
export { default as Geolocation } from "react-native-a-map-module/lib/geolocation/geolocation";
