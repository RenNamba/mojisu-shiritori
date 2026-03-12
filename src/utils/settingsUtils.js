import { DEFAULT_SETTINGS } from "../constants/defaults";
import { LOCAL_STORAGE_KEYS } from "../constants/gameConstants";

export const loadSettings = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};
