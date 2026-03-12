import { Box, Button, Heading, IconButton, Text } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import { GAME_STATUS } from "../../constants/gameConstants";
import JudgeButtons from "../common/JudgeButtons";
import HistoryList from "../common/HistoryList";
import ModalOverlay from "./ModalOverlay";

const DeliberationModal = ({ gameState, setGameState, settings }) => {
  if (gameState.gameStatus !== GAME_STATUS.DELIBERATION) return null;

  const handleClose = () => {
    setGameState((prev) => ({
      ...prev,
      gameStatus: GAME_STATUS.ANSWERED,
    }));
  };

  const handleSearch = () => {
    window.open(
      `https://www.google.com/search?q=${gameState.currentWord}`,
      "_blank",
    );
  };

  return (
    <ModalOverlay>
      <Box bg="white" borderRadius="lg" p={8} minW="300px" position="relative">
        <IconButton
          position="absolute"
          top={2}
          right={2}
          variant="ghost"
          size="sm"
          onClick={handleClose}
        >
          <LuX />
        </IconButton>
        <Heading size="md" mb={4} textAlign="center">
          審議
        </Heading>
        <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
          {gameState.currentWord}
        </Text>
        <Button width="100%" mb={4} onClick={handleSearch}>
          Googleで検索
        </Button>
        <JudgeButtons
          gameState={gameState}
          setGameState={setGameState}
          settings={settings}
          showDeliberation={false} // 審議ボタンは非表示
        />
        <Box mt={4}>
          <HistoryList history={gameState.history} settings={settings} />
        </Box>
      </Box>
    </ModalOverlay>
  );
};

export default DeliberationModal;
