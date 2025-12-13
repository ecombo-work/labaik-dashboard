"use client";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  getMessaging,
  getToken,
  Messaging,
  onMessage,
  deleteToken,
} from "firebase/messaging";
import { initializeApp, FirebaseApp } from "firebase/app";
import { firebaseConfig } from "@/lib/firebase/config";

type PushNotificationsContextValue = {
  messaging: Messaging | undefined;
  fcmToken: string | null;
  requestNotificationPermission: () => Promise<boolean>;
};

export const PushNotificationsContext =
  createContext<PushNotificationsContextValue>({
    messaging: undefined,
    fcmToken: null,
    requestNotificationPermission: async () => false,
  });

const PushNotificationsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [messaging, setMessaging] = useState<Messaging | undefined>(undefined);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [app, setApp] = useState<FirebaseApp | undefined>(undefined);

  // Initialize Firebase only once
  useEffect(() => {
    if (typeof window === "undefined") return; // SSR guard

    try {
      const firebaseApp = initializeApp(firebaseConfig);
      setApp(firebaseApp);
      const messagingInstance = getMessaging(firebaseApp);
      setMessaging(messagingInstance);
    } catch (error) {
      console.error("Firebase initialization error:", error);
    }

    return () => {
      if (app) {
        // Cleanup Firebase if needed
      }
    };
  }, []);

  // Handle FCM token and service worker registration
  useEffect(() => {
    if (!messaging || typeof window === "undefined") return;

    let unsubscribeOnMessage: (() => void) | undefined;

    const initializeFCM = async () => {
      try {
        // Check notification support
        if (!("serviceWorker" in navigator) || !("Notification" in window)) {
          console.warn("Push notifications not supported");
          return;
        }

        // Register service worker
        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          {
            scope: "/",
          }
        );

        // Get existing token if available
        const existingToken = localStorage.getItem("fcmToken");
        if (existingToken) {
          setFcmToken(existingToken);
          return;
        }

        // Request notification permission if needed
        if (Notification.permission !== "granted") {
          return;
        }

        // Get new FCM token
        const token = await getToken(messaging, {
          vapidKey: firebaseConfig.vapidKey,
          serviceWorkerRegistration: registration,
        });

        if (token) {
        
          localStorage.setItem("fcmToken", token);
          setFcmToken(token);
        }
      } catch (error) {
        console.error("FCM initialization error:", error);
        if (error instanceof Error && "code" in error) {
          console.error("Error code:", (error as any).code);
        }
      }
    };

    // Set up message listener
    unsubscribeOnMessage = onMessage(messaging, (payload) => {
    
      if (payload.notification) {
        new Notification(payload.notification.title || "New message", {
          body: payload.notification.body,
          icon: "/logo.png",
          data: { url: payload.data?.url },
        });
      }
    });

    initializeFCM();

    return () => {
      if (unsubscribeOnMessage) unsubscribeOnMessage();
    };
  }, [messaging]);

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (typeof window === "undefined") return false;
    if (!messaging) return false;

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: firebaseConfig.vapidKey,
        });
        if (token) {
          localStorage.setItem("fcmToken", token);
          setFcmToken(token);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Permission request error:", error);
      return false;
    }
  };

  const contextValue = useMemo(
    () => ({
      messaging,
      fcmToken,
      requestNotificationPermission,
    }),
    [messaging, fcmToken]
  );

  return (
    <PushNotificationsContext.Provider value={contextValue}>
      {children}
    </PushNotificationsContext.Provider>
  );
};

export default PushNotificationsProvider;
