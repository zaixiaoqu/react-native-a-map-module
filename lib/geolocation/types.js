"use strict";
exports.__esModule = true;
/**
 * 定位结果类型
 *
 * @platform android
 */
var LocationType;
(function (LocationType) {
    /**
     * 卫星定位结果
     *
     * 通过设备卫星定位模块返回的定位结果
     */
    LocationType[LocationType["GPS"] = 1] = "GPS";
    /**
     * 前次定位结果
     *
     * 网络定位请求低于1秒、或两次定位之间设备位置变化非常小时返回，设备位移通过传感器感知
     */
    LocationType[LocationType["SAME_REQ"] = 2] = "SAME_REQ";
    /**
     * @deprecated
     */
    LocationType[LocationType["FAST"] = 3] = "FAST";
    /**
     * 缓存定位结果
     *
     * 返回一段时间前设备在相同的环境中缓存下来的网络定位结果，节省无必要的设备定位消耗
     */
    LocationType[LocationType["FIX_CACHE"] = 4] = "FIX_CACHE";
    /**
     * Wifi定位结果
     *
     * 属于网络定位，定位精度相对基站定位会更好
     */
    LocationType[LocationType["WIFI"] = 5] = "WIFI";
    /**
     * 基站定位结果
     *
     * 属于网络定位
     */
    LocationType[LocationType["CELL"] = 6] = "CELL";
    LocationType[LocationType["AMAP"] = 7] = "AMAP";
    /**
     * 离线定位结果
     */
    LocationType[LocationType["OFFLINE"] = 8] = "OFFLINE";
    /**
     * 最后位置缓存
     */
    LocationType[LocationType["LAST_LOCATION_CACHE"] = 9] = "LAST_LOCATION_CACHE";
})(LocationType = exports.LocationType || (exports.LocationType = {}));
/**
 * iOS 错误代码
 *
 * @platform ios
 */
var ErrorCodeIOS;
(function (ErrorCodeIOS) {
})(ErrorCodeIOS = exports.ErrorCodeIOS || (exports.ErrorCodeIOS = {}));
/**
 * Android 错误代码
 *
 * @platform android
 */
var ErrorCodeAndroid;
(function (ErrorCodeAndroid) {
    /**
     * 定位成功
     */
    ErrorCodeAndroid[ErrorCodeAndroid["LOCATION_SUCCESS"] = 0] = "LOCATION_SUCCESS";
    /**
     * 一些重要参数为空，可以通过 [[Location.locationDetail]] 获取详细信息
     */
    ErrorCodeAndroid[ErrorCodeAndroid["INVALID_PARAMETER"] = 1] = "INVALID_PARAMETER";
    /**
     * 定位失败，由于设备仅扫描到单个 wifi，不能精准的计算出位置信息
     */
    ErrorCodeAndroid[ErrorCodeAndroid["FAILURE_WIFI_INFO"] = 2] = "FAILURE_WIFI_INFO";
    /**
     * 获取到的请求参数为空，可能获取过程中出现异常，可以通过 [[Location.locationDetail]] 获取详细信息
     */
    ErrorCodeAndroid[ErrorCodeAndroid["FAILURE_LOCATION_PARAMETER"] = 3] = "FAILURE_LOCATION_PARAMETER";
    /**
     * 网络连接异常，可以通过 [[Location.locationDetail]] 获取详细信息
     */
    ErrorCodeAndroid[ErrorCodeAndroid["FAILURE_CONNECTION"] = 4] = "FAILURE_CONNECTION";
    /**
     * 解析 XML 出错，可以通过 [[Location.locationDetail]] 获取详细信息
     */
    ErrorCodeAndroid[ErrorCodeAndroid["FAILURE_PARSER"] = 5] = "FAILURE_PARSER";
    /**
     * 定位结果错误，可以通过 [[Location.locationDetail]] 获取详细信息
     */
    ErrorCodeAndroid[ErrorCodeAndroid["FAILURE_LOCATION"] = 6] = "FAILURE_LOCATION";
    /**
     * Key 错误，可以通过 [[Location.locationDetail]] 获取详细信息来跟注册的 Key 信息进行对照
     */
    ErrorCodeAndroid[ErrorCodeAndroid["FAILURE_AUTH"] = 7] = "FAILURE_AUTH";
    /**
     * 其他错误，可以通过 [[Location.locationDetail]] 获取详细信息
     */
    ErrorCodeAndroid[ErrorCodeAndroid["UNKNOWN"] = 8] = "UNKNOWN";
    /**
     * 初始化异常，可以通过 [[Location.locationDetail]] 获取详细信息
     */
    ErrorCodeAndroid[ErrorCodeAndroid["FAILURE_INIT"] = 9] = "FAILURE_INIT";
    /**
     * 定位服务启动失败，请检查是否配置 service 并且 manifest 中 service 标签是否配置在 application 标签内
     */
    ErrorCodeAndroid[ErrorCodeAndroid["SERVICE_FAIL"] = 10] = "SERVICE_FAIL";
    /**
     * 错误的基站信息，请检查是否安装 sim 卡
     */
    ErrorCodeAndroid[ErrorCodeAndroid["FAILURE_CELL"] = 11] = "FAILURE_CELL";
    /**
     * 缺少定位权限，请检查是否配置定位权限，并在安全软件和设置中给应用打开定位权限
     */
    ErrorCodeAndroid[ErrorCodeAndroid["FAILURE_LOCATION_PERMISSION"] = 12] = "FAILURE_LOCATION_PERMISSION";
    /**
     * 网络定位失败，请检查设备是否插入 sim 卡、开启移动网络或开启了 wifi 模块
     */
    ErrorCodeAndroid[ErrorCodeAndroid["FAILURE_NOWIFIANDAP"] = 13] = "FAILURE_NOWIFIANDAP";
    /**
     * 卫星定位失败，可用卫星数不足
     */
    ErrorCodeAndroid[ErrorCodeAndroid["FAILURE_NOENOUGHSATELLITES"] = 14] = "FAILURE_NOENOUGHSATELLITES";
    /**
     * 定位位置可能被模拟
     */
    ErrorCodeAndroid[ErrorCodeAndroid["FAILURE_SIMULATION_LOCATION"] = 15] = "FAILURE_SIMULATION_LOCATION";
    /**
     * 定位失败，飞行模式下关闭了 wifi 开关，请关闭飞行模式或者打开 wifi 开关
     */
    ErrorCodeAndroid[ErrorCodeAndroid["AIRPLANEMODE_WIFIOFF"] = 18] = "AIRPLANEMODE_WIFIOFF";
    /**
     * 定位失败，没有检查到 sim 卡，并且关闭了 wifi 开关，请打开 wifi 开关或者插入 sim 卡
     */
    ErrorCodeAndroid[ErrorCodeAndroid["NOCGI_WIFIOFF"] = 19] = "NOCGI_WIFIOFF";
})(ErrorCodeAndroid = exports.ErrorCodeAndroid || (exports.ErrorCodeAndroid = {}));
/**
 * 定位模式，目前支持三种定位模式
 *
 * @platform android
 */
