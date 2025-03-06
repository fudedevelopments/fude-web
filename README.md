# Fude Development – AI-Powered Software Solutions

A cutting-edge, professional, and visually stunning portfolio website for Fude Development, a company specializing in website development, Android apps, and AI-powered solutions. The website features a 3D modern UI/UX design with sleek animations, futuristic components, and an interactive experience.

## Features

- **3D Aesthetic & Animations**: Using Three.js and React Three Fiber for immersive 3D elements
- **Responsive Design**: Fully responsive across all device sizes
- **Modern UI/UX**: Sleek, futuristic design with glassmorphism effects
- **Interactive Elements**: Hover effects, animations, and interactive 3D models
- **Dark Mode**: Neon accents and dark theme for a futuristic look
- **AI Chatbot**: Interactive chatbot for user engagement

## Tech Stack

- **Framework**: Next.js 14
- **3D Graphics**: Three.js / React Three Fiber (R3F)
- **Animations**: Framer Motion / GSAP
- **Styling**: Tailwind CSS
- **Typewriter Effect**: For dynamic typing in the hero section

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fude-web.git
cd fude-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `src/app`: Next.js app router files
- `src/components/3d`: 3D components using Three.js/R3F
- `src/components/ui`: UI components like Navbar, Footer, etc.
- `src/components/sections`: Main page sections (Hero, Services, etc.)
- `public`: Static assets

## Customization

- **Colors**: Edit the CSS variables in `src/app/globals.css`
- **Content**: Update the text and images in the section components
- **3D Models**: Replace or modify the 3D models in the `src/components/3d` directory

## Deployment

This project can be deployed on any platform that supports Next.js, such as Vercel, Netlify, or Cloudflare Pages.

```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/)
