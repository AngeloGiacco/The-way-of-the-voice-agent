# The Way of the Voice Agent

An immersive, visually stunning single-page website that teaches developers the philosophy and craft of building exceptional AI voice agents.

## Features

- **Immersive Experience**: Full-page scroll-driven narrative with Three.js visualizations
- **Interactive Components**: Conversation demos, latency simulators, version timeline
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **3D Visualizations**: Custom GLSL shaders with React Three Fiber
- **Audio Support**: Tone.js integration for ambient audio

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── layout/            # Navigation, ProgressBar, AudioToggle
│   ├── sections/          # Hero, TheMedium, ConversationDesign, etc.
│   ├── interactive/       # ConversationDemo, LatencySimulator
│   ├── ui/               # Button, Card, ScrollReveal, etc.
│   └── three/            # Three.js Canvas, Shaders, Meshes
├── hooks/                 # Custom React hooks
├── stores/               # Zustand state management
├── lib/                  # Utilities and audio manager
├── content/              # Chapter data and examples
└── types/                # TypeScript type definitions
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D/Shaders**: Three.js + React Three Fiber
- **Animation**: Framer Motion
- **Audio**: Tone.js
- **State**: Zustand

## License

MIT
