import { useState, useEffect, useRef } from "react";
import { Container, Typography, Box } from "@mui/material";
import Header from "./components/Header";
import ControlPanel from "./components/ControlPanel";
import Timeline from "./components/Timeline";
import StatusDisplay from "./components/StatusDisplay";
import ChordSelector from "./components/ChordSelector";
import { audioEngine } from "./utils/audioEngine";
import "./App.css";

function App() {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [measures, setMeasures] = useState(4);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [beatChords, setBeatChords] = useState({}); // Store chords for each beat { beatIndex: chordName }
  const [selectedBeat, setSelectedBeat] = useState(null); // Currently selected beat
  const intervalRef = useRef(null);

  // Calculate time interval per beat (milliseconds)
  const beatInterval = (60 / bpm) * 1000;

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentBeat((prev) => {
          const nextBeat = (prev + 1) % (measures * 4);

          // Play chord root note if chord exists for the NEXT beat
          if (beatChords[nextBeat]) {
            const chordName = beatChords[nextBeat];
            const rootNote = chordName.split(" ")[0]; // Extract root note (e.g., "C" from "C Major")
            audioEngine.playChordRoot(rootNote, bpm);
          }

          return nextBeat;
        });
      }, beatInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, bpm, measures, beatInterval, beatChords]);

  const togglePlay = () => {
    // Initialize audio engine on first play (requires user interaction)
    audioEngine.init();
    setIsPlaying(true);
  };

  const stopPlay = () => {
    setIsPlaying(false);
  };

  const replayFromStart = () => {
    setCurrentBeat(0);
    setIsPlaying(true);
  };

  const refreshPage = () => {
    setIsPlaying(false);
    setCurrentBeat(0);
    setMeasures(4);
    setBpm(120);
    setBeatChords({});
  };

  const addMeasure = () => {
    setMeasures((prev) => prev + 1);
  };

  const handleBpmChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 300) {
      setBpm(value);
    }
  };

  const handleBeatClick = (beatIndex) => {
    setSelectedBeat(beatIndex);
  };

  const handleChordSelect = (beatIndex, chord) => {
    setBeatChords((prev) => {
      const newChords = { ...prev };
      if (chord === null) {
        delete newChords[beatIndex];
      } else {
        newChords[beatIndex] = chord;
      }
      return newChords;
    });
  };

  const handleCloseChordSelector = () => {
    setSelectedBeat(null);
  };

  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Music Synthesizer
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            A music creation tool based on Web Audio API
          </Typography>
        </Box>

        <ControlPanel
          isPlaying={isPlaying}
          bpm={bpm}
          measures={measures}
          onPlay={togglePlay}
          onStop={stopPlay}
          onReplay={replayFromStart}
          onRefresh={refreshPage}
          onBpmChange={handleBpmChange}
          onAddMeasure={addMeasure}
        />

        <Timeline
          measures={measures}
          currentBeat={currentBeat}
          onBeatClick={handleBeatClick}
          beatChords={beatChords}
        />

        <StatusDisplay currentBeat={currentBeat} />

        <ChordSelector
          open={selectedBeat !== null}
          onClose={handleCloseChordSelector}
          onSelect={handleChordSelect}
          beatIndex={selectedBeat}
          currentChord={selectedBeat !== null ? beatChords[selectedBeat] : null}
        />
      </Container>
    </>
  );
}

export default App;
