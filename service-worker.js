self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("codenova-cache").then((cache) => {
      return cache.addAll([
        "index.html",
        "apropos.html",
        "services.html",
        "equipe.html",
        "contact.html",
        "logo_codenova.png",
        "logo_dropshipping.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
