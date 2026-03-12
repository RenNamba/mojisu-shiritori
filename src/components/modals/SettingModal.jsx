import { Box, Heading } from "@chakra-ui/react";
import { GAME_STATUS } from "../../constants/gameConstants";
import GameActions from "../common/GameActions";
import ModalOverlay from "./ModalOverlay";
import { CloseButton } from "../ui/close-button";

const SettingModal = ({ gameState, setGameState }) => {
  if (gameState.gameStatus !== GAME_STATUS.SETTING) return null;

  const handleClose = () => {
    setGameState((prev) => ({
      ...prev,
      gameStatus: GAME_STATUS.PLAYING,
    }));
  };

  return (
    <ModalOverlay>
      <Box bg="white" shadow="lg" borderRadius="2xl" p={8} minW="300px" position="relative">
        <CloseButton position="absolute" top={2} right={2} size="sm" onClick={handleClose} />
        <Heading size="md" mb={6} textAlign="center">
          メニュー
        </Heading>
        <GameActions setGameState={setGameState} />
      </Box>
    </ModalOverlay>
  );
};

export default SettingModal;
