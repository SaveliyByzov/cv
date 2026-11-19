/* =====================================================================
   Service worker: the site opens at once on the next visit and keeps
   working offline.
   - pages, scripts and styles: network first (so a new version shows up
     right away), the cached copy only if there is no network;
   - pictures, fonts: cached copy first, refreshed in the background.
   VERSION is stamped by tools/build-pages.ps1 on every build; a new
   version clears the old cache.
   ===================================================================== */
const VERSION = '202611191846';
const CACHE = 'sb-' + VERSION;

self.addEventListener('install', function(){ self.skipWaiting(); });

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys()
      .then(function(keys){ return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); })); })
      .then(function(){ return self.clients.claim(); })
  );
});

function isStatic(url){ return /\.(webp|png|jpg|jpeg|svg|woff2|ico)$/i.test(url.pathname); }

self.addEventListener('fetch', function(e){
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (/\.pdf$/i.test(url.pathname)) return;           // big downloads: leave to the browser
  if (req.headers.get('range')) return;

  if (isStatic(url)) {
    e.respondWith(
      caches.open(CACHE).then(function(cache){
        return cache.match(req).then(function(hit){
          const fresh = fetch(req).then(function(res){ if (res && res.ok) cache.put(req, res.clone()); return res; }).catch(function(){ return hit; });
          return hit || fresh;
        });
      })
    );
    return;
  }

  e.respondWith(
    fetch(req).then(function(res){
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(function(c){ c.put(req, copy); }); }
      return res;
    }).catch(function(){
      return caches.match(req).then(function(hit){ return hit || caches.match(new Request(new URL('./', self.location).href)); });
    })
  );
});
