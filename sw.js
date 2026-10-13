/* Service worker da Calculadora de Strogonoff.
   Deixa o site abrir sem internet e instalável como aplicativo.
   - Páginas (navegação): rede primeiro; se falhar, a cópia em cache.
   - Arquivos do próprio site (ícones, manifesto): cache primeiro, atualizando por trás.
   - Terceiros (Google, fontes): passam direto, sem cache.
   Ao mudar algo que precise invalidar o cache antigo, troque VERSAO. */
const VERSAO = 'v1';
const CACHE = 'strogonoff-' + VERSAO;
const PAGINAS = ['/', '/privacidade.html'];
const ARQUIVOS = ['/site.webmanifest', '/favicon.svg', '/favicon.ico', '/favicon-48.png', '/favicon-192.png', '/favicon-512.png', '/apple-touch-icon.png', '/og-image.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PAGINAS.concat(ARQUIVOS))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(chaves => Promise.all(chaves.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Páginas são guardadas sem a query string (?pessoas=30), para uma única cópia servir a todos os links
function chavePagina(url) {
  return url.pathname === '/index.html' ? '/' : url.pathname;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    const chave = chavePagina(url);
    e.respondWith(
      fetch(req).then(resp => {
        if (resp.ok) { const copia = resp.clone(); caches.open(CACHE).then(c => c.put(chave, copia)); }
        return resp;
      }).catch(() => caches.match(chave).then(hit => hit || caches.match('/')))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(hit => {
      const rede = fetch(req).then(resp => {
        if (resp.ok) { const copia = resp.clone(); caches.open(CACHE).then(c => c.put(req, copia)); }
        return resp;
      }).catch(() => hit);
      return hit || rede;
    })
  );
});
