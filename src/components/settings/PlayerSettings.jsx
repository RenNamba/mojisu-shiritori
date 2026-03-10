import {
  Box,
  Heading,
  Input,
  Stack,
  createListCollection,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";
import { PLAYER } from "../../constants/gameConstants";

const PlayerSettings = ({ settings, setSettings }) => {
  // プレイヤー名の変更を処理する関数
  const handleNameChange = (player, name) => {
    setSettings((prev) => ({
      ...prev,
      players: {
        ...prev.players,
        [player]: { name },
      },
    }));
  };

  // 先攻プレイヤーの変更を処理する関数
  const handleFirstPlayerChange = (value) => {
    setSettings((prev) => ({
      ...prev,
      firstPlayer: value,
    }));
  };

  // 先攻プレイヤーの選択肢をプレイヤー名から生成
  const options = createListCollection({
    items: [
      { label: settings.players.A.name, value: PLAYER.A },
      { label: settings.players.B.name, value: PLAYER.B },
    ],
  });

  return (
    <Box>
      <Heading size="md" mb={4}>
        プレイヤー設定
      </Heading>
      <Stack gap={2}>
        <Input
          placeholder="プレイヤーA"
          value={settings.players.A.name}
          onChange={(e) => handleNameChange(PLAYER.A, e.target.value)}
        />
        <Input
          placeholder="プレイヤーB"
          value={settings.players.B.name}
          onChange={(e) => handleNameChange(PLAYER.B, e.target.value)}
        />
        <SelectRoot
          collection={options}
          value={[settings.firstPlayer]}
          onValueChange={(e) => handleFirstPlayerChange(e.value[0])}
        >
          <Stack direction="row" align="center">
            <SelectLabel mb={0}>先攻プレイヤー</SelectLabel>
            <SelectTrigger width="200px">
              <SelectValueText placeholder="先攻を選択" />
            </SelectTrigger>
          </Stack>
          <SelectContent>
            {options.items.map((option) => (
              <SelectItem key={option.value} item={option}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Stack>
    </Box>
  );
};

export default PlayerSettings;
