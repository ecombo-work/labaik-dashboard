// import { firebaseConfig } from "@/lib/firebase/config";
// import { initializeApp, getApps, getApp } from "firebase/app";
// import {
//   getMessaging,
//   getToken,
//   onMessage,
//   isSupported,
// } from "firebase/messaging";

// // const firebaseConfig = {
// //   apiKey: "AIzaSyCZg8b2RP-lTLy6YAcs35gefrU3xhFzZv4",
// //   authDomain: "labaik-app-ed6db.firebaseapp.com",
// //   projectId: "labaik-app-ed6db",
// //   storageBucket: "labaik-app-ed6db.firebasestorage.app",
// //   messagingSenderId: "611007332712",
// //   appId: "1:611007332712:web:4323dbddf7aed53d0e56dd",
// //   measurementId: "G-WVMQP6V2V7",
// // };

// // Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// // Get FCM token
// const getFcmToken = async (): Promise<string | null> => {
//   try {
//     const isSupportedBrowser = await isSupported();
//     if (!isSupportedBrowser) {
//       console.log("This browser does not support push notifications");
//       return null;
//     }

//     const messaging = getMessaging(app);

//     // Request notification permission
//     const permission = await Notification.requestPermission();
//     if (permission !== "granted") {
//       console.log("Notification permission not granted");
//       return null;
//     }

//     // Get FCM token
//     const token = await getToken(messaging, {
//       vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
//     }).catch((error) => {
//       console.error("Error getting FCM token:", error);
//       throw error;
//     });

//     if (!token) {
//       console.log("No registration token available.");
//       return null;
//     }

//     console.log("FCM Token:", token);
//     return token;
//   } catch (error) {
//     console.error("Error getting FCM token:", error);
//     return null;
//   }
// };

// // Listen for incoming messages when app is in foreground
// const onMessageListener = () =>
//   new Promise((resolve) => {
//     isSupported().then((isSupportedBrowser) => {
//       if (isSupportedBrowser) {
//         const messaging = getMessaging();
//         onMessage(messaging, (payload) => {
//           console.log("Message received in foreground: ", payload);
//           // You can customize the notification here
//           if (payload.notification) {
//             new Notification(payload.notification.title || "", {
//               body: payload.notification.body,
//               icon: "/icons/icon-192x192.png",
//             });
//           }
//           resolve(payload);
//         });
//       }
//     });
//   });

// export { app, getFcmToken, onMessageListener };
