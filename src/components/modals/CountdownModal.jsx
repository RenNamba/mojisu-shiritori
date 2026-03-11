import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GAME_STATUS } from "../../constants/gameConstants";
import { drawCard } from "../../utils/gameUtils";

const CountdownModal = ({ gameState, setGameState, settings }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (gameState.gameStatus !== GAME_STATUS.COUNTDOWN) return;

    // カウントダウン終了後にゲーム開始
    // カウントが0の時にスタートが表示されるので、-1になったらゲーム開始とする
    if (count === -1) {
      setGameState((prev) => ({
        ...prev,
        gameStatus: GAME_STATUS.PLAYING,
        currentCard: drawCard(settings.cards),
      }));
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, gameState.gameStatus, setGameState, settings.cards]);

  if (gameState.gameStatus !== GAME_STATUS.COUNTDOWN) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.700"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1000}
    >
      <Text fontSize="5xl" fontWeight="bold" color="white">
        {count <= 0 ? "スタート！" : count}
      </Text>
    </Box>
  );
};

export default CountdownModal;
