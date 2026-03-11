import { Button, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GAME_STATUS } from "../../constants/gameConstants";

const GameActions = () => {
  const navigate = useNavigate();

  const handleReplay = () => {
    window.location.reload();
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleTitle = () => {
    navigate("/");
  };

  return (
    <Stack direction="column" gap={4}>
      <Button onClick={handleReplay}>リプレイ</Button>
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
