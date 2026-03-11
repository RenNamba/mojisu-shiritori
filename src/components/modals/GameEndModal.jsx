import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GAME_STATUS, END_REASON, PLAYER } from "../../constants/gameConstants";

const GAME_END_MESSAGES = {
  [END_REASON.TIMEOUT]: (winner) => `時間切れ！${winner}の勝利！`,
  [END_REASON.N_ENDING]: (winner) => `「ん」で終わった！${winner}の勝利！`,
};

const GameEndModal = ({ gameState, settings }) => {
  const navigate = useNavigate();
  const { gameStatus, endReason, currentPlayer, timers } = gameState;

  // 勝者は時間切れの場合は相手プレイヤー、「ん」終わりの場合も相手プレイヤー
  const loser = currentPlayer;
  const winner = loser === PLAYER.A ? PLAYER.B : PLAYER.A;
  const winnerName = settings.players[winner].name;

  useEffect(() => {
    if (gameStatus !== GAME_STATUS.FINISHED) return;

    const timer = setTimeout(() => {
      navigate("/result", {
        state: {
          winnerName,
          timers,
          history: gameState.history,
          settings,
        },
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [gameStatus, gameState.history, navigate, settings, timers, winnerName]);

  if (gameStatus !== GAME_STATUS.FINISHED) return null;

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
      <Text fontSize="4xl" fontWeight="bold" color="white" textAlign="center">
        {GAME_END_MESSAGES[endReason]?.(winnerName)}
      </Text>
    </Box>
  );
};

export default GameEndModal;
