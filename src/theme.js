import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// グローバルスタイルの設定
const config = defineConfig({
  globalCss: {
    body: {
      bg: "gray.50",
      color: "gray.800",
    },
  },
});

export const system = createSystem(defaultConfig, config);
