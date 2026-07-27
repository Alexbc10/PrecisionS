/* PrecisionScheduler service worker.

   Purpose: the dispatcher's iPad must open the board in a basement, a parkade, or a dead
   spot. The app is one self-contained HTML file, so caching the shell is enough to run
   fully offline — all state lives in localStorage, nothing is fetched at runtime.

   Bump CACHE when the app file changes, or iPads will keep serving the old one. */
var CACHE = "precisionscheduler-v1";
var SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", function (e) {
  /* addAll fails the whole install if any entry 404s; tolerate a missing optional file */
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(SHELL.map(function (u) {
        return c.add(u).catch(function () { return null; });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Network-first for the page itself so a redeploy is picked up as soon as there's signal,
   cache-first for icons. Either way an offline load still works. */
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var isDoc = req.mode === "navigate" || /\.html$/.test(new URL(req.url).pathname);
  if (isDoc) {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || caches.match("./index.html");
        });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      });
    }).catch(function () { return caches.match(req); })
  );
});
