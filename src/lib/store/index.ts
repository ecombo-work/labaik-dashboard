import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../apis/auth";
import { userApi } from "../apis/user";
import { umrahApi } from "../apis/umrah";
import { couponApi } from "../apis/coupon";
import { contactApi } from "../apis/contact";
import { chatApi } from "../apis/chat";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [umrahApi.reducerPath]: umrahApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      umrahApi.middleware,
      couponApi.middleware,
      contactApi.middleware,
      chatApi.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
