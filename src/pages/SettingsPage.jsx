import { useState } from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";

import PlayerSettings from "../components/settings/PlayerSettings";
import GameTimeSettings from "../components/settings/GameTimeSettings";
import CardSettings from "../components/settings/CardSettings";
import SettingsActions from "../components/settings/SettingsActions";
import { DEFAULT_SETTINGS } from "../constants/defaults";
import { loadSettings } from "../utils/settingsUtils";

const SettingsPage = () => {
  // 初期設定はローカルストレージから読み込む。なければデフォルト設定を使用
  const [settings, setSettings] = useState(loadSettings);

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <Box maxW="600px" mx="auto" p={6}>
      <Heading mb={6}>設定</Heading>
      <VStack gap={6} align="stretch">
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <PlayerSettings settings={settings} setSettings={setSettings} />
        </Box>
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <GameTimeSettings settings={settings} setSettings={setSettings} />
        </Box>
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <CardSettings settings={settings} setSettings={setSettings} />
        </Box>
        <SettingsActions settings={settings} onReset={handleReset} />
      </VStack>
    </Box>
  );
};

export default SettingsPage;
