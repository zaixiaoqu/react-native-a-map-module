package com.zaixiaoqu.amap.search;

import com.amap.api.services.core.LatLonPoint;
import com.amap.api.services.help.InputtipsQuery;
import com.amap.api.services.help.Tip;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Arguments;
import com.amap.api.services.help.Inputtips;
import com.amap.api.services.help.Inputtips.InputtipsListener;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.List;

public class MyPoiSearch extends ReactContextBaseJavaModule implements InputtipsListener {

    private ReactContext reactContext;

    // 成功标志符
    private String successText = "success";
    // 失败标志符
    private String failText = "fail";

    /**
     * 回调
     */
    private Callback successCallback;

    public MyPoiSearch(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "MyPoiSearch";
    }

    @ReactMethod
    public void search(String keyWord, String city, final Callback successCallback){
        if (null == successCallback) {
            return;
        }
        if (null == keyWord) {
            successCallback.invoke(getResponseMsg(-11, "参数传递错误", null));
            return;
        }
        if (null == city) {
            city = "";
        }
        keyWord = keyWord.trim();
        city = city.trim();
        if (keyWord.length() < 1) {
            successCallback.invoke(getResponseMsg(-1, "请输入你需要查询的内容", null));
            return;
        }
        this.successCallback = successCallback;
        //第二个参数传入null或者“”代表在全国进行检索，否则按照传入的city进行检索
        InputtipsQuery inputQuery = new InputtipsQuery(keyWord, city);
        inputQuery.setCityLimit(true);//限制在当前城市

        Inputtips inputTips = new Inputtips(this.reactContext, inputQuery);
        inputTips.setInputtipsListener(this);
        inputTips.requestInputtipsAsyn();
    }

    @Override
    public void onGetInputtips(List<Tip> list, int i) {
        if (null == list || list.size() < 1) {
            successCallback.invoke(getResponseMsg(-2, "未查询到内容, 错误码: " + i, null));
            return;
        }

        int listSize = list.size();
        WritableArray result = Arguments.createArray();
        Boolean isEmptyResult = true;
        for (int j = 0; j < listSize; j++) {
            Tip item = list.get(j);

            String poiID = item.getPoiID();
            LatLonPoint point = item.getPoint();
            if (null == point || point.toString().length() < 1 ||
                    null == poiID || poiID.length() < 1) {
                continue;
            }
            isEmptyResult = false;

            WritableMap resultMap = Arguments.createMap();
            resultMap.putString("adCode", item.getAdcode());
            resultMap.putString("address", item.getAddress());
            resultMap.putString("district", item.getDistrict());
            resultMap.putString("name", item.getName());
            resultMap.putString("poiID", poiID);
            resultMap.putString("typeCode", item.getTypeCode());
            resultMap.putDouble("latitude", point.getLatitude());
            resultMap.putDouble("longitude", point.getLongitude());

            result.pushMap(resultMap);
        }

        if (true == isEmptyResult) {
            successCallback.invoke(getResponseMsg(-3, "未查询到可在地图上显示的位置", null));
            return;
        }
        successCallback.invoke(getResponseMsg(1, "", result));
        return;
    }

    /**
     * 返回响应给RN的信息
     *
     * @param stateCode
     * @param msg
     * @param data
     * @return
     */
    private WritableMap getResponseMsg(int stateCode, String msg, WritableArray data) {
        WritableMap result = Arguments.createMap();
        result.putInt("code", stateCode);
        if (stateCode == 1) {
            result.putString("state", successText);
        } else {
            result.putString("state", failText);
        }
        result.putString("msg", msg);
        result.putArray("data", data);
        return result;
    }
}