var LocationMode;
(function (LocationMode) {
    /**
     * 低功耗模式，在这种模式下，将只使用高德网络定位。
     */
    LocationMode["Battery_Saving"] = "Battery_Saving";
    /**
     * 仅设备模式，只使用卫星定位，不支持室内环境的定位
     */
    LocationMode["Device_Sensors"] = "Device_Sensors";
    /**
     * 高精度模式，在这种定位模式下，将同时使用高德网络定位和卫星定位，优先返回精度高的定位
     */
    LocationMode["Hight_Accuracy"] = "Hight_Accuracy";
})(LocationMode = exports.LocationMode || (exports.LocationMode = {}));
/**
 * 定位场景
 *
 * @platform android
 */
var LocationPurpose;
(function (LocationPurpose) {
    /**
     * 签到场景
     *
     * 只进行一次定位返回最接近真实位置的定位结果（定位速度可能会延迟 1-3s）。
     */
    LocationPurpose["SignIn"] = "SignIn";
    /**
     * 运动场景
     *
     * 高精度连续定位，适用于有户内外切换的场景，卫星定位和网络定位相互切换，卫星定位成功之后网络定位不再返回，卫星信号断开之后一段时间才会返回网络结果。
     */
    LocationPurpose["Sport"] = "Sport";
    /**
     * 出行场景
     *
     * 高精度连续定位，适用于有户内外切换的场景，卫星定位和网络定位相互切换，卫星定位成功之后网络定位不再返回，卫星信号断开之后一段时间才会返回网络结果。
     */
    LocationPurpose["Transport"] = "Transport";
})(LocationPurpose = exports.LocationPurpose || (exports.LocationPurpose = {}));
/**
 * 逆地理编码语言
 */
var GeoLanguage;
(function (GeoLanguage) {
    /**
     * 默认，根据位置按照相应的语言返回逆地理信息，在国外按英语返回，在国内按中文返回
     */
    GeoLanguage["DEFAULT"] = "DEFAULT";
    /**
     * 中文，无论在国外还是国内都为返回中文的逆地理信息
     */
    GeoLanguage["ZH"] = "ZH";
    /**
     * 英文，无论在国外还是国内都为返回英文的逆地理信息
     */
    GeoLanguage["EN"] = "EN";
})(GeoLanguage = exports.GeoLanguage || (exports.GeoLanguage = {}));
/**
 * 卫星信号强度
 *
 * @platform android
 */
var GpsAccuracy;
(function (GpsAccuracy) {
    GpsAccuracy[GpsAccuracy["UNKNOWN"] = 0] = "UNKNOWN";
    GpsAccuracy[GpsAccuracy["BAD"] = 1] = "BAD";
    GpsAccuracy[GpsAccuracy["GOOD"] = 2] = "GOOD";
})(GpsAccuracy = exports.GpsAccuracy || (exports.GpsAccuracy = {}));
/**
 * 定位结果的可信度
 */
var TrustedLevel;
(function (TrustedLevel) {
    TrustedLevel[TrustedLevel["HIGH"] = 1] = "HIGH";
    TrustedLevel[TrustedLevel["NORMAL"] = 2] = "NORMAL";
    TrustedLevel[TrustedLevel["LOW"] = 3] = "LOW";
    TrustedLevel[TrustedLevel["BAD"] = 4] = "BAD";
})(TrustedLevel = exports.TrustedLevel || (exports.TrustedLevel = {}));
