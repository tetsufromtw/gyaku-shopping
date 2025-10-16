/**
 * Environment configuration
 * Set USE_MOCK_DATA to true to use mock data instead of Firebase
 */
export const config = {
  // Set to true to use mock data (no Firebase needed)
  // Set to false to use real Firebase services
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',

  // Firebase config
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  },

  // App config
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
};

export const isMockMode = config.USE_MOCK_DATA;
