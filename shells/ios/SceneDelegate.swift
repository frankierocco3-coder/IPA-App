// The window, created the way iOS has required since the scene lifecycle
// became mandatory.
//
// WHY THIS FILE EXISTS (2026-10-05, from the first real build). The shell
// originally built its UIWindow in AppDelegate, the pre-iOS-13 single
// window shape. Compiled against the iOS 27 SDK that does not merely warn:
// the app traps at launch inside
// __UIApplicationEvaluateRuntimeIssueForNoSceneLifecycleAdoption, before
// any Speechcraft code runs. It looked exactly like the blank screen the
// Safari audit was about, and was nothing to do with the web layer.
//
// Apple requires submissions to be built against a recent SDK, so there is
// no version of shipping this that avoids adopting scenes.
//
// Still a window and nothing more: it owns no product behaviour, and the
// ViewController it installs is unchanged.

import UIKit

final class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene,
               willConnectTo session: UISceneSession,
               options connectionOptions: UIScene.ConnectionOptions) {
        // A non-window scene is not something this app can present.
        guard let windowScene = scene as? UIWindowScene else { return }
        let w = UIWindow(windowScene: windowScene)
        w.rootViewController = ViewController()
        w.makeKeyAndVisible()
        window = w
    }
}
