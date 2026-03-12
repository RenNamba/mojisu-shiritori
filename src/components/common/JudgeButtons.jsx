import { Button, Stack } from "@chakra-ui/react";
import { GAME_STATUS, PLAYER, END_REASON } from "../../constants/gameConstants";
import { drawCard } from "../../utils/gameUtils";

const JudgeButtons = ({
  gameState,
  setGameState,
  settings,
  showDeliberation = true,
}) => {
  const { currentWord, currentPlayer, history } = gameState;

  const nextPlayer = currentPlayer === PLAYER.A ? PLAYER.B : PLAYER.A;

  const handleValid = () => {
    // 「ん」で終わる単語かどうかを判定
    const isNEnding = currentWord.endsWith("ん");
    const newHistory = [
      ...history,
      { id: crypto.randomUUID(), player: currentPlayer, word: currentWord },
    ];

    if (isNEnding) {
      setGameState((prev) => ({
        ...prev,
        history: newHistory,
        gameStatus: GAME_STATUS.FINISHED,
        endReason: END_REASON.N_ENDING,
      }));
      return;
    }

    setGameState((prev) => ({
      ...prev,
      history: newHistory,
      currentPlayer: nextPlayer,
      currentCard: drawCard(settings.cards),
      currentWord: "",
      gameStatus: GAME_STATUS.PLAYING,
    }));
  };

  const handleInvalid = () => {
    setGameState((prev) => ({
      ...prev,
      currentWord: "",
      gameStatus: GAME_STATUS.PLAYING,
    }));
  };

  const handleDeliberation = () => {
    setGameState((prev) => ({
      ...prev,
      gameStatus: GAME_STATUS.DELIBERATION,
    }));
  };

  return (
    <Stack direction="row" justify="center" gap={4}>
      <Button bg="gray.900" color="white" _hover={{ bg: "gray.700" }} onClick={handleValid}>
        有効
      </Button>
      <Button bg="gray.900" color="white" _hover={{ bg: "gray.700" }} onClick={handleInvalid}>
        無効
      </Button>
      {showDeliberation && (
        <Button bg="gray.900" color="white" _hover={{ bg: "gray.700" }} onClick={handleDeliberation}>
          審議
        </Button>
      )}
    </Stack>
  );
};

export default JudgeButtons;
