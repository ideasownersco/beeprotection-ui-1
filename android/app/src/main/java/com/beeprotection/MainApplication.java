package com.beeprotection;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.horcrux.svg.SvgPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;
import com.airbnb.android.react.maps.MapsPackage;
import com.transistorsoft.rnbackgroundgeolocation.*;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new RNBackgroundGeolocation(),
          new RNBackgroundFetchPackage(),
          new MainReactPackage(),
            new PickerPackage(),
          new SvgPackage(),
          new RNDeviceInfo(),
          new RNI18nPackage(),
          new CodePush("7BqJ5-d4-mQTn7Fi6NmlBPohfKI1687af85f-1654-43d6-b735-3ff7e4bf4cd7", getApplicationContext(), BuildConfig.DEBUG),
          new VectorIconsPackage(),
          new ReactNativePushNotificationPackage(),
          new MapsPackage()
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
