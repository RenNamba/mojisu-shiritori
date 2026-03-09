import {
  GAME_STATUS,
  CONDITION_TYPE,
  PLAYER,
  DEFAULT_GAME_TIME,
} from "./gameConstants";

export const DEFAULT_SETTINGS = {
  players: {
    A: { name: "プレイヤーA" },
    B: { name: "プレイヤーB" },
  },
  firstPlayer: PLAYER.A,
  gameTime: DEFAULT_GAME_TIME,
  cards: {
    c2: {
      enabled: true,
      conditionType: CONDITION_TYPE.EXACT,
      value: 2,
      min: null,
      max: null,
    },
    c3: {
      enabled: true,
      conditionType: CONDITION_TYPE.EXACT,
      value: 3,
      min: null,
      max: null,
    },
    c4: {
      enabled: true,
      conditionType: CONDITION_TYPE.EXACT,
      value: 4,
      min: null,
      max: null,
    },
    c5: {
      enabled: true,
      conditionType: CONDITION_TYPE.EXACT,
      value: 5,
      min: null,
      max: null,
    },
    c6: {
      enabled: true,
      conditionType: CONDITION_TYPE.EXACT,
      value: 6,
      min: null,
      max: null,
    },
    c7: {
      enabled: true,
      conditionType: CONDITION_TYPE.EXACT,
      value: 7,
      min: null,
      max: null,
    },
    c8: {
      enabled: true,
      conditionType: CONDITION_TYPE.EXACT,
      value: 8,
      min: null,
      max: null,
    },
    c9: {
      enabled: true,
      conditionType: CONDITION_TYPE.EXACT,
      value: 9,
      min: null,
      max: null,
    },
    c10: {
      enabled: true,
      conditionType: CONDITION_TYPE.EXACT,
      value: 10,
      min: null,
      max: null,
    },
    cJ: {
      enabled: true,
      conditionType: CONDITION_TYPE.MIN,
      value: 11,
      min: null,
      max: null,
    },
    cQ: {
      enabled: false,
      conditionType: CONDITION_TYPE.MIN,
      value: 12,
      min: null,
      max: null,
    },
    cK: {
      enabled: false,
      conditionType: CONDITION_TYPE.MIN,
      value: 13,
      min: null,
      max: null,
    },
  },
};

export const INITIAL_GAME_STATE = {
  gameStatus: GAME_STATUS.COUNTDOWN,
  currentPlayer: PLAYER.A,
  currentCard: null,
  timers: { A: DEFAULT_GAME_TIME, B: DEFAULT_GAME_TIME },
  currentWord: "",
  history: [],
  endReason: null,
};
