import { Box, Typography } from "@mui/material";
import Beat from "./Beat";

function Measure({ measureIndex, currentBeat, onBeatClick, beatChords }) {
  return (
    <Box
      sx={{
        width: "calc(25% - 8px)",
        minWidth: 150,
        borderRight: "2px solid #333",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: 100,
        py: 1,
      }}
    >
      {/* Measure number */}
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          top: -20,
          left: 4,
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        {measureIndex + 1}
      </Typography>

      {/* Chord display layer */}
      <Box
        sx={{
          display: "flex",
          height: 20,
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {[0, 1, 2, 3].map((beatInMeasure) => {
          const absoluteBeat = measureIndex * 4 + beatInMeasure;
          const chord = beatChords[absoluteBeat];
          return (
            <Box
              key={beatInMeasure}
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRight: beatInMeasure < 3 ? "1px solid #f0f0f0" : "none",
              }}
            >
              {chord && (
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "0.7rem",
                    color: "secondary.main",
                  }}
                >
                  {chord}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      {/* 4 Beats */}
      <Box sx={{ display: "flex", flex: 1 }}>
        {[0, 1, 2, 3].map((beatInMeasure) => {
          const absoluteBeat = measureIndex * 4 + beatInMeasure;
          return (
            <Beat
              key={beatInMeasure}
              beatInMeasure={beatInMeasure}
              absoluteBeat={absoluteBeat}
              currentBeat={currentBeat}
              onClick={onBeatClick}
              chord={null}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default Measure;
