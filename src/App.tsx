import { GameProvider, useGame } from './context/GameContext';
import { LandingScreen } from './components/LandingScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { CompleteScreen } from './components/CompleteScreen';

function GameContent() {
  const { gameStatus } = useGame();

  switch (gameStatus) {
    case 'landing':
      return <LandingScreen />;
    case 'playing':
      return <QuestionScreen />;
    case 'waiting':
      return <LoadingScreen />;
    case 'final':
      return <QuestionScreen />;
    case 'complete':
      return <CompleteScreen />;
    default:
      return <LandingScreen />;
  }
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
