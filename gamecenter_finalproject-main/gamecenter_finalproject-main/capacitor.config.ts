import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.thegang.gamecenter',
  appName: 'GameCenter',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Haptics: {},
    Preferences: {},
    StatusBar: {
      style: 'dark'
    }
  }
};

export default config;
