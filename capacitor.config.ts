// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vantra.app',
  appName: 'Vantra',
  webDir: 'dist',   // 👈 points to the folder with index.html
  server: { androidScheme: 'https' }    // good default
};

export default config;
