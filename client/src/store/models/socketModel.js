import { action, thunk } from "easy-peasy";
import io from "socket.io-client";

const socketModel = {
  socket: null,
  onlineUsers: [],

  setSocket: action((state, payload) => {
    state.socket = payload;
  }),

  setOnlineUsers: action((state, payload) => {
    state.onlineUsers = payload;
  }),

  initializeSocket: thunk((actions, payload, { getState, getStoreState }) => {
    const authUser = getStoreState().user.user; // Access authUser from userModel
    if (authUser) {
      const socket = io("http://localhost:4000", {
        query: { userId: authUser._id },
      });

      actions.setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        actions.setOnlineUsers(users);
      });
    } else {
      actions.setSocket(null);
    }
  }),
};

export default socketModel;
