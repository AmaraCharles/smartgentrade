/*
 * SmartGen auth client.
 * Load this BEFORE any other script on every page that talks to the API.
 * - Stores the login token (localStorage "sgToken").
 * - Attaches "Authorization: Bearer <token>" to every request to the API
 *   (works for fetch() and jQuery $.ajax, no per-call changes needed).
 * - On dashboard/admin pages: redirects to login when there is no token or
 *   the server says the session has expired (401).
 */
(function () {
  var API_ORIGIN = "https://smartgen-render-2288.onrender.com";
  var TOKEN_KEY = "sgToken";
  var ROLE_KEY = "sgRole";

  var scriptSrc = (document.currentScript && document.currentScript.src) || location.href;
  var LOGIN_URL = new URL("../login.html", scriptSrc).href;

  // Requests that are allowed without a token / must not trigger a logout redirect.
  var PUBLIC_PATHS = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  }
  function safeRemove(key) {
    try { localStorage.removeItem(key); } catch (e) {}
  }

  function isApi(url) {
    return String(url || "").trim().indexOf(API_ORIGIN) === 0;
  }
  function isPublic(url) {
    var u = String(url || "").trim().slice(API_ORIGIN.length);
    return PUBLIC_PATHS.some(function (p) { return u.indexOf(p) === 0; });
  }
  function isProtectedPage() {
    return /\/dashboard\//.test(location.pathname);
  }

  var sgAuth = {
    API: API_ORIGIN,
    getToken: function () { return safeGet(TOKEN_KEY); },
    getRole: function () { return safeGet(ROLE_KEY) || "user"; },
    isAdmin: function () { return sgAuth.getRole() === "admin"; },
    // Call with the /auth/login or /auth/register response.
    saveSession: function (response) {
      if (response && response.token) {
        safeSet(TOKEN_KEY, response.token);
        safeSet(ROLE_KEY, response.role || "user");
      }
    },
    clear: function () {
      safeRemove(TOKEN_KEY);
      safeRemove(ROLE_KEY);
      safeRemove("user");
      safeRemove("userData");
    },
    logout: function () {
      sgAuth.clear();
      location.href = LOGIN_URL;
    },
  };
  window.sgAuth = sgAuth;

  function onUnauthorized(url, status) {
    if (status !== 401 || !isApi(url) || isPublic(url)) return;
    if (!isProtectedPage()) return;
    sgAuth.clear();
    alert("Your session has expired. Please log in again.");
    location.href = LOGIN_URL;
  }

  // ---- fetch ----
  if (window.fetch) {
    var origFetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      var url = typeof input === "string" ? input : (input && input.url) || "";
      var token = sgAuth.getToken();
      if (token && isApi(url)) {
        init = init || {};
        var headers = new Headers(init.headers || (typeof input !== "string" && input.headers) || {});
        if (!headers.has("Authorization")) headers.set("Authorization", "Bearer " + token);
        init.headers = headers;
      }
      return origFetch(input, init).then(function (res) {
        onUnauthorized(url, res.status);
        return res;
      });
    };
  }

  // ---- XMLHttpRequest (covers jQuery $.ajax / $.get) ----
  var origOpen = XMLHttpRequest.prototype.open;
  var origSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (method, url) {
    this._sgUrl = url;
    return origOpen.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function () {
    var xhr = this;
    var token = sgAuth.getToken();
    if (token && isApi(xhr._sgUrl)) {
      try { xhr.setRequestHeader("Authorization", "Bearer " + token); } catch (e) {}
    }
    xhr.addEventListener("loadend", function () {
      onUnauthorized(xhr._sgUrl, xhr.status);
    });
    return origSend.apply(this, arguments);
  };

  // ---- page guard ----
  if (isProtectedPage() && !sgAuth.getToken()) {
    location.replace(LOGIN_URL);
    return;
  }
  // Non-admins must not sit on admin pages (the server enforces this too).
  if (/\/dashboard\/admin\//.test(location.pathname) && !sgAuth.isAdmin()) {
    location.replace(LOGIN_URL);
  }
})();
