"use client";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { getMessaging,getToken, Messaging, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/lib/firebase/config";

export const PushNotificationsContext = createContext<Messaging | undefined>(
  undefined
);

const PushNotificationsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [messaging, setMessaging] = useState<Messaging | undefined>(undefined);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        if (!isClient || !('serviceWorker' in navigator) || !('Notification' in window)) {
          console.log("Push Notifications Not supported");
          return;
        }
  
        // Request notification permission if not already granted or denied
        if (Notification.permission === 'default') {
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            console.log('Notification permission not granted');
            return;
          }
        } else if (Notification.permission !== 'granted') {
          console.log('Notification permission was previously denied');
          return;
        }
  
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const messagingInstance = getMessaging(app);
        setMessaging(messagingInstance);
  
        // Register service worker
        try {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
            scope: '/firebase-cloud-messaging-push-scope'
          });
          console.log('Service Worker registered with scope:', registration.scope);
          
          // Wait for the service worker to be ready
          await navigator.serviceWorker.ready;
          console.log('Service Worker is ready');
          
          // Check if the service worker is controlling the page
          if (navigator.serviceWorker.controller) {
            console.log('Service Worker is controlling the page');
          } else {
            console.log('Service Worker is not controlling the page. The page was likely loaded without a service worker.');
          }
        } catch (error) {
          console.error('Service Worker registration failed:', error);
          if (error instanceof Error) {
            console.error('Registration error details:', {
              name: error.name,
              message: error.message,
              stack: error.stack
            });
          }
          return;
        }
  
        // Get FCM token
        try {
          const token = await getToken(messagingInstance, {
            vapidKey: 'BHmYBzdIXhwL84JE9jvzC6a2EdhP4h5tdH2ogG1y-Dm_P1Ym30t47MEL7_xchnnA5WfFx_23DvBKXyoY3ZZDFQQ' // VAPID key from Firebase Console
          });
          
          if (token) {
            console.log('FCM Token retrieved successfully');
            try {
              // Save token to localStorage
              localStorage.setItem('fcmToken', token);
              console.log('FCM token saved to localStorage');
            } catch (storageError) {
              console.error('Error saving FCM token to localStorage:', storageError);
            }
          } else {
            console.warn('No FCM token available');
          }
        } catch (error) {
          console.error('Error getting FCM token:', error);
          
          // Try to get any existing token from localStorage
          const existingToken = localStorage.getItem('fcmToken');
          if (existingToken) {
            console.log('Using existing FCM token from localStorage');
            return; // Use the existing token if available
          }
          
          // Log detailed error info
          if (error instanceof Error) {
            const errorInfo: Record<string, unknown> = {
              message: error.message,
              stack: error.stack
            };
            // Check if it's a Firebase error which might have a code
            if ('code' in error) {
              errorInfo.code = (error as { code?: string }).code;
            }
            console.error('Error details:', errorInfo);
          }
        }
  
        // Handle incoming messages
        const unsubscribe = onMessage(messagingInstance, (payload) => {
          console.log('Message received:', payload);
          // This will only work when the app is in the foreground
          // Background messages are handled by the service worker
          if (payload.notification) {
            const notificationOptions: NotificationOptions = {
              body: payload.notification.body,
              icon: '/logo.png', 
              badge: '/logo.png', 
                data: {
                url: payload.data?.url || '/',
              },
            };

            // Create and show the notification
            const notification = new Notification(
              payload.notification.title || 'New Message',
              notificationOptions
            );

            // Handle notification click
            notification.onclick = (event) => {
              event.preventDefault();
              window.focus();
              if (notification.data?.url) {
                window.open(notification.data.url, '_blank');
              }
            };
          }
        });
  
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error initializing notifications:", error);
      }
    };
  
    if (isClient) {
      initializeNotifications();
    }
  }, [isClient]);
  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <PushNotificationsContext.Provider value={messaging}>
      {children}
    </PushNotificationsContext.Provider>
  );
};

export default PushNotificationsProvider;