package com.doohickey.happyfuntimes;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.terrylinla.rnsketchcanvas.SketchCanvasPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // Firebase Storage
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication implements ReactApplication {
    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

  @Override
  public void onCreate() {
    super.onCreate();
  }

  protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new SketchCanvasPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseStoragePackage(),
            new RNFirebaseFirestorePackage()
                /*new SvgPackage(),
                new MainReactPackage(),
            new SketchCanvasPackage(),
                new LinearGradientPackage(),
                new RNCardViewPackage(),
                new MapsPackage(),
                new RNGeocoderPackage(),
                new FastImageViewPackage(),
                new StripeReactPackage(),
                new FBSDKPackage(mCallbackManager),
                new RNGoogleSigninPackage(),
                
                new VectorIconsPackage(),
                new RNCameraPackage()*/
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
