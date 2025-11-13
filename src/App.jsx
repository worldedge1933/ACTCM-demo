import { useState, useEffect, useRef } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { Piano, Audiotrack } from "@mui/icons-material";
import Header from "./components/Header";
import ChordProgression from "./pages/ChordProgression";
import SoundDesign from "./pages/SoundDesign";
import { audioEngine } from "./utils/audioEngine";
import "./App.css";

function App() {
  // Navigation state
  const [currentPage, setCurrentPage] = useState("chordProgression");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Music state
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
            // Extract root note - could be 1 char (C, D, E, etc.) or 2 chars (C#, D#, etc.)
            let rootNote;
            if (chordName.length >= 2 && chordName[1] === "#") {
              rootNote = chordName.substring(0, 2); // C#, D#, etc.
            } else {
              rootNote = chordName[0]; // C, D, E, etc.
            }
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

  // Menu navigation
  const menuItems = [
    { id: "chordProgression", label: "Chord Progression", icon: <Piano /> },
    { id: "soundDesign", label: "Sound Design", icon: <Audiotrack /> },
  ];

  const handleMenuClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handlePageChange = (pageId) => {
    // Pause playback when switching pages
    if (isPlaying) {
      setIsPlaying(false);
    }
    setCurrentPage(pageId);
    setDrawerOpen(false);
  };

  return (
    <>
      <Header onMenuClick={handleMenuClick} />

      {/* Side Drawer Navigation */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  selected={currentPage === item.id}
                  onClick={() => handlePageChange(item.id)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Page Content */}
      {currentPage === "chordProgression" && (
        <ChordProgression
          bpm={bpm}
          setBpm={setBpm}
          isPlaying={isPlaying}
          measures={measures}
          currentBeat={currentBeat}
          beatChords={beatChords}
          selectedBeat={selectedBeat}
          togglePlay={togglePlay}
          stopPlay={stopPlay}
          replayFromStart={replayFromStart}
          refreshPage={refreshPage}
          addMeasure={addMeasure}
          handleBpmChange={handleBpmChange}
          handleBeatClick={handleBeatClick}
          handleChordSelect={handleChordSelect}
          setSelectedBeat={setSelectedBeat}
        />
      )}

      {currentPage === "soundDesign" && <SoundDesign />}
    </>
  );
}

export default App;
