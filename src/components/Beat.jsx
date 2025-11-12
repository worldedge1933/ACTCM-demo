import { Box, Typography } from "@mui/material";

function Beat({ beatInMeasure, absoluteBeat, currentBeat, onClick }) {
  const isActive = absoluteBeat === currentBeat;

  return (
    <Box
      onClick={() => onClick(absoluteBeat)}
      sx={{
        flex: 1,
        borderRight: beatInMeasure < 3 ? "1px solid #ccc" : "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transition: "all 0.1s ease",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      {/* Zoom effect background */}
      {isActive && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(25, 118, 210, 0.2)",
            borderRadius: 2,
            zIndex: 0,
            transform: "scale(1.3)",
          }}
        />
      )}

      {/* Content container - using transform to zoom without affecting layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.1s ease",
          transform: isActive ? "scale(1.2)" : "scale(1)",
          zIndex: 1,
        }}
      >
        {/* Beat tick mark */}
        <Box
          sx={{
            width: 2,
            height: beatInMeasure === 0 ? 40 : 30,
            backgroundColor: beatInMeasure === 0 ? "#333" : "#666",
            transition: "all 0.1s ease",
          }}
        />

        {/* Beat number */}
        <Typography
          variant="caption"
          sx={{
            mt: 1,
            fontWeight: isActive ? "bold" : "normal",
            fontSize: isActive ? "1rem" : "0.75rem",
            color: isActive ? "primary.main" : "text.secondary",
            transition: "all 0.1s ease",
          }}
        >
          {beatInMeasure + 1}
        </Typography>
      </Box>
    </Box>
  );
}

export default Beat;
