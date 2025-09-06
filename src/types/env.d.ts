/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_FIREBASE_DATABASE_URL: string;

  // Cloud Function endpoints
  readonly VITE_SENSHI_ENDPOINT: string;
  readonly VITE_KATA_ENDPOINT: string;
  readonly VITE_ECHO_ENDPOINT: string;
  readonly VITE_KOJIRO_ENDPOINT: string;
  readonly VITE_META_AGENT_ENDPOINT: string;
  readonly VITE_CF_UPLOAD_FROM_URL: string;
  readonly VITE_CF_UPLOAD_FROM_BUFFER: string;

  // Template editing endpoints
  readonly VITE_IMAGE_INFO: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
