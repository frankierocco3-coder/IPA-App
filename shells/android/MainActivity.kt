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
import android.net.Uri
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
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
        webView.loadUrl(START_URL)
    }

    // Routing in Speechcraft is function-based, not URL-based: the back
    // stack is a JavaScript array of thunks and nothing is pushed to
    // history. So there is nothing for the hardware back button to pop,
    // and the honest behaviour is to leave the app rather than to appear
    // to navigate. Giving it the in-app Back needs a hook the web layer
    // does not currently expose — see shells/README.md, "The back button".
    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }

    private fun openExternally(uri: Uri) {
        startActivity(Intent(Intent.ACTION_VIEW, uri))
    }
}
