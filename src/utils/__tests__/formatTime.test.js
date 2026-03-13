import { describe, it, expect } from "vitest";
import { formatTime } from "../formatTime";

describe("formatTime", () => {
  it("0秒 → 00:00", () => {
    expect(formatTime(0)).toBe("00:00");
  });

  it("59秒 → 00:59（分の境界直前）", () => {
    expect(formatTime(59)).toBe("00:59");
  });

  it("60秒 → 01:00（ちょうど1分）", () => {
    expect(formatTime(60)).toBe("01:00");
  });

  it("61秒 → 01:01（1分の境界直後）", () => {
    expect(formatTime(61)).toBe("01:01");
  });

  it("300秒 → 05:00（デフォルトゲーム時間）", () => {
    expect(formatTime(300)).toBe("05:00");
  });

  it("599秒 → 09:59（2桁分の境界直前）", () => {
    expect(formatTime(599)).toBe("09:59");
  });

  it("600秒 → 10:00（2桁分）", () => {
    expect(formatTime(600)).toBe("10:00");
  });
});
