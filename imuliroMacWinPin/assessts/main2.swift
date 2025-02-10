// import Cocoa
// import ApplicationServices

// var pinnedWindowID: CGWindowID?
// var pinnedAppName: String?

// func pinFrontmostWindow() {
//     guard let frontmostApp = NSWorkspace.shared.frontmostApplication else {
//         print("No frontmost application found.")
//         return
//     }

//     let appName = frontmostApp.localizedName ?? "Unknown"
//     pinnedAppName = appName
//     print("Frontmost application: \(appName)")

//     // Get the frontmost window of the application
//     let options: CGWindowListOption = [.optionOnScreenOnly, .excludeDesktopElements]
//     let windowList = CGWindowListCopyWindowInfo(options, kCGNullWindowID) as NSArray? as? [[String: AnyObject]]

//     guard let windows = windowList else {
//         print("No windows found.")
//         return
//     }

//     for window in windows {
//         if let ownerName = window[kCGWindowOwnerName as String] as? String,
//            ownerName == appName,
//            let windowID = window[kCGWindowNumber as String] as? CGWindowID {
//             pinnedWindowID = windowID
//             print("Pinned window: \(windowID)")
//             return
//         }
//     }

//     print("No matching window found.")
// }

// func bringPinnedWindowToFront() {
//     guard let windowID = pinnedWindowID, let appName = pinnedAppName else {
//         print("No pinned window ID or application name found.")
//         return
//     }

//     let script = """
//     tell application "System Events"
//         tell process "\(appName)"
//             set frontmost to true
//             repeat with w in windows
//                 if (name of w) contains "\(windowID)" then
//                     perform action "AXRaise" of w
//                     exit repeat
//                 end if
//             end repeat
//         end tell
//     end tell
//     """

//     var error: NSDictionary?
//     if let scriptObject = NSAppleScript(source: script) {
//         scriptObject.executeAndReturnError(&error)
//         if let error = error {
//             print("Failed to bring window to front: \(error)")
//         }
//     }
// }

// pinFrontmostWindow()

// // Set up a timer to periodically bring the pinned window to the front
// Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
//     bringPinnedWindowToFront()
// }

// func listOpenWindows() {
//     let runningApps = NSWorkspace.shared.runningApplications
//     for app in runningApps {
//         guard let appName = app.localizedName else { continue }
//         let appElement = AXUIElementCreateApplication(app.processIdentifier)
//         var windowList: CFTypeRef?
//         let result = AXUIElementCopyAttributeValue(appElement, kAXWindowsAttribute as CFString, &windowList)
//         if result == .success, let windows = windowList as? [AXUIElement] {
//             for window in windows {
//                 var windowTitle: CFTypeRef?
//                 let titleResult = AXUIElementCopyAttributeValue(window, kAXTitleAttribute as CFString, &windowTitle)
//                 if titleResult == .success, let title = windowTitle as? String, !title.isEmpty {
//                     print("Owner: \(appName), Name: \(title)")
//                 }
//             }
//         }
//     }
// }

// // Set up a timer to periodically bring the pinned window to the front and list open windows
// Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
//     bringPinnedWindowToFront()
//     listOpenWindows() // Call the function to list open windows
// }

// RunLoop.main.run()








































