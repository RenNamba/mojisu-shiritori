import {
  Box,
  Heading,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";

const MIN_MINUTES = 1;
const MAX_MINUTES = 30;

const gameTimeOptions = createListCollection({
  items: Array.from({ length: MAX_MINUTES - MIN_MINUTES + 1 }, (_, i) => ({
    label: MIN_MINUTES + i,
    value: (MIN_MINUTES + i) * 60, // ゲーム中では秒で管理するため変換する
  })),
});

const GameTimeSettings = ({ settings, setSettings }) => {
  const handleGameTimeChange = (value) => {
    setSettings((prev) => ({
      ...prev,
      gameTime: value,
    }));
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        ゲーム時間設定
      </Heading>
      <Stack direction="row" align="center">
        <SelectRoot
          collection={gameTimeOptions}
          value={[settings.gameTime]}
          onValueChange={(e) => handleGameTimeChange(Number(e.value[0]))}
          width="120px"
        >
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
          <SelectContent>
            {gameTimeOptions.items.map((option) => (
              <SelectItem key={option.value} item={option}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <Text>分</Text>
      </Stack>
    </Box>
  );
};

export default GameTimeSettings;
