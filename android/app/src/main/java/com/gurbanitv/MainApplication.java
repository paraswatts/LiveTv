package com.gurbanitv;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.droibit.android.reactnative.customtabs.CustomTabsPackage;
import cl.json.RNSharePackage;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;

import org.wonday.orientation.OrientationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
   //import package

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CustomTabsPackage(),
          new RNSharePackage(),
          new OrientationPackage(),
          new VectorIconsPackage(),
          new ReactVideoPackage(),
          new ReactNativeYouTube(),
          new RCTSplashScreenPackage()  

        );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  
}
