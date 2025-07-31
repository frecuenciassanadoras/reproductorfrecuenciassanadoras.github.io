const CACHE_NAME = 'frecuencias-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/service-worker.js',
    // Tus archivos CSS/JS/Imágenes específicos
    'https://cdn.tailwindcss.com', // Tailwind CSS CDN
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap', // Fuentes de Google Fonts
    // Si 'imagen_carrusel_4k (50).png' está en la raíz de tu repositorio, usa esta ruta relativa:
    '/imagen_carrusel_4k%20(50).png', // Tu imagen decorativa
    'https://res.cloudinary.com/df3hfnqhm/image/upload/v1752532743/Dise%C3%B1o_sin_t%C3%ADtulo_-_2025-07-14T170654.732_mhr13k.png', // Tu imagen de fondo
    // Iconos de la PWA (asegúrate de que existan en la carpeta 'icons')
    'icons/icon-72x72.png',
    'icons/icon-96x96.png',
    'icons/icon-128x128.png',
    'icons/icon-144x144.png',
    'icons/icon-152x152.png',
    'icons/icon-192x192.png',
    'icons/icon-384x384.png',
    'icons/icon-512x512.png'
    // IMPORTANTE: Los audios de Cloudinary NO se cachean directamente aquí.
    // Son archivos grandes y se cargarán desde la red, lo cual es lo más eficiente.
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
