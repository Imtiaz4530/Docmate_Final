// import { useEffect, useRef } from "react";
// import { Box, Typography, CircularProgress } from "@mui/material";

// import Message from "./Message";
// import useGetMessages from "../../hooks/chat/useGetMessages";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
// import useListenMessages from "../../hooks/chat/useListenMessages";

// const Messages = () => {
//   const { messages, loading } = useGetMessages();
//   useListenMessages();
//   const lastMessageRef = useRef();

//   useEffect(() => {
//     setTimeout(() => {
//       lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   }, [messages]);

//   return (
//     <Box
//       sx={{
//         px: 2,
//         flex: 1,
//         overflowY: "auto",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {!loading &&
//         messages.length > 0 &&
//         messages.map((message) => (
//           <Box key={message._id} ref={lastMessageRef}>
//             <Message message={message} />
//           </Box>
//         ))}

//       {loading && (
//         <>
//           {[...Array(3)].map((_, i) => (
//             <MessageSkeleton key={i} />
//           ))}
//           <Box display="flex" justifyContent="center" mt={2}>
//             <CircularProgress />
//           </Box>
//         </>
//       )}

//       {!loading && messages.length === 0 && (
//         <Typography align="center" sx={{ mt: 2, color: "text.secondary" }}>
//           Send a message to start the conversation
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default Messages;

import { useEffect, useRef } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

import Message from "./Message";
import useGetMessages from "../../hooks/chat/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/chat/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <Box key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </Box>
        ))}

      {loading && (
        <>
          {[...Array(3)].map((_, i) => (
            <MessageSkeleton key={i} />
          ))}
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        </>
      )}

      {!loading && messages.length === 0 && (
        <Typography align="center" sx={{ mt: 2, color: "text.secondary" }}>
          Send a message to start the conversation
        </Typography>
      )}
    </Box>
  );
};

export default Messages;
