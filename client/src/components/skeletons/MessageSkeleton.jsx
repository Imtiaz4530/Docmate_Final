import { Skeleton, Box } from "@mui/material";

const MessageSkeleton = () => {
  return (
    <>
      {/* First Skeleton Block */}
      <Box display="flex" alignItems="center" gap={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box display="flex" flexDirection="column" gap={1}>
          <Skeleton variant="rectangular" height={16} width={160} />
          <Skeleton variant="rectangular" height={16} width={160} />
        </Box>
      </Box>

      {/* Second Skeleton Block */}
      <Box display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Skeleton variant="rectangular" height={16} width={160} />
        </Box>
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
    </>
  );
};

export default MessageSkeleton;
