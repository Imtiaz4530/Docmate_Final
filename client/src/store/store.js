import { createStore } from "easy-peasy";

import userModel from "./models/userModel";
import chatModel from "./models/chatModel";
import socketModel from "./models/socketModel";

const store = createStore({
  user: userModel,
  chat: chatModel,
  socket: socketModel,
});

export default store;
