import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

const useListenMessages = () => {
  const socket = useStoreState((state) => state.socket.socket);
  const { setMessages } = useStoreActions((action) => action.chat);
  const { messages, selectedConversation } = useStoreState(
    (state) => state.chat
  );

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId === selectedConversation?._id) {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
      }
    });

    return () => socket?.off("newMessage"); // Ensure cleanup
  }, [socket, setMessages, messages, selectedConversation]);
};

export default useListenMessages;
