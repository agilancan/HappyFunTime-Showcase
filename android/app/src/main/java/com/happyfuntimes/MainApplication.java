package com.doohickey.happyfuntimes;

import android.app.Application;
import androidx.multidex.MultiDex;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.ReactApplication;
import com.gigasz.rnsketchcanvas.SketchCanvasPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import com.oblador.vectoricons.VectorIconsPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // Firebase Auth
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage; // Firebase Remote Config
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // Firebase Cloud Messaging
import io.invertase.firebase.perf.RNFirebasePerformancePackage; // Firebase Performance
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // Firebase Storage
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;

import com.facebook.reactnative.androidsdk.FBSDKPackage;
import androidx.annotation.Nullable;

import java.util.ArrayList;
import java.util.List;

public class MainApplication extends NavigationApplication implements ReactApplication {
    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

    @Override
    protected ReactNativeHost createReactNativeHost() {
        return new NavigationReactNativeHost(this) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        // FacebookSdk.sdkInitialize(getApplicationContext());
        // If you want to use AppEventsLogger to log events.
        // AppEventsLogger.activateApp(this);
        registerExternalComponent("RNNCustomComponent", new FragmentCreator());
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        List<ReactPackage> packages = new ArrayList<>();
        packages.add(new SketchCanvasPackage());
        packages.add(new RNCViewPagerPackage());
        packages.add(new AsyncStoragePackage());
        packages.add(new FBSDKPackage());
        packages.add(new RNGoogleSigninPackage());
        packages.add(new RNFirebasePackage());
        packages.add(new RNFirebaseCrashlyticsPackage());
        packages.add(new RNFirebaseAnalyticsPackage());
        packages.add(new RNFirebaseAuthPackage());
        packages.add(new RNFirebaseRemoteConfigPackage());
        packages.add(new RNFirebaseDatabasePackage());
        packages.add(new RNFirebaseMessagingPackage());
        packages.add(new RNFirebaseNotificationsPackage());
        packages.add(new RNFirebasePerformancePackage());
        packages.add(new RNFirebaseStoragePackage());
        packages.add(new RNFirebaseFirestorePackage());
        packages.add(new VectorIconsPackage());
        return packages;
    }
}
