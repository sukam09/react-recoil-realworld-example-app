import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = ({ height = "100%" }: { height?: string }) => {
  return (
    <Box
      sx={{
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ color: "gray" }} />
    </Box>
  );
};

export default Loading;
