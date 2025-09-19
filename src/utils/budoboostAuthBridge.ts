// src/utils/budoboostAuthBridge.ts
import { signInWithCustomToken, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const AUTH_ORIGIN = "https://budoboost.ai";

export function buildAuthUrl(): string {
  const url = new URL("/authform", AUTH_ORIGIN);
  url.searchParams.set("origin", window.location.origin);
  url.searchParams.set("returnUrl", window.location.href);
  return url.toString();
}

/** Save where we were so /auth-bridge can send us back after signing in. */
function rememberReturnUrl() {
  try { sessionStorage.setItem("bb:return", window.location.href); } catch {}
}

export function startBudoBoostAuthRedirect(): void {
  rememberReturnUrl();
  window.location.href = buildAuthUrl();
}

// keep the old name alive if something still imports it
export const openBudoBoostAuth = startBudoBoostAuthRedirect;

/** Read ct from either ?ct=… or #ct=… */
function readCustomTokenFromUrl(): string | null {
  const u = new URL(window.location.href);
  const q = u.searchParams.get("ct");
  if (q) return q;

  const h = u.hash.startsWith("#") ? u.hash.slice(1) : u.hash;
  if (!h) return null;
  const p = new URLSearchParams(h);
  const ct = p.get("ct");
  return ct;
}

/** After signing in, clean URL and send user back. */
function bounceBack() {
  const backTo = (() => {
    try { return sessionStorage.getItem("bb:return") || "/"; } catch { return "/"; }
  })();
  try { sessionStorage.removeItem("bb:return"); } catch {}
  window.location.replace(backTo);
}

/**
 * Call this on your /auth-bridge route.
 * It consumes ct, signs in, cleans the URL, then navigates back.
 */
export async function completeBudoBoostAuthFromUrl() {
  const ct = readCustomTokenFromUrl();
  if (!ct) throw new Error("Missing custom token (ct) in URL.");

  await signInWithCustomToken(auth, ct);

  // wait until Firebase sets currentUser
  await new Promise<void>((resolve, reject) => {
    const off = onAuthStateChanged(auth, (u) => {
      off();
      u ? resolve() : reject(new Error("Signed in but no user"));
    });
  });

  // clean URL (remove ct or hash)
  const clean = window.location.pathname;
  window.history.replaceState({}, "", clean);

  return auth.currentUser!;
}

export default {
  AUTH_ORIGIN,
  buildAuthUrl,
  startBudoBoostAuthRedirect,
  openBudoBoostAuth,
  completeBudoBoostAuthFromUrl,
};
