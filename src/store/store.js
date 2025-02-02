import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice/authSlice";
import ChatsSlice from "./chatsSlice/chatsSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    chats: ChatsSlice,
  },
});
