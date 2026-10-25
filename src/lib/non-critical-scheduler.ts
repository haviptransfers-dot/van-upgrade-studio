// Scheduling is external to the production tracking snippet, which stays verbatim.
export const nonCriticalScheduler = `
(function () {
  var slot = 0;
  window.scheduleNonCritical = function (task) {
    var delay = 8000 + slot++ * 2000;
    window.setTimeout(function () {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(task, { timeout: 2000 });
      } else {
        window.setTimeout(task, 0);
      }
    }, delay);
  };
})();`;