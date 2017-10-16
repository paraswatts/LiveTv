package com.gurbanitv;

import com.facebook.react.ReactActivity;
import com.reactnativecomponent.splashscreen.RCTSplashScreen;    //import RCTSplashScreen
import android.os.Bundle;
import android.content.res.Configuration; // <--- import
    import android.content.Intent; // <--- import

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "GurbaniTv";
    }

     @Override
      public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

    @Override
protected void onCreate(Bundle savedInstanceState) {
    RCTSplashScreen.openSplashScreen(this);   //open splashscreen
    //RCTSplashScreen.openSplashScreen(this, true, ImageView.ScaleType.FIT_XY);   //open splashscreen fullscreen
    super.onCreate(savedInstanceState);
}
}
