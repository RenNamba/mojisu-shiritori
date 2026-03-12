import { Box, Text } from "@chakra-ui/react";
import JudgeButtons from "../common/JudgeButtons";

const PlayAreaAnswered = ({ gameState, setGameState, settings }) => {
  const { currentWord } = gameState;

  return (
    <Box bg="white" shadow="sm" borderRadius="xl" p={4} mb={4}>
      <Text textAlign="center" fontSize="xl" fontWeight="bold" mb={4}>
        {currentWord}
      </Text>
      <JudgeButtons
        gameState={gameState}
        setGameState={setGameState}
        settings={settings}
      />
    </Box>
  );
};

export default PlayAreaAnswered;
