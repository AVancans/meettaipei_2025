# 🤖 ARE YOU AI? - Interactive Quiz Game

A fun, interactive quiz game designed for the Meet Taipei expo. Players answer 6 questions to determine if they're AI or human, with a hilarious twist at the end!

## ✨ Features

- **6 Engaging Questions**: Test your ability to spot AI-generated images
- **Secret Camera Capture**: Automatically takes a selfie when the game starts
- **AI Meme Generation**: Uses NanoBanana to create a funny AI-generated image of the player
- **Interactive Final Question**: The AI button dodges and splits when clicked (try to catch it!)
- **Game Show Aesthetic**: Vibrant neobrutalism design with animations, confetti, and effects
- **Tablet-Optimized**: Designed for landscape orientation on tablets

## 🎮 How It Works

1. Player clicks "Start Game" → secretly captures their photo
2. While they answer questions 1-5, NanoBanana generates an AI meme (e.g., player riding an alpaca)
3. Question 6 shows their AI-generated image
4. If they try to click "AI", the button jumps away and splits!
5. Clicking "Real" reveals they're (probably) human with a big celebration

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- NanoBanana API access

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd meettaipei_2025
```

2. Install dependencies:
```bash
npm install
```

3. Configure NanoBanana API:
```bash
cp .env.example .env
```

Edit `.env` and add your NanoBanana API credentials:
```
VITE_NANOBANANA_API_URL=https://api.nanobanana.dev/v1/generate
VITE_NANOBANANA_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to the URL shown (usually `http://localhost:5173`)

## 🎨 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Canvas Confetti** - Party effects
- **Three.js** - 3D effects (optional)
- **Lottie React** - JSON animations

## 📱 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deploy to Netlify/Vercel

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in the hosting platform's settings

## 🎯 Customization

### Changing Questions

Edit `src/data/questions.ts` to modify the questions and images.

### Adjusting AI Meme Prompts

Edit the `AI_MEME_PRESETS` array in `src/data/questions.ts` to add more creative prompts.

### Styling

The design uses a neobrutalism style with:
- Bold borders (brutal-border)
- Heavy shadows (brutal-shadow)
- Vibrant neon colors
- Custom animations

Edit `tailwind.config.js` and `src/index.css` to adjust the theme.

## 🎮 Controls

- **Mouse/Touch**: Click buttons to answer questions
- **Camera Permission**: Required on game start for the final surprise

## 🐛 Troubleshooting

### Camera not working
- Make sure you're using HTTPS (required for camera access)
- Check browser permissions
- Try a different browser (Chrome/Safari recommended)

### NanoBanana API errors
- Verify your API key is correct
- Check the API endpoint URL
- Review browser console for error messages

### Development mode fallback
In development mode, if NanoBanana fails, it will use the original photo as a fallback.

## 📄 License

This project is created for the Meet Taipei expo demonstration.

## 🙏 Credits

- NanoBanana API for AI image generation
- Unsplash for sample images
- Framer Motion for smooth animations

## 🎉 Have Fun!

Enjoy the game and watch people's reactions when they try to click the AI button! 😄
