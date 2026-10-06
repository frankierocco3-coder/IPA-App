// Single-window app, no storyboard. Kept here rather than in a .xib so
// the whole shell is readable as source.
//
// The window itself is built in SceneDelegate, not here. This delegate
// used to create it directly, which is the pre-iOS-13 shape; against the
// iOS 27 SDK that traps at launch rather than warning. See the note at the
// top of SceneDelegate.swift — it is the one correction the first real
// build demanded.

import UIKit

@main
final class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions:
                        [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
        return true
    }

    // One configuration, named to match UIApplicationSceneManifest in
    // Info.plist. The names must agree or no scene is created and the
    // screen stays empty.
    func application(_ application: UIApplication,
                     configurationForConnecting connectingSceneSession: UISceneSession,
                     options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        UISceneConfiguration(name: "Default Configuration",
                             sessionRole: connectingSceneSession.role)
    }
}
