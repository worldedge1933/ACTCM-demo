# ACTAM Demo - Music Synthesizer

A web-based music synthesizer application with interactive timeline, beat tracking, and chord notation capabilities for the ACTAM project.

## 🎵 Features

- **Interactive Timeline**: Visual representation of musical measures and beats (4/4 time signature)
- **Playback Controls**: Play, Pause, Replay, and Reset functionality
- **BPM Control**: Adjustable tempo (1-300 BPM)
- **Chord Selection**: Choose from 12 root notes and 9 chord qualities
- **Beat Animation**: Visual feedback for active beats
- **Dynamic Measures**: Add measures on the fly
- **Modular Architecture**: Clean component-based structure

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js)

### Installation

1. Clone the repository:

```powershell
git clone https://github.com/worldedge1933/ACTCM-demo.git
cd ACTCM-demo
```

2. Install dependencies:

```powershell
npm install
```

### Running the Project

**Development Mode:**

```powershell
npm run dev
```

This will start the Vite development server. Open your browser and navigate to:

```
http://localhost:5173
```

**Build for Production:**

```powershell
npm run build
```

The built files will be in the `dist/` directory.

**Preview Production Build:**

```powershell
npm run preview
```

## 🎮 How to Use

1. **Set BPM**: Adjust the tempo using the BPM input field (default: 120)
2. **Play/Pause**: Click the Play button to start, Pause to stop at current position
3. **Add Measures**: Click "Add Measure" to extend the timeline
4. **Select Chords**: Click on any beat to open the chord selector
   - Step 1: Choose a root note (C, C#, D, etc.)
   - Step 2: Choose a chord quality (Major, Minor, 7th, etc.)
5. **Visual Feedback**: Watch beats highlight as they play

## 🛠️ Tech Stack

- **React** 18+ - UI framework
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
- **Emotion** - CSS-in-JS styling

## 📁 Project Structure

```
ACTAM-demo/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Application header
│   │   ├── ControlPanel.jsx    # Playback controls and settings
│   │   ├── Timeline.jsx        # Measure container
│   │   ├── Measure.jsx         # Individual measure display
│   │   ├── Beat.jsx            # Beat visualization
│   │   ├── ChordSelector.jsx   # Chord selection dialog
│   │   ├── StatusDisplay.jsx   # Current position display
│   │   └── index.js            # Component exports
│   ├── App.jsx                 # Main application
│   ├── App.css                 # App styles
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🎼 Music Features

### Chord System

- **12 Root Notes**: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
- **9 Chord Qualities**:
  - Major
  - Minor
  - Dominant 7th
  - Major 7th
  - Minor 7th
  - Diminished
  - Augmented
  - Suspended 2nd
  - Suspended 4th

### Time Signature

- Currently supports 4/4 time signature
- 4 beats per measure
- Visual emphasis on beat 1 (downbeat)

