import { describe, it, expect, vi, beforeEach } from "vitest";
import { loadSettings } from "../settingsUtils";
import { DEFAULT_SETTINGS } from "../../constants/defaults";

describe("loadSettings", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "localStorage",
      (() => {
        const store = {};
        return {
          getItem: vi.fn((key) => store[key] ?? null),
          setItem: vi.fn((key, val) => {
            store[key] = val;
          }),
        };
      })(),
    );
  });

  it("localStorage にデータなし → DEFAULT_SETTINGS を返す", () => {
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it("localStorage に有効な JSON → パースして返す", () => {
    const custom = { gameTime: 600 };
    localStorage.getItem.mockReturnValue(JSON.stringify(custom));
    expect(loadSettings()).toEqual(custom);
  });

  it("localStorage に壊れた JSON → DEFAULT_SETTINGS を返す", () => {
    localStorage.getItem.mockReturnValue("{invalid json}");
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });
});
