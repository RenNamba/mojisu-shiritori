import { useState } from "react";
import { Box, Heading, Stack, IconButton } from "@chakra-ui/react";
import { Collapsible } from "@chakra-ui/react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

import CardSettingRow from "./CardSettingRow";
import { CARD_ORDER } from "../../constants/cards";

const CardSettings = ({ settings, setSettings }) => {
  // カード設定の開閉状態
  const [open, setOpen] = useState(false);

  // カード設定の変更をする関数
  const handleCardChange = (cardKey, newConfig) => {
    setSettings((prev) => ({
      ...prev,
      cards: {
        ...prev.cards,
        [cardKey]: newConfig,
      },
    }));
  };

  // 有効なカードの数をカウントする
  // 文字数条件数が1つしかない場合は無効にできないようにするために必要
  const enabledCount = Object.values(settings.cards).filter(
    (c) => c.enabled,
  ).length;

  return (
    <Box>
      <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Stack direction="row" align="center" justify="space-between">
          <Heading size="md">カード設定</Heading>
          <Collapsible.Trigger asChild>
            <IconButton variant="ghost" size="sm">
              {open ? <LuChevronUp /> : <LuChevronDown />}
            </IconButton>
          </Collapsible.Trigger>
        </Stack>
        <Collapsible.Content>
          <Stack spacing={2} mt={4}>
            {CARD_ORDER.map((cardKey) => (
              <CardSettingRow
                key={cardKey}
                cardKey={cardKey}
                config={settings.cards[cardKey]}
                onChange={handleCardChange}
                enabledCount={enabledCount}
              />
            ))}
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

export default CardSettings;
