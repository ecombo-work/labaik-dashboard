import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../apis/auth";
import { userApi } from "../apis/user";
import { umrahApi } from "../apis/umrah";
import { couponApi } from "../apis/coupon";
import { contactApi } from "../apis/contact";
import { chatApi } from "../apis/chat";
import { accountsApi } from "../apis/account";
import { financeApi } from "../apis/finance";
import { termApi } from "../apis/term";
import { withdrawalApi } from "../apis/withdrawal";
import { overviewApi } from "../apis/overview";
import { notificationApi } from "../apis/notifications";
import { reportsApi } from "../apis/reports";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [umrahApi.reducerPath]: umrahApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [withdrawalApi.reducerPath]: withdrawalApi.reducer,
    [financeApi.reducerPath]: financeApi.reducer,
    [termApi.reducerPath]: termApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      umrahApi.middleware,
      couponApi.middleware,
      contactApi.middleware,
      chatApi.middleware,
      accountsApi.middleware,
      financeApi.middleware,
      termApi.middleware,
      notificationApi.middleware,
      overviewApi.middleware,
      withdrawalApi.middleware,
      reportsApi.middleware,
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
