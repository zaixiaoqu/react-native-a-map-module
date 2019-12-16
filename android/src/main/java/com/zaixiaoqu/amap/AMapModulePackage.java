package com.zaixiaoqu.amap;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;
import com.zaixiaoqu.amap.amap3d.AMapOfflineModule;
import com.zaixiaoqu.amap.amap3d.maps.AMapCircleManager;
import com.zaixiaoqu.amap.amap3d.maps.AMapHeatMapManager;
import com.zaixiaoqu.amap.amap3d.maps.AMapInfoWindowManager;
import com.zaixiaoqu.amap.amap3d.maps.AMapMarkerManager;
import com.zaixiaoqu.amap.amap3d.maps.AMapMultiPointManager;
import com.zaixiaoqu.amap.amap3d.maps.AMapPolygonManager;
import com.zaixiaoqu.amap.amap3d.maps.AMapPolylineManager;
import com.zaixiaoqu.amap.amap3d.maps.AMapViewManager;
import com.zaixiaoqu.amap.search.MyPoiSearch;

public class AMapModulePackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(
                new AMapModuleModule(reactContext),
                new MyPoiSearch(reactContext),
                new AMapOfflineModule(reactContext)
        );
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new AMapViewManager(),
                new AMapMarkerManager(),
                new AMapInfoWindowManager(),
                new AMapPolylineManager(),
                new AMapPolygonManager(),
                new AMapCircleManager(),
                new AMapHeatMapManager(),
                new AMapMultiPointManager()
        );
    }
}
