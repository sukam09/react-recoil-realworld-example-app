import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface LoadingProps {
  height?: string;
}

const Loading = ({ height = "100%" }: LoadingProps) => {
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
