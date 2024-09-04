import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";

const useGetMessages = () => {
  const [loading, setLoading] = useState();
  const { setMessages } = useStoreActions((action) => action.chat);
  const { selectedConversation, messages } = useStoreState(
    (state) => state.chat
  );
  const { setSelectedConversation } = useStoreActions((action) => action.chat);

  useEffect(() => {
    const storedConversation = JSON.parse(localStorage.getItem("chat-user"));
    if (storedConversation) {
      setSelectedConversation(storedConversation);
    }
  }, [setSelectedConversation]);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/api/chats/${selectedConversation?._id}`
        );

        const data = res.data;

        if (data.error) {
          throw new Error(data.error);
        }

        setMessages(data);
      } catch (e) {
        toast.error(e.messages);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return {
    messages,
    loading,
  };
};

export default useGetMessages;
