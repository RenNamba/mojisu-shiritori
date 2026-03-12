import { DEFAULT_SETTINGS } from "../constants/defaults";
import { LOCAL_STORAGE_KEYS } from "../constants/gameConstants";

// LocalStorageから設定を読み込む
// データが壊れていてJSON.parseが失敗した場合はデフォルト設定を返す
export const loadSettings = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};
