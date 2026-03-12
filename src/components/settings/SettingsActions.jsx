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
      <Button bg="gray.900" color="white" _hover={{ bg: "gray.700" }} onClick={handleStart}>ゲームスタート</Button>
    </Stack>
  );
};

export default SettingsActions;
