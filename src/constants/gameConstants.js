// ゲームの状態
export const GAME_STATUS = {
  COUNTDOWN: "countdown",
  PLAYING: "playing",
  ANSWERED: "answered",
  DELIBERATION: "deliberation",
  SETTING: "setting",
  FINISHED: "finished",
};

// カードの文字数条件タイプ
export const CONDITION_TYPE = {
  EXACT: "exact",
  RANGE: "range",
  MIN: "min",
};

// プレイヤー識別子
export const PLAYER = {
  A: "A",
  B: "B",
};

// デフォルトゲーム時間（秒）
export const DEFAULT_GAME_TIME = 300;

// ローカルストレージキー
export const LOCAL_STORAGE_KEYS = {
  SETTINGS: "settings",
};
