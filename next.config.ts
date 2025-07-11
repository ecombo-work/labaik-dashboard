import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyCZg8b2RP-lTLy6YAcs35gefrU3xhFzZv4",
//   authDomain: "labaik-app-ed6db.firebaseapp.com",
//   projectId: "labaik-app-ed6db",
//   storageBucket: "labaik-app-ed6db.firebasestorage.app",
//   messagingSenderId: "611007332712",
//   appId: "1:611007332712:web:4323dbddf7aed53d0e56dd",
//   measurementId: "G-WVMQP6V2V7"
// };
//fake
const firebaseConfig = {

  apiKey: "AIzaSyCo-0Ts1EpdKjl6gUeiXLXDO4Ndpc4fzoo",

  authDomain: "this-is-fake-one.firebaseapp.com",

  projectId: "this-is-fake-one",

  storageBucket: "this-is-fake-one.firebasestorage.app",

  messagingSenderId: "267094150643",

  appId: "1:267094150643:web:c217c74f8b6783e9381686",

  measurementId: "G-9ZNBKTFSZR",
  vapidKey: "BHmYBzdIXhwL84JE9jvzC6a2EdhP4h5tdH2ogG1y-Dm_P1Ym30t47MEL7_xchnnA5WfFx_23DvBKXyoY3ZZDFQQ ",
};

const nextConfig: NextConfig = {
  // serviceWorker: {
  //   name: 'firebase-messaging-sw.js',
  //   entry: 'src/config/firebase-messaging-sw.js',
  //   livereload: true
  // },
  // compress: true,
  // reactStrictMode: true,
  // experimental: {
  //   optimizeCss: true,
  // },
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
      }
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: '/firebase-messaging-sw.js',
        headers: [
          {
            key: 'Service-Worker-Allow',
            value: '/'
          }
        ]
      }
    ];
  },
  // https://api.labaikapp.com/v1
  env: {
    // NEXT_PUBLIC_API_BASE_URL_V1: "https://api.labaikapp.com/v1",
    NEXT_PUBLIC_API_BASE_URL_V1: "http://localhost:3001/v1",
    NEXT_PUBLIC_FIREBASE_API_KEY: firebaseConfig.apiKey ,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:firebaseConfig.authDomain,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: firebaseConfig.projectId,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:firebaseConfig.storageBucket,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: firebaseConfig.messagingSenderId,
    NEXT_PUBLIC_FIREBASE_APP_ID: firebaseConfig.appId,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:firebaseConfig.measurementId,
    NEXT_PUBLIC_FIREBASE_VAPID_KEY: firebaseConfig.vapidKey,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
