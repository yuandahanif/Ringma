const appChace = 'Ringma-PWA-v01.1.2'
let urlToCache = [
    '/',
    './index.html',
    './manifest.json',
    './assets/css/style.css',
    './assets/images/jonathan-j-castellon-c-73a3gO5d8-unsplash.jpg',
    './assets/images/user/griffonbase.gfl___B4X25y0BcQS___.jpg',
    './assets/images/icons/icon-512x512.png',
    './assets/images/icons/icon-72x72.png',
    './assets/images/icons/icon-96x96.png',
    './assets/images/icons/icon-384x384.png',
    './assets/images/icons/icon-192x192.png',
    './assets/images/icons/icon-152x152.png',
    './assets/images/icons/icon-144x144.png',
    './assets/images/icons/icon-128x128.png',
    './assets/js/script.js',
    './assets/js/init.js',
    './assets/shell/materi-android.html',
    './assets/shell/materi-desktop.html',
    './assets/css/materialize.css',
    './assets/js/materialize.js',
    './page/home.html',
    './page/sumber.html',
    './page/tentang.html',
    './page/materi/materi.html',
    './page/materi/php.html',
    './page/materi/mvc.html',
    './page/materi/html_dan_css.html',
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(appChace).then( cache => {
            return cache.addAll(urlToCache)
        })
    )
})

self.addEventListener('fetch' , e => {
    e.respondWith(
        caches.match(e.request,{cacheName : appChace}).then( res => {
            if (res) {
                console.log('serviceWorker: menggunakan aset dari cache: ',res.url);
                return res
            }

            console.log('serviceWorker: Memuat aset dari server: ',e.request.url);
            return fetch(e.request)
        })
    )
})

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all( 
                cacheNames.map( cacheName => {
                    if (cacheName != appChace) {
                        console.log(`sarviceWorker: cache ${cacheName} dihapus`);
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})