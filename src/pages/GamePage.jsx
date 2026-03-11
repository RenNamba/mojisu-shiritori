import { useState } from "react";
import { Box, IconButton, Stack } from "@chakra-ui/react";
import { LuSettings } from "react-icons/lu";

import PlayerTimer from "../components/game/PlayerTimer";
import PlayArea from "../components/game/PlayArea";
import WordInput from "../components/game/WordInput";
import HistoryList from "../components/common/HistoryList";
import CountdownModal from "../components/modals/CountdownModal";
import DeliberationModal from "../components/modals/DeliberationModal";
import SettingModal from "../components/modals/SettingModal";
import GameEndModal from "../components/modals/GameEndModal";

import { DEFAULT_SETTINGS, INITIAL_GAME_STATE } from "../constants/defaults";
import {
  LOCAL_STORAGE_KEYS,
  GAME_STATUS,
  PLAYER,
  END_REASON,
} from "../constants/gameConstants";
import { useInterval } from "../hooks/useInterval";

const GamePage = () => {
  // 設定をLocalStorageから読み込む
  const [settings] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  // ゲーム状態
  const [gameState, setGameState] = useState({
    ...INITIAL_GAME_STATE,
    currentPlayer: settings.firstPlayer,
    timers: {
      A: settings.gameTime,
      B: settings.gameTime,
    },
  });

  // タイマー処理
  useInterval(gameState.gameStatus, () => {
    setGameState((prev) => {
      const newTime = prev.timers[prev.currentPlayer] - 1;
      // 時間切れ判定
      if (newTime <= 0) {
        return {
          ...prev,
          timers: { ...prev.timers, [prev.currentPlayer]: 0 },
          gameStatus: GAME_STATUS.FINISHED,
          endReason: END_REASON.TIMEOUT,
        };
      }
      return {
        ...prev,
        timers: { ...prev.timers, [prev.currentPlayer]: newTime },
      };
    });
  });

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <Box display="flex" justifyContent="flex-end">
        <IconButton
          variant="ghost"
          onClick={() =>
            setGameState((prev) => ({
              ...prev,
              gameStatus: GAME_STATUS.SETTING,
            }))
          }
        >
          <LuSettings />
        </IconButton>
      </Box>
      <Stack direction="row" justify="space-between" align="center" mb={4}>
        <PlayerTimer
          name={settings.players.A.name}
          time={gameState.timers.A}
          isActive={gameState.currentPlayer === PLAYER.A}
        />
        <PlayerTimer
          name={settings.players.B.name}
          time={gameState.timers.B}
          isActive={gameState.currentPlayer === PLAYER.B}
        />
      </Stack>
      <PlayArea
        gameState={gameState}
        setGameState={setGameState}
        settings={settings}
      />
      <WordInput
        gameState={gameState}
        setGameState={setGameState}
        settings={settings}
      />
      <HistoryList history={gameState.history} settings={settings} />

      {/* 以下はモーダルウィンドウ */}
      <CountdownModal
        gameState={gameState}
        setGameState={setGameState}
        settings={settings}
      />
      <DeliberationModal
        gameState={gameState}
        setGameState={setGameState}
        settings={settings}
      />
      <SettingModal gameState={gameState} setGameState={setGameState} />
      <GameEndModal gameState={gameState} settings={settings} />
    </Box>
  );
};

export default GamePage;
