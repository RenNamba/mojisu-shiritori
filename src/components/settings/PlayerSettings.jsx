import {
  Box,
  Heading,
  Input,
  Stack,
  Text,
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
import { DEFAULT_SETTINGS } from "../../constants/defaults";

const MAX_PLAYER_NAME_LENGTH = 7;

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

  // プレイヤー名の入力が空になった場合や長すぎる場合に処理する関数
  const handleNameBlur = (player, name) => {
    if (name.length === 0) {
      handleNameChange(player, DEFAULT_SETTINGS.players[player].name);
    } else if (name.length > MAX_PLAYER_NAME_LENGTH) {
      handleNameChange(player, name.slice(0, MAX_PLAYER_NAME_LENGTH));
    }
  };

  // 先攻プレイヤーの変更を処理する関数
  const handleFirstPlayerChange = (value) => {
    setSettings((prev) => ({
      ...prev,
      firstPlayer: value,
    }));
  };

  // 先攻プレイヤーの選択肢を生成
  const options = createListCollection({
    items: [
      { label: DEFAULT_SETTINGS.players.A.name, value: PLAYER.A },
      { label: DEFAULT_SETTINGS.players.B.name, value: PLAYER.B },
    ],
  });

  return (
    <Box>
      <Heading size="md" mb={4}>
        プレイヤー設定
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={2}>
        {MAX_PLAYER_NAME_LENGTH}文字以内で入力してください。
      </Text>
      <Stack gap={2}>
        <Stack direction="row" align="center">
          <Text whiteSpace="nowrap" mr={2}>
            {DEFAULT_SETTINGS.players.A.name}
          </Text>
          <Input
            value={settings.players.A.name}
            onChange={(e) => handleNameChange(PLAYER.A, e.target.value)}
            onBlur={(e) => handleNameBlur(PLAYER.A, e.target.value)}
            fontSize="16px"
          />
        </Stack>
        <Stack direction="row" align="center">
          <Text whiteSpace="nowrap" mr={2}>
            {DEFAULT_SETTINGS.players.B.name}
          </Text>
          <Input
            value={settings.players.B.name}
            onChange={(e) => handleNameChange(PLAYER.B, e.target.value)}
            onBlur={(e) => handleNameBlur(PLAYER.B, e.target.value)}
            fontSize="16px"
          />
        </Stack>
        <SelectRoot
          collection={options}
          value={[settings.firstPlayer]}
          onValueChange={(e) => handleFirstPlayerChange(e.value[0])}
        >
          <Stack direction="row" align="center">
            <SelectLabel whiteSpace="nowrap" mr={2}>
              先攻
            </SelectLabel>
            <SelectTrigger width="200px">
              <SelectValueText />
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
