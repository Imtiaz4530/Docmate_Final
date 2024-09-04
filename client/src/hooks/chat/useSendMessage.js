import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages } = useStoreActions((action) => action.chat);
  const { messages, selectedConversation } = useStoreState(
    (state) => state.chat
  );

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/api/chats/send/${selectedConversation._id}`,
        { message }
      );
      const data = res.data;
      console.log(data);

      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
