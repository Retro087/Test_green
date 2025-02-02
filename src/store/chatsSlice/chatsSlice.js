import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  chatId: "",
  list: [],
  messages: [],
};

export const fetchNotifications = createAsyncThunk(
  "message/fetchNotifications",
  async ({ idInstance, apiTokenInstance }, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
      );
      if (response.data) {
        debugger;
        const notification = response.data;
        if (
          notification.body &&
          notification.body.typeWebhook === "incomingMessageReceived"
        ) {
          await dispatch(
            deleteNotification({
              receiptId: notification.receiptId,
              idInstance: idInstance,
              apiTokenInstance: apiTokenInstance,
            })
          );
          if (notification.body.messageData.textMessageData.textMessage) {
            return {
              text: notification.body.messageData.textMessageData.textMessage,
              author: "them",
            };
          }
        }
      }
      return null;
    } catch (error) {
      console.error("Error getting messages:", error);
      throw error;
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "message/deleteNotification",
  async ({ receiptId, idInstance, apiTokenInstance }) => {
    try {
      await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async ({ idInstance, apiTokenInstance, chatId, message }) => {
    try {
      await axios.post(
        `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        {
          chatId: `${chatId}@c.us`,
          message: message,
        }
      );
      return { text: message, author: "me" };
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
);

export const ChatsSlice = createSlice({
  name: "Chats",
  initialState,
  reducers: {
    createChat: (state, action) => {
      state.chatId = action.payload;
      state.list.push(action.payload);
    },
    chooseChat: (state, action) => {
      state.chatId = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(fetchNotifications.fulfilled, (state, action) => {
        debugger;
        if (action.payload) state.messages.push(action.payload);
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        debugger;
        state.error = action.error.message;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { createChat, chooseChat, clearMessages } = ChatsSlice.actions;

export default ChatsSlice.reducer;
