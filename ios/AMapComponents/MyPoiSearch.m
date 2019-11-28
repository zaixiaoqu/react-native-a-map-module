//
//  MyPoiSearch.m
//  szlanlingtong
//
//  Created by juddy on 2019/7/9.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "MyPoiSearch.h"


@interface MyPoiSearch ()<AMapSearchDelegate>
@property (nonatomic, strong) AMapSearchAPI *searchAPI;
@property (nonatomic, strong) RCTResponseSenderBlock completion;
@end

// 成功标志符
static NSString * const successText = @"success";
// 失败标志符
static NSString * const failText = @"fail";

@implementation MyPoiSearch

- (id)init {
  self = [super init];
  if(self) {
    self.searchAPI = [[AMapSearchAPI alloc] init];
    self.searchAPI.delegate = self;
  }

  return self;
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(search:(NSString *)keyWord  city:(NSString *)city completion:(RCTResponseSenderBlock)completion)
{
  if (!completion) {
    return;
  }
  if (!keyWord) {
    completion(@[[self getResponseMsg:-11 msg:@"参数传递错误" data:nil]]);
    return;
  }
  if (!city) {
    city = @"";
  }
  // 去掉keyWord、city只有两边的隔空
  keyWord = [keyWord stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
  city = [city stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
  if ([keyWord length] < 1) {
    completion(@[[self getResponseMsg:-1 msg:@"请输入你需要查询的内容" data:nil]]);
    return;
  }
  self.completion = completion;

  [AMapServices sharedServices].apiKey = [NSBundle mainBundle].infoDictionary[@"AMapApiKey"];
  AMapInputTipsSearchRequest *tips = [[AMapInputTipsSearchRequest alloc] init];
  tips.keywords = keyWord;
  tips.city     = city;
  tips.cityLimit = YES; // 是否限制城市
  [self.searchAPI AMapInputTipsSearch:tips];
}

/* 输入提示回调. */
- (void)onInputTipsSearchDone:(AMapInputTipsSearchRequest *)request response:(AMapInputTipsSearchResponse *)response
{
  //解析response获取提示词
  if (response.count < 1) {
    self.completion(@[[self getResponseMsg:-2 msg:@"未查询到你检索的内容" data:nil]]);
    return;
  }
  NSArray<AMapTip *> *tips = response.tips;
  NSInteger tipsCount = tips.count;
  if (tipsCount < 1) {
    self.completion(@[[self getResponseMsg:-2 msg:@"未查询到你检索的内容" data:nil]]);
    return;
  }

  NSMutableArray *data = [NSMutableArray array];
  Boolean isEmptyResult = true;
  for (NSInteger i = 0; i < tipsCount; i++) {
    AMapTip *item = tips[i];

    NSString *poiID = item.uid;
    AMapGeoPoint *location = item.location;
    if (!poiID || !location || !location.latitude || !location.longitude) {
      continue;
    }
    isEmptyResult = false;

    // 创建词典对象，初始化长度为10
    NSMutableDictionary *dictionary = [NSMutableDictionary dictionaryWithCapacity:10];
    [dictionary setValue:item.adcode forKey:@"adCode"];
    [dictionary setValue:item.address forKey:@"address"];
    [dictionary setValue:item.district forKey:@"district"];
    [dictionary setValue:item.name forKey:@"name"];
    [dictionary setValue:poiID forKey:@"poiID"];
    [dictionary setValue:item.typecode forKey:@"typeCode"];
    [dictionary setObject:[NSString stringWithFormat:@"%g", location.latitude] forKey:@"latitude"];
    [dictionary setObject:[NSString stringWithFormat:@"%g", location.longitude] forKey:@"longitude"];

    [data addObject:dictionary];
  }
  if (true == isEmptyResult) {
    self.completion(@[[self getResponseMsg:-3 msg:@"未查询到可在地图上显示的位置" data:nil]]);
    return;
  }

  self.completion(@[[self getResponseMsg:1 msg:@"" data:data]]);
}
// 当检索失败时，会进入 didFailWithError 回调函数，通过该回调函数获取产生的失败的原因
- (void)AMapSearchRequest:(id)request didFailWithError:(NSError *)error
{
  self.completion(@[[self getResponseMsg:-2 msg: error.localizedDescription data:nil]]);
}

- (NSMutableDictionary *)getResponseMsg:(NSInteger)stateCode msg:(NSString *)msg data:(NSMutableArray *)data
{
  // 创建词典对象，初始化长度为10
  NSMutableDictionary *dictionary = [NSMutableDictionary dictionaryWithCapacity:10];
  // 向词典中动态添加数据
  [dictionary setValue:@(stateCode) forKey:@"code"];

  if (stateCode == 1) {
    [dictionary setValue:successText forKey:@"state"];
  } else {
    [dictionary setValue:failText forKey:@"state"];
  }
  [dictionary setValue:msg forKey:@"msg"];
  [dictionary setValue:data forKey:@"data"];

  return dictionary;
}

@end
