import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@chakra-ui/react";
import { LOCAL_STORAGE_KEYS } from "../../constants/gameConstants";

const SettingsActions = ({ settings, onReset }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    navigate("/game");
  };

  return (
    <Stack direction="row" justify="space-between">
      <Button variant="outline" onClick={onReset}>
        デフォルトに戻す
      </Button>
      <Button onClick={handleStart}>ゲーム開始</Button>
    </Stack>
  );
};

export default SettingsActions;
