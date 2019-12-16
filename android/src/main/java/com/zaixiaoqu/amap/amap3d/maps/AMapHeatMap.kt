package com.zaixiaoqu.amap.amap3d.maps

import android.content.Context
import com.zaixiaoqu.amap.amap3d.toLatLngList
import com.amap.api.maps.AMap
import com.amap.api.maps.model.HeatmapTileProvider
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.TileOverlay
import com.amap.api.maps.model.TileOverlayOptions
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup

class AMapHeatMap(context: Context) : ReactViewGroup(context), AMapOverlay {
    private var overlay: TileOverlay? = null
    private var coordinates: ArrayList<LatLng> = ArrayList()

    var opacity: Double = 0.6
    var radius: Int = 12

    fun setCoordinates(coordinates: ReadableArray) {
        this.coordinates = coordinates.toLatLngList()
    }

    override fun add(map: AMap) {
        overlay = map.addTileOverlay(TileOverlayOptions().tileProvider(
                HeatmapTileProvider.Builder()
                        .data(coordinates)
                        .radius(radius)
                        .transparency(opacity)
                        .build()))
    }

    override fun remove() {
        overlay?.remove()
    }
}
