import 'dotenv/config';

export default {
  expo: {
    name: "TrackBike",
    slug: "trackbike",
    version: "1.0.0",
    sdkVersion: "50.0.0", // Cambia si usas otra versión de Expo
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER: process.env.FIREBASE_MESSAGING_SENDER,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    },
  },
};