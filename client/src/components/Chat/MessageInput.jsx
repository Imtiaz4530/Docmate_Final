import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { TextField, IconButton, Box, CircularProgress } from "@mui/material";

import useSendMessage from "../../hooks/chat/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center" marginY={3} paddingX={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            style: {
              backgroundColor: "#424242", // Gray background
              color: "#fff", // White text
            },
          }}
        />
        <IconButton type="submit" sx={{ marginLeft: 1 }}>
          {loading ? <CircularProgress size={24} /> : <SendIcon />}
        </IconButton>
      </Box>
    </form>
  );
};
export default MessageInput;
