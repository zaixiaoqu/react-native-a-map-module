package com.zaixiaoqu.amap.amap3d.maps

import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager

class AMapInfoWindowManager : ViewGroupManager<AMapInfoWindow>() {
    override fun getName(): String {
        return "AMapInfoWindow"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AMapInfoWindow {
        return AMapInfoWindow(reactContext)
    }
}
