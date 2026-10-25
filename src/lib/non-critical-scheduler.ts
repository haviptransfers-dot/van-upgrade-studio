// Scheduling is external to the production tracking snippet, which stays verbatim.
// Tracking tasks (analytics/marketing) are queued and only executed after the
// visitor has given consent via the cookie banner (localStorage "cookieConsent").
export const nonCriticalScheduler = `
(function () {
  var slot = 0;
  var queue = [];
  var flushed = false;
  function consentAllows() {
    try {
      var raw = window.localStorage.getItem('cookieConsent');
      if (!raw) return false;
      var c = JSON.parse(raw);
      return !!(c && (c.analytics || c.marketing));
    } catch (e) {
      return false;
    }
  }
  function run(task) {
    var delay = 8000 + slot++ * 2000;
    window.setTimeout(function () {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(task, { timeout: 2000 });
      } else {
        window.setTimeout(task, 0);
      }
    }, delay);
  }
  function flush() {
    if (flushed || !consentAllows()) return;
    flushed = true;
    for (var i = 0; i < queue.length; i++) run(queue[i]);
    queue = [];
  }
  window.scheduleNonCritical = function (task) {
    if (flushed) {
      run(task);
      return;
    }
    queue.push(task);
    flush();
  };
  window.addEventListener('cookie-consent-change', flush);
})();`;
