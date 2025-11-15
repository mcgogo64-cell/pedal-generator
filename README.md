# Pedal Generator Simulator

An interactive web application that simulates a pedal-powered generator, calculating energy output, battery restoration, calories burned, and average power based on user inputs.

## Features

- Real-time energy calculations (Wh and Joules)
- Battery capacity restoration percentage
- Calorie burn estimation based on MET (Metabolic Equivalent of Task)
- Average power output calculation
- Smooth animations using Framer Motion
- Dark mode support
- Responsive design

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React 19** - UI library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mcgogo64-cell/pedal-generator.git
cd pedal-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

Adjust the following inputs to see real-time calculations:

- **Pedal rotations**: Number of pedal rotations
- **User weight**: Weight in kilograms (30-200 kg)
- **Resistance level**: Exercise resistance (1-10)
- **Duration**: Exercise duration in seconds
- **Battery capacity**: Battery capacity in Watt-hours (Wh)

The app will automatically calculate:
- Energy output (Wh and Joules)
- Battery restoration percentage
- Calories burned
- Average power output (Watts)

## Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mcgogo64-cell/pedal-generator)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure everything
4. Click Deploy!

Vercel will automatically:
- Detect Next.js framework
- Optimize builds with SWC
- Enable image optimization
- Configure edge functions

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx         # Main page component
│   └── globals.css      # Global styles
├── components/
│   ├── InfoTooltip.tsx
│   ├── LanguageSelector.tsx
│   └── MotionProvider.tsx
├── lib/
│   └── translations.ts  # Multi-language support
├── public/              # Static assets
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── package.json
```

## License

This project is open source and available under the MIT License.
