import { Box, CircularProgress } from "@mui/material";
const Loading = () => {
  return (
    <Box sx={{
      height: "100vh",
      width: "100vw",
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <CircularProgress size="2rem" />
    </Box>
  );
};

export default Loading;