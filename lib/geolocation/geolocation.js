"use strict";
exports.__esModule = true;
var _1 = require("react-native-a-map-module/lib/geolocation");
/**
 * 定位错误信息
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/PositionError
 */
var PositionError = /** @class */ (function () {
    function PositionError(code, message, location) {
        this.code = code;
        this.message = message;
        this.location = location;
    }
    return PositionError;
}());
exports.PositionError = PositionError;
var watchId = 0;
var watchMap = {};
/**
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation
 */
var Geolocation = /** @class */ (function () {
    function Geolocation() {
    }
    /**
     * 获取当前位置信息
     *
     * 注意：使用该方法会停止持续定位
     *
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition
     */
    Geolocation.getCurrentPosition = function (success, error, options) {
        var listener = _1.addLocationListener(function (location) {
            if (location.errorCode) {
                error && error(new PositionError(location.errorCode, location.errorInfo, location));
            }
            else {
                success(toPosition(location));
            }
            _1.stop();
            listener.remove();
        });
        _1.start();
    };
    /**
     * 注册监听器进行持续定位
     *
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition
     */
    Geolocation.watchPosition = function (success, error, options) {
        watchMap[++watchId] = _1.addLocationListener(function (location) {
            if (location.errorCode) {
                error && error(new PositionError(location.errorCode, location.errorInfo, location));
            }
            else {
                success(toPosition(location));
            }
        });
        _1.start();
        return watchId;
    };
    /**
     * 移除位置监听
     *
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/clearWatch
     */
    Geolocation.clearWatch = function (id) {
        var listener = watchMap[id];
        if (listener) {
            listener.remove();
        }
    };
    return Geolocation;
}());
exports["default"] = Geolocation;
function toPosition(location) {
    return {
        location: location,
        coords: {
            latitude: location.latitude,
            longitude: location.longitude,
            altitude: location.altitude,
            accuracy: location.accuracy,
            altitudeAccuracy: null,
            heading: location.heading,
            speed: location.speed
        },
        timestamp: location.timestamp
    };
}
