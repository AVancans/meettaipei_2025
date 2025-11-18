import { GameProvider, useGame } from './context/GameContext';
import { LandingScreen } from './components/LandingScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { CompleteScreen } from './components/CompleteScreen';
import { AnimatePresence, motion } from 'framer-motion';

function GameContent() {
  const { gameStatus } = useGame();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={gameStatus}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        {gameStatus === 'landing' && <LandingScreen />}
        {gameStatus === 'playing' && <QuestionScreen />}
        {gameStatus === 'waiting' && <LoadingScreen />}
        {gameStatus === 'final' && <QuestionScreen />}
        {gameStatus === 'complete' && <CompleteScreen />}
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <GameProvider>
      <div className="w-screen h-screen overflow-hidden">
        <GameContent />
      </div>
    </GameProvider>
  );
}

export default App;
