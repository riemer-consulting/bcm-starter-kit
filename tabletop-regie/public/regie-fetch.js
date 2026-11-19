// Schreibende Anfragen an die eigene API tragen den Header "X-Regie". Der Server
// lehnt schreibende Aufrufe ohne ihn ab. Fremde Webseiten können ihn nicht ohne
// Rückfrage des Browsers setzen – das verhindert Fremdauslösung (CSRF).
(function () {
  const original = window.fetch.bind(window);
  window.fetch = function (input, init) {
    init = init || {};
    const method = (init.method || 'GET').toUpperCase();
    const url = typeof input === 'string' ? input : (input && input.url) || '';
    const eigen = url.startsWith('/') || url.startsWith(location.origin);
    if (eigen && method !== 'GET' && method !== 'HEAD') {
      const h = new Headers(init.headers || {});
      h.set('X-Regie', '1');
      init = Object.assign({}, init, { headers: h });
    }
    return original(input, init);
  };
})();
