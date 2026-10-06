// The whole iOS app: one WKWebView filling the screen, serving the
// bundled payload. It is a window, deliberately. Everything Speechcraft
// does is already in the web layer, and anything added here would be a
// second place for behaviour to live.

import UIKit
import WebKit

/// The custom scheme the payload is served over. Must not be http/https
/// (WebKit reserves those) and must match the one registered below.
let kScheme = "speechcraft"
let kHost = "app"

final class ViewController: UIViewController, WKNavigationDelegate, WKUIDelegate {

    private var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        guard let root = Bundle.main.url(forResource: "www", withExtension: nil) else {
            showFailure("The web payload is missing from the app bundle.",
                        detail: "Add build/payload to the target as a FOLDER REFERENCE named www. "
                              + "A group (yellow folder) flattens the directory tree and the app "
                              + "cannot find js/main.js.")
            return
        }

        let config = WKWebViewConfiguration()
        config.setURLSchemeHandler(BundleSchemeHandler(root: root), forURLScheme: kScheme)
        // Audio must be able to start from the learner's tap without a
        // second gesture; the app only ever plays on an explicit action.
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []

        webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.allowsBackForwardNavigationGestures = false   // routing is in-app, not history
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.isOpaque = false
        // Matches --bg in css/style.css, so there is no white flash on launch.
        webView.backgroundColor = UIColor(red: 0.937, green: 0.925, blue: 0.882, alpha: 1)

        // Matches the webView, so the strip behind the status bar is the
        // app's own colour rather than a white band.
        view.backgroundColor = UIColor(red: 0.937, green: 0.925, blue: 0.882, alpha: 1)

        webView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(webView)
        NSLayoutConstraint.activate([
            // TOP IS INSET, the other three are not (2026-10-05, from the
            // first build on a real screen). css/style.css reads
            // env(safe-area-inset-BOTTOM) for the nav bar but never the top
            // one, because in a browser Safari's own chrome provides that
            // gap and the page never needs it. A full-screen WKWebView has
            // no chrome, so the page drew under the clock: the workspace
            // chip and the status bar occupied the same pixels.
            //
            // Fixed here rather than in the web layer. The page is right for
            // a browser, and adding viewport-fit=cover to index.html would
            // change the live site for every existing user to suit a shell
            // that is not shipped yet.
            webView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            webView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            webView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
        ])

        var comps = URLComponents()
        comps.scheme = kScheme
        comps.host = kHost
        comps.path = "/index.html"
        webView.load(URLRequest(url: comps.url!))
    }

    override var preferredStatusBarStyle: UIStatusBarStyle { .darkContent }

    // The app makes no external requests by design, and the only outward
    // link it offers is GitHub Issues on the Feedback page. Anything not
    // on our own scheme leaves for Safari rather than loading in here,
    // where it would look like part of the app.
    func webView(_ webView: WKWebView,
                 decidePolicyFor navigationAction: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = navigationAction.request.url else {
            decisionHandler(.cancel); return
        }
        if url.scheme == kScheme {
            decisionHandler(.allow)
        } else if url.scheme == "http" || url.scheme == "https" {
            UIApplication.shared.open(url)
            decisionHandler(.cancel)
        } else {
            decisionHandler(.cancel)
        }
    }

    // target="_blank" has no window to open into here; send it outward too.
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                 for navigationAction: WKNavigationAction,
                 windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = navigationAction.request.url, url.scheme != kScheme {
            UIApplication.shared.open(url)
        }
        return nil
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!,
                 withError error: Error) {
        showFailure("Speechcraft could not start.", detail: error.localizedDescription)
    }

    /// An honest failure beats a white screen. The Safari audit existed
    /// because a blank screen says nothing about what went wrong.
    private func showFailure(_ message: String, detail: String) {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = .center
        label.text = "\(message)\n\n\(detail)"
        label.font = .preferredFont(forTextStyle: .footnote)
        label.translatesAutoresizingMaskIntoConstraints = false
        view.backgroundColor = UIColor(red: 0.937, green: 0.925, blue: 0.882, alpha: 1)
        view.addSubview(label)
        NSLayoutConstraint.activate([
            label.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            label.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 24),
            label.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -24),
        ])
    }
}
