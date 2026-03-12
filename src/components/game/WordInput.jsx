import { useState } from "react";
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { GAME_STATUS } from "../../constants/gameConstants";
import { validateWord } from "../../utils/wordUtils";

const WordInput = ({ gameState, setGameState, settings }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { gameStatus, currentCard, history } = gameState;

  const isActive = gameStatus === GAME_STATUS.PLAYING;

  const handleWordChange = (e) => {
    setGameState((prev) => ({ ...prev, currentWord: e.target.value }));
  };

  const handleConfirm = () => {
    const cardConfig = settings.cards[currentCard];
    const result = validateWord(gameState.currentWord, cardConfig, history);

    if (!result.valid) {
      setErrorMessage(result.message);
      return;
    }

    setErrorMessage("");
    setGameState((prev) => ({
      ...prev,
      gameStatus: GAME_STATUS.ANSWERED,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
  };

  return (
    <Box mb={4}>
      <Stack direction="row">
        <Input
          placeholder="ひらがなで入力してください"
          value={gameState.currentWord}
          onChange={handleWordChange}
          onKeyDown={handleKeyDown}
          disabled={!isActive}
          fontSize="16px"
        />
        <Button onClick={handleConfirm} disabled={!isActive}>
          確定
        </Button>
      </Stack>
      {errorMessage && (
        <Text color="red.500" fontSize="sm" mt={1}>
          {errorMessage}
        </Text>
      )}
    </Box>
  );
};

export default WordInput;
