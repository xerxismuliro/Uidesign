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



import Cocoa
import ApplicationServices

var pinnedWindowID: CGWindowID?
var pinnedAppName: String?
var initialWindows: [(appName: String, windowID: CGWindowID, windowTitle: String)] = []

func getOpenWindows() -> [(appName: String, windowID: CGWindowID, windowTitle: String)] {
    var openWindows: [(appName: String, windowID: CGWindowID, windowTitle: String)] = []
    let options: CGWindowListOption = [.optionOnScreenOnly, .excludeDesktopElements]
    let windowList = CGWindowListCopyWindowInfo(options, kCGNullWindowID) as NSArray? as? [[String: AnyObject]]

    guard let windows = windowList else {
        print("No windows found.")
        return openWindows
    }

    for window in windows {
        if let ownerName = window[kCGWindowOwnerName as String] as? String,
           let windowID = window[kCGWindowNumber as String] as? CGWindowID,
           let windowTitle = window[kCGWindowName as String] as? String {
            openWindows.append((appName: ownerName, windowID: windowID, windowTitle: windowTitle))
        }
    }

    return openWindows
}

func pinSelectedWindow(windowID: CGWindowID, appName: String) {
    pinnedWindowID = windowID
    pinnedAppName = appName
    print("Pinned window: \(windowID) of application: \(appName)")
}

func bringPinnedWindowToFront() {
    guard let windowID = pinnedWindowID, let appName = pinnedAppName else {
        print("No pinned window ID or application name found.")
        return
    }

    let script = """
    tell application "System Events"
        tell process "\(appName)"
            set frontmost to true
            repeat with w in windows
                if (name of w) contains "\(windowID)" then
                    perform action "AXRaise" of w
                    exit repeat
                end if
            end repeat
        end tell
    end tell
    """

    var error: NSDictionary?
    if let scriptObject = NSAppleScript(source: script) {
        scriptObject.executeAndReturnError(&error)
        if let error = error {
            print("Failed to bring window to front: \(error)")
        }
    }
}

func promptUserToSelectWindow() {
    initialWindows = getOpenWindows()
    guard !initialWindows.isEmpty else {
        print("No open windows to select from.")
        return
    }

    print("Select a window to pin:")
    for (index, window) in initialWindows.enumerated() {
        print("\(index + 1): \(window.appName) - \(window.windowTitle)")
    }

    if let input = readLine(), let selection = Int(input), selection > 0, selection <= initialWindows.count {
        let selectedWindow = initialWindows[selection - 1]
        pinSelectedWindow(windowID: selectedWindow.windowID, appName: selectedWindow.appName)
    } else {
        print("Invalid selection.")
    }
}

func checkForWindowChanges() {
    let currentWindows = getOpenWindows()
    let addedWindows = currentWindows.filter { !initialWindows.contains($0) }
    let removedWindows = initialWindows.filter { !currentWindows.contains($0) }

    if !addedWindows.isEmpty || !removedWindows.isEmpty {
        print("Window list has changed.")
        initialWindows = currentWindows
        promptUserToSelectWindow()
    }
}

promptUserToSelectWindow()

// Set up a timer to periodically bring the pinned window to the front and check for window changes
Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
    bringPinnedWindowToFront()
    checkForWindowChanges()
}

RunLoop.main.run()