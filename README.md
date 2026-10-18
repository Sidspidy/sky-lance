# SKY LANCE — Future Flight, Reimagined

A cinematic product-launch portfolio website for **SKY LANCE**, a futuristic autonomous personal flight drone concept. Engineered with bold aerospace editorial typography, vivid aerospace orange (`#FF7900`), fluid scroll-driven video scrubbing, interactive hotspot telemetry, and modern glassmorphic UI.

---

## Highlights & Features

- **Cinematic Scroll Scrubbing**: Scrub through a 10-second 3D deconstruction film (`skylance-exploded.mp4`) as you scroll through the Hero and Concept sections.
- **01 / The Concept**: Frosted glassmorphism specification cards (`TAG // 01`, `02`, `03`) floating atop the exploded drone assembly.
- **02 / Design**: 3D drone inspection with interactive reticle dots (`01`, `02`, `03`, `04`) for aerodynamic canopy, monocoque fuselage, ducted nacelle, and landing skids.
- **03 / Engineering**: Asymmetric layout with pure Swiss editorial typography on the left and a sticky 360° turntable rotation film on the right with a floating control button.
- **04 / Details**: High-density aerospace Bento blueprint matrix showcasing material specs, velocity metrics, drag ratings, and the Structural Integrity Matrix table.
- **05 / The Experience**: Interactive flight mission profile console with real-time HUD telemetry readouts.
- **Refined Brand Identity**: Custom vector aerospace emblem and wordmark (`skylance-logo.svg`).

---

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design System
- **Animation**: GSAP + ScrollTrigger (optimized with non-blocking video seek loop and `fastSeek` acceleration)
- **Icons**: Lucide React
- **Typography**: Space Grotesk (display), Inter (sans), JetBrains Mono (monospaced telemetry)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Sidspidy/sky-lance.git
cd sky-lance

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build

```bash
# Create optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Architecture & Asset Pipeline

```
frontend projects/
├── public/
│   └── assets/
│       ├── brand/           # Official SKY LANCE SVG vector logos
│       ├── images/          # High-resolution 3D drone renders
│       └── video/           # Optimized MP4 product films
├── src/
│   ├── components/          # Reusable UI components (Navbar, Footer, Video Stage)
│   ├── data/                # Centralized product content & specifications
│   ├── hooks/               # Custom React hooks (reduced motion, etc.)
│   ├── sections/            # Dedicated editorial page sections
│   ├── App.jsx              # Application root
│   ├── index.css            # Core design system tokens & glass utilities
│   └── main.jsx             # Entry point
```

---

## Creator & Author

**Sidhanathan** — Creative Frontend Engineer & Digital Art Director

- **Live Deployment**: [https://skylance.netlify.app/](https://skylance.netlify.app/)
- **GitHub**: [@Sidspidy](https://github.com/Sidspidy)
- **LinkedIn**: [Sidhanathan K](https://www.linkedin.com/in/sidhanathan-k-sid)
- **Direct Email**: [sidhart1010@gmail.com](mailto:sidhart1010@gmail.com)

---

## License

Created by Sidhanathan as an independent creative aerospace design study. All rights reserved.
