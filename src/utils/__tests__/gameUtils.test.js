import { describe, it, expect, vi } from "vitest";
import { drawCard } from "../gameUtils";
import { CARD_ORDER } from "../../constants/cards";

describe("drawCard", () => {
  it("有効カードのキーのみが返される", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const cards = Object.fromEntries(
      CARD_ORDER.map((key) => [key, { enabled: key === "c3" }]),
    );
    expect(drawCard(cards)).toBe("c3");
    vi.restoreAllMocks();
  });

  it("無効カード（enabled: false）は選ばれない", () => {
    const cards = Object.fromEntries(
      CARD_ORDER.map((key) => [
        key,
        { enabled: key === "c5" || key === "c7" },
      ]),
    );
    for (let i = 0; i < 50; i++) {
      const result = drawCard(cards);
      expect(["c5", "c7"]).toContain(result);
    }
  });

  it("全カード有効時に有効なキーが返る", () => {
    const cards = Object.fromEntries(
      CARD_ORDER.map((key) => [key, { enabled: true }]),
    );
    const result = drawCard(cards);
    expect(CARD_ORDER).toContain(result);
  });
});
