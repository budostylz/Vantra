// src/pages/AuthBridge.tsx
import { useEffect } from "react";
import { completeBudoBoostAuthFromUrl } from "@/utils/budoboostAuthBridge";

export default function AuthBridge() {
  useEffect(() => {
    (async () => {
      try {
        await completeBudoBoostAuthFromUrl();
      } catch (e) {
        console.error("[AuthBridge] failed:", e);
        alert("Sign-in bridge failed. Please try again.");
      } finally {
        // completeBudoBoostAuthFromUrl already cleaned URL;
        // send the user back to where they started
        // (stored by startBudoBoostAuthRedirect)
        // If you prefer to do it here:
        const backTo = sessionStorage.getItem("bb:return") || "/";
        sessionStorage.removeItem("bb:return");
        window.location.replace(backTo);
      }
    })();
  }, []);
  return null;
}
