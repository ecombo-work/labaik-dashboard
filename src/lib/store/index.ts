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

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [umrahApi.reducerPath]: umrahApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [financeApi.reducerPath]: financeApi.reducer,
    [termApi.reducerPath]: termApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
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
      termApi.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
