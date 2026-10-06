// Single-window app, no storyboard. Kept here rather than in a .xib so
// the whole shell is readable as source.
//
// The window itself is built in SceneDelegate, not here. This delegate
// used to create it directly, which is the pre-iOS-13 shape; against the
// iOS 27 SDK that traps at launch rather than warning. See the note at the
// top of SceneDelegate.swift — it is the one correction the first real
// build demanded.

import AVFoundation
import UIKit

@main
final class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions:
                        [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
        configureAudioSession()
        return true
    }

    /// THE RING SWITCH, AND WHY THIS IS A DECISION RATHER THAN A FIX.
    ///
    /// Device test 3.1 asks whether flipping the phone to silent kills the
    /// audio. Left alone the answer is yes: AVAudioSession defaults to
    /// `.soloAmbient`, which obeys the ring switch, so a silenced phone gives
    /// a silent app. Speechcraft is strict about audio by design — a missing
    /// clip is silence, never a substitute voice and never a message — so a
    /// learner with that switch flipped would get an app that appears to have
    /// no audio at all and says nothing about why.
    ///
    /// `.playback` overrides the switch, which is what a tool whose whole
    /// subject is listening should almost certainly do: the learner tapped
    /// "Hear the sound" and meant it.
    ///
    /// THE COST, STATED PLAINLY: `.playback` without `.mixWithOthers` also
    /// stops whatever else was playing. Someone studying over music loses the
    /// music. The alternative is to add `.mixWithOthers`, which keeps their
    /// music and ducks nothing — worse for close listening, which is the
    /// entire exercise.
    ///
    /// This is the owner's call and it is one line either way. It is NOT a
    /// background-audio request, so no UIBackgroundModes entitlement is
    /// needed and Apple review has nothing extra to assess.
    private func configureAudioSession() {
        let session = AVAudioSession.sharedInstance()
        do {
            try session.setCategory(.playback, mode: .default)
            try session.setActive(true)
        } catch {
            // Never fatal. A session that will not configure means the app
            // behaves exactly as it did before this existed — obeying the
            // ring switch — rather than failing to start.
            print("Speechcraft: audio session not configured (\(error)). "
                  + "Playback will follow the ring switch.")
        }
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
