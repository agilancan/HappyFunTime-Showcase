/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>

#import "AppDelegate.h"
#import <ReactNativeNavigation/RNNCustomViewController.h>
#import <React/RCTRootView.h>

@implementation AppDelegate
  
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
  
  [ReactNativeNavigation registerExternalComponent:@"RNNCustomComponent" callback:^UIViewController *(NSDictionary *props, RCTBridge *bridge) {
    return [[RNNCustomViewController alloc] initWithProps:props];
  }];
  
  return YES;
}

@end
