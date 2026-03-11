import PlayAreaInfo from "./PlayAreaInfo";
import PlayAreaAnswered from "./PlayAreaAnswered";
import { GAME_STATUS } from "../../constants/gameConstants";

const PlayArea = ({ gameState, setGameState, settings }) => {
  const isAnswered =
    gameState.gameStatus === GAME_STATUS.ANSWERED ||
    gameState.gameStatus === GAME_STATUS.DELIBERATION;

  return (
    <>
      <PlayAreaInfo gameState={gameState} settings={settings} />
      {isAnswered && (
        <PlayAreaAnswered
          gameState={gameState}
          setGameState={setGameState}
          settings={settings}
        />
      )}
    </>
  );
};

export default PlayArea;
