# Porsche 911 GT3 RS — Minimalist Concept Explorer

> A high-fidelity, scroll-driven interactive showcase for the Porsche 911 GT3 RS, built with a cinematic frame-animation technique and a precision-crafted minimalist UI.

---

## Overview

This project is a concept web experience that brings the Porsche 911 GT3 RS to life through a smooth scroll-driven canvas animation. As the user scrolls, 300 pre-rendered frames are sequenced on a full-screen canvas to create a seamless, video-like car reveal. The interface overlays rich editorial content across six thematic chapters — from the car's origin story to its aerodynamic engineering and cockpit UX.

The project was built with the assistance of **AI-powered development tools** (Google Deepmind's Antigravity IDE), which accelerated design iteration, component architecture, and responsive layout implementation.

---

## Live Features

- 🎞️ **300-Frame Scroll Animation** — Canvas-rendered frame-by-frame car animation driven by scroll position
- 📖 **6 Thematic Chapters** — The Beginning · Design Philosophy · Performance · UX · Aerodynamics · The Legacy
- 🧭 **Animated Timeline Navigation** — Active segment indicator with spring-physics transitions
- 🔍 **Live Search** — Filter chapters by title, category, or description
- 📋 **Full-Screen Specs Panel** — Explore detailed technical specifications per chapter
- 💎 **Diamond Pagination** — Decorative interactive slide indicators
- 📱 **Fully Responsive** — Dedicated desktop and mobile/tablet layouts at the `lg` breakpoint

---

## Responsive Design

| Breakpoint | Layout |
|---|---|
| **Desktop** (`lg+`) | 6-column nav · animated timeline track · left/right diamond buttons · right sidebar with chapter list + dot nav |
| **Tablet / Mobile** (`< lg`) | Burger menu drawer · progress pill dots · chapters overlay · `clamp()`-based fluid typography · mobile prev/next controls |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI component architecture |
| **TypeScript** | Type-safe development |
| **Vite 6** | Build tool and dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **Motion (Framer Motion)** | Spring animations, AnimatePresence, layout transitions |
| **Lucide React** | Icon system |
| **HTML Canvas API** | Frame-by-frame scroll animation rendering |
| **DM Sans** (Google Fonts) | Typography |

---

## Project Structure

```
minimalist-concept-banner/
├── assets/                   # Additional assets
├── Carpictures/              # Standalone scroll animation & image frames
│   ├── index.html            # Standalone HTML scrollable version
│   ├── Porsche.png           # Website favicon
│   └── ezgif-frame-001.jpg...# 300 JPEG frames for React app scroll animation
├── node_modules/             # Installed dependencies
├── src/
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles + Tailwind + Google Fonts
├── index.html                # Main React entry HTML
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js `18+`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AhmedMohamed257/porsche-gt3rs-concept.git
cd porsche-gt3rs-concept

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Type Check

```bash
npm run lint
```

---

## Frame Animation Setup

The scroll animation requires **300 sequential JPEG frames** placed in the `Carpictures/` directory, named in the format:

```
ezgif-frame-001.jpg
ezgif-frame-002.jpg
...
ezgif-frame-300.jpg
```

These frames can be exported from a video or GIF using a tool like [ezgif.com](https://ezgif.com/video-to-jpg) or FFmpeg:

```bash
ffmpeg -i your-video.mp4 -vf fps=30 public/frames/ezgif-frame-%03d.jpg
```

The canvas renderer uses `cover`-style scaling to maintain aspect ratio across all screen sizes.

---

## Design Decisions

- **Scroll-driven animation** was chosen over video embedding for maximum control over playback speed and to avoid autoplay restrictions on mobile browsers.
- **Canvas API** renders frames directly for performance, avoiding DOM overhead from `<img>` elements.
- **Spring physics** (via Motion) are used throughout navigation for a premium, tactile feel.
- **Breakpoint at `lg` (1024px)** cleanly separates desktop editorial layout from mobile-first navigation patterns.
- The **`clamp()` CSS function** ensures smooth, proportional font scaling between mobile and tablet without jarring breakpoints.

---

## AI-Assisted Development

This project was developed with the assistance of **Antigravity IDE** (powered by Google Deepmind), an AI coding agent used throughout the development process for:

- Component architecture and TypeScript type design
- Responsive layout implementation across breakpoints
- Animation logic for the canvas frame renderer
- UI/UX refinement and accessibility improvements

AI assistance accelerated iteration and design exploration while all creative direction, content, and final decisions remained with the developer.

---

## Chapters

| # | Chapter | Title |
|---|---|---|
| 01 | The Beginning | Porsche 911 GT3 RS |
| 02 | Design Philosophy | Form Driven by Function |
| 03 | Performance | Naturally Aspirated Excellence |
| 04 | UX | Designed Around the Driver |
| 05 | Aerodynamics | Aerodynamics Without Compromise |
| 06 | The Legacy | Built to Dominate Every Corner |

---

## License

This project is for **portfolio and educational purposes only**. The Porsche name, logo, and all related trademarks are the property of Dr. Ing. h.c. F. Porsche AG. This project has no affiliation with Porsche AG.

---

<p align="center">
  Built with precision. Designed for speed.
</p>
