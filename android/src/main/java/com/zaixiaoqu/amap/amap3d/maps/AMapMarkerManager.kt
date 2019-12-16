package com.zaixiaoqu.amap.amap3d.maps

import android.view.View
import com.zaixiaoqu.amap.amap3d.toLatLng
import com.amap.api.maps.model.LatLng
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
internal class AMapMarkerManager : ViewGroupManager<AMapMarker>() {
    override fun getName(): String {
        return "AMapMarker"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AMapMarker {
        return AMapMarker(reactContext)
    }

    override fun addView(marker: AMapMarker, view: View, index: Int) {
        when (view) {
            is AMapInfoWindow -> marker.infoWindow = view
            else -> super.addView(marker, view, index)
        }
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any>? {
        return MapBuilder.of(
                "onPress", MapBuilder.of("registrationName", "onPress"),
                "onDragStart", MapBuilder.of("registrationName", "onDragStart"),
                "onDrag", MapBuilder.of("registrationName", "onDrag"),
                "onDragEnd", MapBuilder.of("registrationName", "onDragEnd"),
                "onInfoWindowPress", MapBuilder.of("registrationName", "onInfoWindowPress")
        )
    }

    companion object {
        val UPDATE = 1
        val ACTIVE = 2
        val LOCK_TO_SCREEN = 3
    }

    override fun getCommandsMap(): Map<String, Int> {
        return mapOf(
                "update" to UPDATE,
                "active" to ACTIVE,
                "lockToScreen" to LOCK_TO_SCREEN
        )
    }

    override fun receiveCommand(marker: AMapMarker, commandId: Int, args: ReadableArray?) {
        when (commandId) {
            UPDATE -> marker.updateIcon()
            ACTIVE -> marker.active = true
            LOCK_TO_SCREEN -> marker.lockToScreen(args)
        }
    }

    @ReactProp(name = "title")
    fun setTitle(marker: AMapMarker, title: String) {
        marker.title = title
    }

    @ReactProp(name = "description")
    fun setSnippet(marker: AMapMarker, description: String) {
        marker.snippet = description
    }

    @ReactProp(name = "coordinate")
    fun setCoordinate(view: AMapMarker, coordinate: ReadableMap) {
        view.position = coordinate.toLatLng()
    }

    @ReactProp(name = "flat")
    fun setFlat(marker: AMapMarker, flat: Boolean) {
        marker.flat = flat
    }

    @ReactProp(name = "opacity")
    override fun setOpacity(marker: AMapMarker, opacity: Float) {
        marker.opacity = opacity
    }

    @ReactProp(name = "draggable")
    fun setDraggable(marker: AMapMarker, draggable: Boolean) {
        marker.draggable = draggable
    }

    @ReactProp(name = "clickDisabled")
    fun setClickDisabled(marker: AMapMarker, disabled: Boolean) {
        marker.clickDisabled = disabled
    }

    @ReactProp(name = "infoWindowDisabled")
    fun setInfoWindowDisabled(marker: AMapMarker, disabled: Boolean) {
        marker.infoWindowDisabled = disabled
    }

    @ReactProp(name = "active")
    fun setSelected(marker: AMapMarker, active: Boolean) {
        marker.active = active
    }

    @ReactProp(name = "color")
    fun setIcon(marker: AMapMarker, icon: String) {
        marker.setIconColor(icon)
    }

    @ReactProp(name = "image")
    fun setImage(marker: AMapMarker, image: String) {
        marker.setImage(image)
    }

    @ReactProp(name = "zIndex")
    fun setZIndez(marker: AMapMarker, zIndex: Float) {
        marker.zIndex = zIndex
    }

    @ReactProp(name = "anchor")
    fun setAnchor(view: AMapMarker, coordinate: ReadableMap) {
        view.setAnchor(coordinate.getDouble("x"), coordinate.getDouble("y"))
    }
}
