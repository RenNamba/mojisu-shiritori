import { describe, it, expect } from "vitest";
import { getHeadChar, validateWord, isNEnding } from "../wordUtils";
import { CONDITION_TYPE } from "../../constants/gameConstants";

describe("getHeadChar", () => {
  it("履歴が空のとき「り」を返す", () => {
    expect(getHeadChar([])).toBe("り");
  });

  it("通常の文字で終わる単語 → 最後の文字を返す", () => {
    expect(getHeadChar([{ word: "りんご" }])).toBe("ご");
  });

  it("小文字「ょ」で終わる → 大文字「よ」に変換", () => {
    expect(getHeadChar([{ word: "きんぎょ" }])).toBe("よ");
  });

  it("小文字「っ」で終わる → 大文字「つ」に変換", () => {
    expect(getHeadChar([{ word: "りらっ" }])).toBe("つ");
  });

  it("長音符「ー」で終わる → 一文字前を返す", () => {
    expect(getHeadChar([{ word: "こーひー" }])).toBe("ひ");
  });

  it("複数履歴 → 最後の単語のみ使用", () => {
    expect(getHeadChar([{ word: "りんご" }, { word: "ごま" }])).toBe("ま");
  });

  it("小文字の前に長音符がある単語 → 小文字を大文字に変換", () => {
    expect(getHeadChar([{ word: "りゅー" }])).toBe("ゆ");
  });
});

describe("validateWord", () => {
  const exactCard = { conditionType: CONDITION_TYPE.EXACT, value: 3 };
  const minCard = { conditionType: CONDITION_TYPE.MIN, value: 3 };
  const rangeCard = { conditionType: CONDITION_TYPE.RANGE, min: 2, max: 4 };
  const history = [{ word: "りんご" }]; // 頭文字は「ご」

  // --- 文字種バリデーション ---

  it("空文字 → エラー", () => {
    expect(validateWord("", exactCard, []).valid).toBe(false);
  });

  it("カタカナ含む → エラー", () => {
    expect(validateWord("リんご", exactCard, []).valid).toBe(false);
  });

  it("英字含む → エラー", () => {
    expect(validateWord("aりんご", exactCard, []).valid).toBe(false);
  });

  // --- exact 条件の境界値 ---

  it("exact(3): ちょうど3文字 → OK", () => {
    expect(validateWord("ごはん", exactCard, history).valid).toBe(true);
  });

  it("exact(3): 2文字（1少ない） → エラー", () => {
    expect(validateWord("ごま", exactCard, history).valid).toBe(false);
  });

  it("exact(3): 4文字（1多い） → エラー", () => {
    expect(validateWord("ごぼうす", exactCard, history).valid).toBe(false);
  });

  // --- min 条件の境界値 ---

  it("min(3): ちょうど3文字（境界値） → OK", () => {
    expect(validateWord("ごはん", minCard, history).valid).toBe(true);
  });

  it("min(3): 4文字（境界値+1） → OK", () => {
    expect(validateWord("ごぼうす", minCard, history).valid).toBe(true);
  });

  it("min(3): 2文字（境界値-1） → エラー", () => {
    expect(validateWord("ごま", minCard, history).valid).toBe(false);
  });

  // --- range 条件の境界値 ---

  it("range(2-4): 2文字（下限ちょうど） → OK", () => {
    expect(validateWord("ごま", rangeCard, history).valid).toBe(true);
  });

  it("range(2-4): 4文字（上限ちょうど） → OK", () => {
    expect(validateWord("ごぼうす", rangeCard, history).valid).toBe(true);
  });

  it("range(2-4): 3文字（範囲内中央） → OK", () => {
    expect(validateWord("ごはん", rangeCard, history).valid).toBe(true);
  });

  it("range(2-4): 1文字（下限-1） → エラー", () => {
    expect(validateWord("ご", rangeCard, history).valid).toBe(false);
  });

  it("range(2-4): 5文字（上限+1） → エラー", () => {
    expect(validateWord("ごぼうさん", rangeCard, history).valid).toBe(false);
  });

  // --- 頭文字チェック ---

  it("頭文字不一致 → エラー", () => {
    expect(validateWord("りんご", exactCard, history).valid).toBe(false);
  });

  // --- 長音符 ---

  it("長音符を含む単語が正常に通る", () => {
    const card = { conditionType: CONDITION_TYPE.EXACT, value: 4 };
    expect(validateWord("ごーるど", card, history).valid).toBe(true);
  });
});

describe("isNEnding", () => {
  it("「ん」で終わる → true", () => {
    expect(isNEnding("ごはん")).toBe(true);
  });

  it("「ん」で終わらない → false", () => {
    expect(isNEnding("りんご")).toBe(false);
  });
});
