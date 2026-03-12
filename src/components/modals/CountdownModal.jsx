import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GAME_STATUS } from "../../constants/gameConstants";
import { drawCard } from "../../utils/gameUtils";
import ModalOverlay from "./ModalOverlay";

const CountdownModal = ({ gameState, setGameState, settings }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (gameState.gameStatus !== GAME_STATUS.COUNTDOWN) return;

    if (count === 0) {
      // 「スタート！」を1秒表示してからゲーム開始
      const timer = setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          gameStatus: GAME_STATUS.PLAYING,
          currentCard: drawCard(settings.cards),
        }));
      }, 1000);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, gameState.gameStatus, setGameState, settings.cards]);

  if (gameState.gameStatus !== GAME_STATUS.COUNTDOWN) return null;

  return (
    <ModalOverlay>
      <Text fontSize="5xl" fontWeight="bold" color="white">
        {count === 0 ? "スタート！" : count}
      </Text>
    </ModalOverlay>
  );
};

export default CountdownModal;
