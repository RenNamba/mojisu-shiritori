import { CONDITION_TYPE } from "../constants/gameConstants";

// 小文字→大文字変換マップ
const SMALL_TO_LARGE = {
  ぁ: "あ",
  ぃ: "い",
  ぅ: "う",
  ぇ: "え",
  ぉ: "お",
  っ: "つ",
  ゃ: "や",
  ゅ: "ゆ",
  ょ: "よ",
};

// 頭文字を取得する
export const getHeadChar = (history) => {
  if (history.length === 0) return "り";
  const lastWord = history[history.length - 1].word;
  let char = lastWord[lastWord.length - 1];
  if (char === "ー") char = lastWord[lastWord.length - 2];
  return SMALL_TO_LARGE[char] ?? char;
};

// 単語のバリデーション
export const validateWord = (word, cardConfig, history) => {
  // 1. 空文字チェック
  if (word.length === 0) {
    return { valid: false, message: "文字を入力してください" };
  }

  // 2. ひらがなチェック
  if (!/^[\u3041-\u3096ー]+$/.test(word)) {
    return { valid: false, message: "ひらがなで入力してください" };
  }

  // 3. 文字数チェック
  const len = word.length;
  if (cardConfig.conditionType === CONDITION_TYPE.EXACT) {
    if (len !== cardConfig.value) {
      return {
        valid: false,
        message: `${cardConfig.value}文字で入力してください`,
      };
    }
  } else if (cardConfig.conditionType === CONDITION_TYPE.RANGE) {
    if (len < cardConfig.min || len > cardConfig.max) {
      return {
        valid: false,
        message: `${cardConfig.min}〜${cardConfig.max}文字で入力してください`,
      };
    }
  } else if (cardConfig.conditionType === CONDITION_TYPE.MIN) {
    if (len < cardConfig.value) {
      return {
        valid: false,
        message: `${cardConfig.value}文字以上で入力してください`,
      };
    }
  }

  // 4. 頭文字チェック
  const headChar = getHeadChar(history);
  if (word[0] !== headChar) {
    return {
      valid: false,
      message: `「${headChar}」から始まる単語を入力してください`,
    };
  }

  return { valid: true, message: "" };
};

// 単語が「ん」で終わるかどうかを判定する
export const isNEnding = (word) => word.endsWith("ん");
