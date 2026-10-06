// The whole Android app: one WebView filling the screen, serving the
// bundled payload through WebViewAssetLoader.
//
// WHY ANDROID IS THE EASIER HALF. WebViewAssetLoader serves assets over a
// real https origin (https://appassets.androidplatform.net/), so ES
// modules load, fetch is same-origin, AND service workers register — which
// means sw.js works here exactly as it does on Pages, and the app's own
// offline caching comes along for free. iOS gets a custom scheme instead
// and loses the worker; see shells/ios/BundleSchemeHandler.swift.
//
// The handler is mounted at "/" rather than the usual "/assets/" so the
// payload's own layout is preserved: js/audio.js resolves clips with
// `new URL('../../IPA-Audio/', import.meta.url)`, which from /js/audio.js
// is /IPA-Audio/. Mounting under /assets/ would put the app at
// /assets/js/audio.js and send that lookup to /IPA-Audio/, outside the
// handler, where nothing answers.

package com.speechcraft.app

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.webkit.WebViewAssetLoader

private const val DOMAIN = "appassets.androidplatform.net"
private const val START_URL = "https://$DOMAIN/index.html"

class MainActivity : ComponentActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val loader = WebViewAssetLoader.Builder()
            .setDomain(DOMAIN)
            .addPathHandler("/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            // Progress, projects, notebooks and the offline cache all live
            // in browser storage. Without this the app loses everything on
            // every launch and says nothing about why.
            settings.domStorageEnabled = true
            settings.mediaPlaybackRequiresUserGesture = false
            settings.allowFileAccess = false
            settings.allowContentAccess = false

            webViewClient = object : WebViewClient() {
                override fun shouldInterceptRequest(
                    view: WebView, request: WebResourceRequest
                ): WebResourceResponse? = loader.shouldInterceptRequest(request.url)

                // The app makes no external requests. Its one outward link
                // is GitHub Issues on the Feedback page, and that belongs
                // in a browser, not inside what looks like the app.
                override fun shouldOverrideUrlLoading(
                    view: WebView, request: WebResourceRequest
                ): Boolean {
                    val url = request.url
                    if (url.host == DOMAIN) return false
                    startActivity(Intent(Intent.ACTION_VIEW, url))
                    return true
                }
            }
        }

        setContentView(webView)

        // THE SYSTEM BARS, which targetSdk 35 makes our problem (2026-10-06).
        // Android 15 draws an app edge-to-edge by default at this target, so
        // an unpadded WebView runs under the clock at the top and the gesture
        // bar at the bottom. iOS had the identical bug for the identical
        // reason, found by photographing the first build; this is the same
        // fault caught by reading instead.
        //
        // The web layer cannot fix it. css/style.css reads
        // env(safe-area-inset-bottom) for the nav, but env() only reports
        // real values with viewport-fit=cover in the viewport meta, and
        // index.html deliberately does not set it — that would change the
        // live site for every browser user to suit a shell that is not
        // shipped. So the shell insets itself, exactly as the iOS one does.
        //
        // Background matches --bg in css/style.css so the padded strip is the
        // app's own colour rather than a white band.
        webView.setBackgroundColor(0xFFEFECE1.toInt())
        ViewCompat.setOnApplyWindowInsetsListener(webView) { view, insets ->
            val bars = insets.getInsets(
                WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout()
            )
            view.setPadding(bars.left, bars.top, bars.right, bars.bottom)
            WindowInsetsCompat.CONSUMED
        }

        webView.loadUrl(START_URL)

        onBackPressedDispatcher.addCallback(this, backHandler)
    }

    // Hardware back. Routing in Speechcraft is function-based, not
    // URL-based: the back stack is a JavaScript array of thunks and
    // nothing is pushed to history, so WebView.canGoBack() is always false
    // and the system button would leave the app from any screen.
    //
    // The web layer exposes window.__shellBack() (js/ui.js), which closes
    // an open dialog, then the notebook dock, then pops one page — and
    // answers FALSE only when it is at the root with nothing left. That
    // false is the cue to leave, which is the honest thing: a back button
    // that appears to do nothing is worse than one that exits.
    //
    // evaluateJavascript is asynchronous and its result is JSON, so the
    // decision happens in the callback and the string is "true"/"false".
    // The guard covers the window before the page has booted, when the
    // hook does not exist yet and the result is "null".
    private val backHandler = object : OnBackPressedCallback(true) {
        override fun handleOnBackPressed() {
            webView.evaluateJavascript(
                "(function(){return !!(window.__shellBack && window.__shellBack());})()"
            ) { result ->
                if (result != "true") finish()
            }
        }
    }

    // Audio is paused with the app rather than left playing over whatever the
    // reader opened next. onPause/onResume on the WebView is the documented
    // way; the web layer's own teardown only fires on pagehide, which a
    // backgrounded Android app does not reach.
    override fun onPause() {
        webView.onPause()
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
    }

    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }
}
