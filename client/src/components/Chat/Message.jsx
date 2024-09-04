/* eslint-disable react/prop-types */
// import { Box, Avatar, Typography } from "@mui/material";
// import { useStoreState } from "easy-peasy";

// import { extractTime } from "../../utils/extractTime";

// const Message = ({ message }) => {
//   const authUser = useStoreState((state) => state.user.user);
//   const { selectedConversation } = useStoreState((state) => state.chat);

//   const fromMe = message.senderId === authUser._id;
//   const profilePic = fromMe
//     ? authUser?.profilePic
//     : selectedConversation?.profilePic;
//   const bubbleBgColor = fromMe ? "#3b82f6" : "#e0e0e0";
//   const textColor = fromMe ? "#fff" : "#000";
//   const shakeClass = message.shouldShake ? "shake" : "";
//   const align = fromMe ? "flex-end" : "flex-start";

//   const formattedTime = extractTime(message.createdAt);

//   return (
//     <Box display="flex" flexDirection="column" alignItems={align} mb={2}>
//       <Box display="flex" alignItems="center">
//         {!fromMe && (
//           <Avatar
//             src={profilePic}
//             alt="Chat Avatar"
//             sx={{ width: 40, height: 40, mr: 1 }}
//           />
//         )}
//         <Box
//           className={`chat-bubble ${shakeClass}`}
//           sx={{
//             backgroundColor: bubbleBgColor,
//             color: textColor,
//             padding: "8px 16px",
//             borderRadius: "12px",
//             borderBottomRightRadius: fromMe ? "0px" : "12px",
//             borderBottomLeftRadius: fromMe ? "12px" : "0px",
//             maxWidth: "60%",
//             wordWrap: "break-word",
//           }}
//         >
//           {message.message}
//         </Box>
//         {fromMe && (
//           <Avatar
//             src={profilePic}
//             alt="Chat Avatar"
//             sx={{ width: 40, height: 40, ml: 1 }}
//           />
//         )}
//       </Box>

//       <Typography
//         variant="caption"
//         sx={{
//           mt: 0.5,
//           color: "text.secondary",
//           fontSize: "0.75rem",
//           textAlign: fromMe ? "right" : "left",
//         }}
//       >
//         {formattedTime}
//       </Typography>
//     </Box>
//   );
// };

// export default Message;

import { Box, Avatar, Typography } from "@mui/material";
import { useStoreState } from "easy-peasy";

import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const authUser = useStoreState((state) => state.user.user);
  const { selectedConversation } = useStoreState((state) => state.chat);

  const fromMe = message.senderId === authUser._id;
  const profilePic = fromMe
    ? authUser?.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "#3b82f6" : "#f1f1f1";
  const textColor = fromMe ? "#fff" : "#000";
  const align = fromMe ? "flex-end" : "flex-start";

  const formattedTime = extractTime(message.createdAt);

  return (
    <Box display="flex" flexDirection="column" alignItems={align} mb={2}>
      <Box display="flex" alignItems="center">
        {!fromMe && (
          <Avatar
            src={profilePic}
            alt="Chat Avatar"
            sx={{ width: 40, height: 40, mr: 1 }}
          />
        )}
        <Box
          sx={{
            backgroundColor: bubbleBgColor,
            color: textColor,
            padding: "12px 20px",
            borderRadius: "20px",
            borderBottomRightRadius: fromMe ? "0px" : "20px",
            borderBottomLeftRadius: fromMe ? "20px" : "0px",
            maxWidth: "70%",
            wordWrap: "break-word",
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          {message.message}
        </Box>
        {fromMe && (
          <Avatar
            src={profilePic}
            alt="Chat Avatar"
            sx={{ width: 40, height: 40, ml: 1 }}
          />
        )}
      </Box>

      <Typography
        variant="caption"
        sx={{
          mt: 0.5,
          color: "text.secondary",
          fontSize: "0.75rem",
          textAlign: fromMe ? "right" : "left",
        }}
      >
        {formattedTime}
      </Typography>
    </Box>
  );
};

export default Message;
