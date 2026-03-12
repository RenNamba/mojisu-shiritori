import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GAME_STATUS, END_REASON, PLAYER } from "../../constants/gameConstants";
import ModalOverlay from "./ModalOverlay";

const GAME_END_MESSAGES = {
  [END_REASON.TIMEOUT]: "時間切れ！",
  [END_REASON.N_ENDING]: "「ん」で終わった！",
};

const GameEndModal = ({ gameState, settings }) => {
  const navigate = useNavigate();
  const { gameStatus, endReason, currentPlayer, timers } = gameState;

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
    <ModalOverlay flexDirection="column">
      <Text fontSize="4xl" fontWeight="bold" color="white" textAlign="center">
        {GAME_END_MESSAGES[endReason]}
      </Text>
      <Text fontSize="4xl" fontWeight="bold" color="white" textAlign="center">
        ゲーム終了！
      </Text>
    </ModalOverlay>
  );
};

export default GameEndModal;
