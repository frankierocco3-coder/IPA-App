// Serves the bundled web payload to WKWebView over a custom scheme.
//
// WHY A SCHEME HANDLER AND NOT loadFileURL. Speechcraft is vanilla ES
// modules loaded straight by the browser. A module script fetched from
// file:// is blocked by CORS in WebKit, because a file:// page has an
// opaque origin and module loading is CORS-governed. So loading the
// bundle as files does not merely misbehave, it fails to boot — the same
// blank screen the Safari audit was about, arrived at from the other end.
// A custom scheme gives the page a real, non-opaque origin, so modules
// load and same-origin fetch works.
//
// WHAT THIS COSTS. A custom scheme is not http(s), so service workers do
// not register. That is fine here and was checked: the app registers
// sw.js inside a .catch() and only warns, so boot is unaffected, and a
// bundled app has nothing to cache anyway — every file is already local.
// It does mean any FUTURE narration download cannot reuse sw.js and needs
// its own storage.
//
// RANGE REQUESTS ARE NOT OPTIONAL. <audio> asks for every clip with a
// Range header, not only when seeking, and Safari will not play a 200
// handed back to a range request. The app's own service worker learned
// this in 2026-09 and says so in sw.js; the same rule applies here.

import Foundation
import WebKit
import UniformTypeIdentifiers

final class BundleSchemeHandler: NSObject, WKURLSchemeHandler {

    /// Payload root inside the app bundle (the directory build_shell_payload.py produced).
    private let root: URL
    /// Tasks WebKit has stopped. Replying to one of these crashes the app,
    /// and a slow range read is exactly when a stop arrives.
    private var stopped = Set<ObjectIdentifier>()
    private let lock = NSLock()

    init(root: URL) {
        self.root = root
        super.init()
    }

    private func isStopped(_ task: WKURLSchemeTask) -> Bool {
        lock.lock(); defer { lock.unlock() }
        return stopped.contains(ObjectIdentifier(task))
    }

    func webView(_ webView: WKWebView, start task: WKURLSchemeTask) {
        guard let url = task.request.url else {
            finish(task, status: 400, headers: [:], body: Data())
            return
        }

        // Resolve inside the payload, and never outside it. A path that
        // escapes the root is refused rather than clamped: silently
        // serving something else is worse than a 404.
        var path = url.path
        if path.isEmpty || path == "/" { path = "/index.html" }
        let candidate = root.appendingPathComponent(path).standardizedFileURL
        guard candidate.path.hasPrefix(root.standardizedFileURL.path) else {
            finish(task, status: 403, headers: [:], body: Data())
            return
        }

        guard let data = try? Data(contentsOf: candidate, options: .mappedIfSafe) else {
            finish(task, status: 404,
                   headers: ["Content-Type": "text/plain; charset=utf-8"],
                   body: Data("Not found".utf8))
            return
        }

        let mime = Self.mimeType(for: candidate.pathExtension)
        if let range = task.request.value(forHTTPHeaderField: "Range") {
            serveRange(task, data: data, mime: mime, header: range)
        } else {
            finish(task, status: 200, headers: [
                "Content-Type": mime,
                "Content-Length": String(data.count),
                "Accept-Ranges": "bytes",
            ], body: data)
        }
    }

    func webView(_ webView: WKWebView, stop task: WKURLSchemeTask) {
        lock.lock()
        stopped.insert(ObjectIdentifier(task))
        lock.unlock()
    }

    // MARK: - Responses

    private func serveRange(_ task: WKURLSchemeTask, data: Data, mime: String, header: String) {
        let size = data.count
        var start = 0
        var end = size - 1

        // "bytes=START-END", "bytes=START-", or "bytes=-SUFFIX".
        let spec = header.replacingOccurrences(of: "bytes=", with: "")
        let parts = spec.split(separator: "-", omittingEmptySubsequences: false)
        if parts.count == 2 {
            let lhs = String(parts[0]), rhs = String(parts[1])
            if lhs.isEmpty, let suffix = Int(rhs) {
                start = max(0, size - suffix)
            } else {
                start = Int(lhs) ?? 0
                if let e = Int(rhs) { end = min(e, size - 1) }
            }
        }

        guard start < size, start <= end else {
            finish(task, status: 416,
                   headers: ["Content-Range": "bytes */\(size)"], body: Data())
            return
        }

        let slice = data.subdata(in: start..<(end + 1))
        finish(task, status: 206, headers: [
            "Content-Type": mime,
            "Content-Length": String(slice.count),
            "Content-Range": "bytes \(start)-\(end)/\(size)",
            "Accept-Ranges": "bytes",
        ], body: slice)
    }

    private func finish(_ task: WKURLSchemeTask, status: Int,
                        headers: [String: String], body: Data) {
        if isStopped(task) { return }
        guard let url = task.request.url,
              let response = HTTPURLResponse(url: url, statusCode: status,
                                             httpVersion: "HTTP/1.1",
                                             headerFields: headers) else { return }
        task.didReceive(response)
        if isStopped(task) { return }
        task.didReceive(body)
        if isStopped(task) { return }
        task.didFinish()
    }

    // MARK: - MIME

    /// A wrong MIME on a .js file is a silent boot failure: WebKit refuses
    /// to evaluate a module served as anything but a JavaScript type. The
    /// map is explicit for that reason rather than trusting the system.
    static func mimeType(for ext: String) -> String {
        switch ext.lowercased() {
        case "html", "htm":  return "text/html; charset=utf-8"
        case "js", "mjs":    return "text/javascript; charset=utf-8"
        case "css":          return "text/css; charset=utf-8"
        case "json":         return "application/json; charset=utf-8"
        case "webmanifest":  return "application/manifest+json; charset=utf-8"
        case "svg":          return "image/svg+xml"
        case "png":          return "image/png"
        case "jpg", "jpeg":  return "image/jpeg"
        case "webp":         return "image/webp"
        case "mp3":          return "audio/mpeg"
        case "m4a":          return "audio/mp4"
        case "wav":          return "audio/wav"
        case "woff2":        return "font/woff2"
        case "woff":         return "font/woff"
        case "txt", "md":    return "text/plain; charset=utf-8"
        default:
            if let t = UTType(filenameExtension: ext)?.preferredMIMEType { return t }
            return "application/octet-stream"
        }
    }
}
