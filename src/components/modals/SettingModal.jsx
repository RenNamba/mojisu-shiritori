import { Box, Heading, IconButton } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import { GAME_STATUS } from "../../constants/gameConstants";
import GameActions from "../common/GameActions";

const SettingModal = ({ gameState, setGameState }) => {
  if (gameState.gameStatus !== GAME_STATUS.SETTING) return null;

  const handleClose = () => {
    setGameState((prev) => ({
      ...prev,
      gameStatus: GAME_STATUS.PLAYING,
    }));
  };

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
        <Heading size="md" mb={6} textAlign="center">
          メニュー
        </Heading>
        <GameActions setGameState={setGameState} />
      </Box>
    </Box>
  );
};

export default SettingModal;
