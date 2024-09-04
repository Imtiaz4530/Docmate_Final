// import { useStoreActions, useStoreState } from "easy-peasy";
// import { useEffect } from "react";
// import { Box, Typography, Paper } from "@mui/material";

// import MessageInput from "../../components/Chat/MessageInput";
// import Messages from "../../components/Chat/Messages";

// const Chat = () => {
//   const { setSelectedConversation } = useStoreActions((action) => action.chat);
//   const { selectedConversation } = useStoreState((state) => state.chat);

//   useEffect(() => {
//     const storedConversation = JSON.parse(localStorage.getItem("chat-user"));
//     if (storedConversation) {
//       setSelectedConversation(storedConversation);
//     }

//     return () => {
//       setSelectedConversation(null);
//     };
//   }, [setSelectedConversation]);

//   return (
//     <Box display="flex" flexDirection="column" minWidth={{ md: "450px" }}>
//       {/* Header */}
//       <Paper
//         elevation={2}
//         sx={{ padding: 2, marginBottom: 2, backgroundColor: "#607D8B" }}
//       >
//         <Typography variant="subtitle2" color="textSecondary">
//           To:
//         </Typography>
//         <Typography variant="h6" fontWeight="bold" color="textPrimary">
//           {selectedConversation?.name}
//         </Typography>
//       </Paper>

//       <Messages />
//       <MessageInput />
//     </Box>
//   );
// };
// export default Chat;

import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import MessageInput from "../../components/Chat/MessageInput";
import Messages from "../../components/Chat/Messages";

const Chat = () => {
  const { setSelectedConversation } = useStoreActions((action) => action.chat);
  const { selectedConversation } = useStoreState((state) => state.chat);
  const socket = useStoreState((state) => state.socket.socket);

  useEffect(() => {
    const storedConversation = JSON.parse(localStorage.getItem("chat-user"));
    if (storedConversation) {
      setSelectedConversation(storedConversation);
    }

    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  const handleStartCall = () => {
    socket.emit("startCall", { receiverId: selectedConversation._id });
  };

  const handleEndCall = () => {
    socket.emit("endCall", { receiverId: selectedConversation._id });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minWidth={{ md: "450px" }}
      sx={{
        height: "100vh",
        backgroundColor: "#f7f7f7",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Paper
        elevation={2}
        sx={{
          padding: 2,
          backgroundColor: "#3b82f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            src={selectedConversation?.profilePic}
            sx={{ width: 40, height: 40, marginRight: 2 }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold" color="#fff">
              {selectedConversation?.name}
            </Typography>

            {/* New Video Calling Feature */}
            <Button
              onClick={handleStartCall}
              variant="contained"
              color="primary"
            >
              Start Call
            </Button>
            <Button
              onClick={handleEndCall}
              variant="contained"
              color="secondary"
            >
              End Call
            </Button>
            {/* New Video Calling Feature */}

            <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.8)">
              Online
            </Typography>
          </Box>
        </Box>
        <IconButton>
          <MoreVertIcon style={{ color: "#fff" }} />
        </IconButton>
      </Paper>

      <Messages />
      <MessageInput />
    </Box>
  );
};

export default Chat;
