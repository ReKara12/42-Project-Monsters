// Browser-safe config only: no secrets, no CLIENT_SECRET, no .env loading.
// OAuth code exchange runs server-side at authProxyUrl.
//
// OAuth "state" parameter:
// - Before redirect to authAuthorizeUrl, start42Auth stores crypto.randomUUID() in
//   sessionStorage as "auth_state" and sends the same value as the OAuth "state" query param.
// - On return with ?code=, the callback compares URL "state" to sessionStorage; mismatch
//   aborts and clears "auth_state". Proxy call remains GET authProxyUrl?code=...
//
// Proxy JSON (optional fields): passedProjects, currentMilestone, coalitionColor (#rrggbb
// only, validated in start42Auth before setProfile). renderProfile can stay unchanged; data is stored for future UI.
//
window.FRONT_CONFIG = {
  // Reşat verecek; boş = localStorage leaderboard.
  firebaseDatabaseUrl: "https://project-monsters-42-default-rtdb.firebaseio.com",
  authAuthorizeUrl: "https://api.intra.42.fr/oauth/authorize",
  // 42 intra UID (public). Reşat'ın 42 portalında oluşturduğu app.
  authClientId: "u-s4t2ud-6bb92eba95636403840615874055773eab093228c93d72921d03ec77511fed4a",
  // 42'nin login sonrası geri yönlendireceği URL. env dosyasındaki REDIRECT_URI ile aynı olmalı.
  authRedirectUri: "https://storied-fairy-cb64b7.netlify.app/",
  // Local auth proxy. node server/auth-proxy.mjs ile başlatılır, kök env'i okur.
  authProxyUrl: "/api/auth"
};

// Optional hooks for 42 Auth + Firebase without pulling in SDKs (assign from your bootstrap code).
window.FRONT_ADAPTERS = {
  // Called whenever local profile is replaced (local form or after token exchange).
  onProfileLoaded: null, // (profile) => void
  // Before POSTing a run to Firebase; return a shallow clone or the same object.
  mapRunBeforeRemoteSave: null, // (run) => run
  // If set, called to obtain RTDB path segments or auth headers later.
  getBackendContext: null // () => ({ pathPrefix: "", authHeader: "" }) | null
};
