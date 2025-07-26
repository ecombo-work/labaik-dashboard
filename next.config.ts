import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const firebaseConfig = {
  apiKey: "AIzaSyCZg8b2RP-lTLy6YAcs35gefrU3xhFzZv4",
  authDomain: "labaik-app-ed6db.firebaseapp.com",
  projectId: "labaik-app-ed6db",
  storageBucket: "labaik-app-ed6db.firebasestorage.app",
  messagingSenderId: "611007332712",
  appId: "1:611007332712:web:4323dbddf7aed53d0e56dd",
  measurementId: "G-WVMQP6V2V7",
  vapidKey:
    "BKtV2MFzioHnXOlWvvjufWywyWkTq9UmiAWA6A3saGLtK4F87Jb8MfAWw8XcNbj0tN8gqF2pIHOfWDrry3rxbpE",
};
const nextConfig: NextConfig = {
  compress: true,
  output: 'standalone',
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-*'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sgp1.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/firebase-messaging-sw.js",
        headers: [
          {
            key: "Service-Worker-Allow",
            value: "/",
          },
        ],
      },
    ];
  },
  
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
//       ? 'https://api.labaikapp.com/v1'
// env: {
//   NEXT_PUBLIC_API_BASE_URL_V1:'http://localhost:3001/v1',
//   NEXT_PUBLIC_FIREBASE_API_KEY: firebaseConfig.apiKey,
//   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: firebaseConfig.authDomain,
//   NEXT_PUBLIC_FIREBASE_PROJECT_ID: firebaseConfig.projectId,
//   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: firebaseConfig.storageBucket,
//   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: firebaseConfig.messagingSenderId,
//   NEXT_PUBLIC_FIREBASE_APP_ID: firebaseConfig.appId,
//   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: firebaseConfig.measurementId,
//   NEXT_PUBLIC_FIREBASE_VAPID_KEY: firebaseConfig.vapidKey,
// },