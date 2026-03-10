import { Box, Heading, Input, Stack, Text } from "@chakra-ui/react";

const MIN_MINUTES = 1;
const MAX_MINUTES = 30;

const GameTimeSettings = ({ settings, setSettings }) => {
  // ゲーム時間の変更を処理する関数
  // ゲーム時間は分単位で入力されるため、秒に変換して保存する
  const handleGameTimeChange = (e) => {
    const minutes = Number(e.target.value);
    if (minutes < MIN_MINUTES || minutes > MAX_MINUTES) return;
    setSettings((prev) => ({
      ...prev,
      gameTime: minutes * 60,
    }));
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        ゲーム時間設定
      </Heading>
      <Stack direction="row" align="center">
        <Input
          type="number"
          min={MIN_MINUTES}
          max={MAX_MINUTES}
          value={settings.gameTime / 60}
          onChange={handleGameTimeChange}
          width="100px"
        />
        <Text>分</Text>
      </Stack>
    </Box>
  );
};

export default GameTimeSettings;
