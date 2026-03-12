import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@chakra-ui/react";

const GameActions = () => {
  const navigate = useNavigate();

  const handleReplay = () => {
    window.location.href = "/game";
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleTitle = () => {
    navigate("/");
  };

  return (
    <Stack direction="column" gap={4}>
      <Button bg="gray.900" color="white" _hover={{ bg: "gray.700" }} onClick={handleReplay}>リプレイ</Button>
      <Button variant="outline" onClick={handleSettings}>
        設定変更
      </Button>
      <Button variant="outline" onClick={handleTitle}>
        タイトルへ
      </Button>
    </Stack>
  );
};

export default GameActions;
