import { Box, Stack, Text, createListCollection } from "@chakra-ui/react";
import { Switch } from "../../components/ui/switch";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";

import { CARD_DISPLAY_NAMES, CARD_EXACT_VALUES } from "../../constants/cards";
import { CONDITION_TYPE } from "../../constants/gameConstants";

const MIN_CHAR_COUNT = 2;
const MAX_CHAR_COUNT = 13;
const DEFAULT_RANGE_TYPE_MIN = 2;
const DEFAULT_RANGE_TYPE_MAX = 3;
const DEFAULT_MIN_TYPE_VALUE = 2;

// カードの文字数条件タイプの選択肢
const conditionTypeOptions = createListCollection({
  items: [
    { label: "ちょうど", value: CONDITION_TYPE.EXACT },
    { label: "範囲", value: CONDITION_TYPE.RANGE },
    { label: "以上", value: CONDITION_TYPE.MIN },
  ],
});

// 文字数の選択肢を生成する関数
const numberOptions = (min = MIN_CHAR_COUNT, max = MAX_CHAR_COUNT) =>
  createListCollection({
    items: Array.from({ length: max - min + 1 }, (_, i) => ({
      label: `${min + i}`,
      value: min + i,
    })),
  });

const ALL_NUMBER_OPTIONS = numberOptions(MIN_CHAR_COUNT, MAX_CHAR_COUNT);
const RANGE_MIN_OPTIONS = numberOptions(MIN_CHAR_COUNT, MAX_CHAR_COUNT - 1);
const RANGE_MAX_OPTIONS = numberOptions(MIN_CHAR_COUNT + 1, MAX_CHAR_COUNT);

const CardSettingRow = ({ cardKey, config, onChange, enabledCount }) => {
  const isLastEnabled = config.enabled && enabledCount === 1;

  const handleToggle = () => {
    onChange(cardKey, { ...config, enabled: !config.enabled });
  };

  const handleConditionTypeChange = (value) => {
    const newConfig = { ...config, conditionType: value };
    if (value === CONDITION_TYPE.EXACT) {
      newConfig.value = CARD_EXACT_VALUES[cardKey];
      newConfig.min = null;
      newConfig.max = null;
    } else if (value === CONDITION_TYPE.RANGE) {
      newConfig.value = null;
      newConfig.min = DEFAULT_RANGE_TYPE_MIN;
      newConfig.max = DEFAULT_RANGE_TYPE_MAX;
    } else if (value === CONDITION_TYPE.MIN) {
      newConfig.value = DEFAULT_MIN_TYPE_VALUE;
      newConfig.min = null;
      newConfig.max = null;
    }
    onChange(cardKey, newConfig);
  };

  const handleValueChange = (value) => {
    onChange(cardKey, { ...config, value });
  };

  const handleMinChange = (value) => {
    const newMin = value;
    const newMax = newMin >= config.max ? newMin + 1 : config.max;
    onChange(cardKey, { ...config, min: newMin, max: newMax });
  };

  const handleMaxChange = (value) => {
    const newMax = value;
    const newMin = newMax <= config.min ? newMax - 1 : config.min;
    onChange(cardKey, { ...config, min: newMin, max: newMax });
  };

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      align={{ base: "stretch", md: "center" }}
      spacing={4}
    >
      <Stack direction="row" align="center" spacing={4}>
        <Switch
          checked={config.enabled}
          onCheckedChange={handleToggle}
          disabled={isLastEnabled}
        />
        <Text width="30px">{CARD_DISPLAY_NAMES[cardKey]}</Text>
        <SelectRoot
          collection={conditionTypeOptions}
          value={[config.conditionType]}
          onValueChange={(e) => handleConditionTypeChange(e.value[0])}
          disabled={!config.enabled}
          width="120px"
        >
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
          <SelectContent>
            {conditionTypeOptions.items.map((option) => (
              <SelectItem key={option.value} item={option}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Stack>

      <Box pl={{ base: "60px", md: 0 }}>
        {/* ちょうどの場合 */}
        {config.conditionType === CONDITION_TYPE.EXACT && (
          <Stack direction="row" align="center">
            <SelectRoot
              collection={ALL_NUMBER_OPTIONS}
              value={[config.value]}
              disabled
              width="80px"
            >
              <SelectTrigger>
                <SelectValueText />
              </SelectTrigger>
              <SelectContent>
                {ALL_NUMBER_OPTIONS.items.map((option) => (
                  <SelectItem key={option.value} item={option}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Text>文字</Text>
          </Stack>
        )}

        {/* 範囲の場合 */}
        {config.conditionType === CONDITION_TYPE.RANGE && (
          <Stack direction="row" align="center">
            <SelectRoot
              collection={RANGE_MIN_OPTIONS}
              value={[config.min]}
              onValueChange={(e) => handleMinChange(Number(e.value[0]))}
              disabled={!config.enabled}
              width="80px"
            >
              <SelectTrigger>
                <SelectValueText />
              </SelectTrigger>
              <SelectContent>
                {RANGE_MIN_OPTIONS.items.map((option) => (
                  <SelectItem key={option.value} item={option}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Text>〜</Text>
            <SelectRoot
              collection={RANGE_MAX_OPTIONS}
              value={[config.max]}
              onValueChange={(e) => handleMaxChange(Number(e.value[0]))}
              disabled={!config.enabled}
              width="80px"
            >
              <SelectTrigger>
                <SelectValueText />
              </SelectTrigger>
              <SelectContent>
                {RANGE_MAX_OPTIONS.items.map((option) => (
                  <SelectItem key={option.value} item={option}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Text>文字</Text>
          </Stack>
        )}

        {/* 以上の場合 */}
        {config.conditionType === CONDITION_TYPE.MIN && (
          <Stack direction="row" align="center">
            <SelectRoot
              collection={ALL_NUMBER_OPTIONS}
              value={[config.value]}
              onValueChange={(e) => handleValueChange(Number(e.value[0]))}
              disabled={!config.enabled}
              width="80px"
            >
              <SelectTrigger>
                <SelectValueText />
              </SelectTrigger>
              <SelectContent>
                {ALL_NUMBER_OPTIONS.items.map((option) => (
                  <SelectItem key={option.value} item={option}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Text>文字以上</Text>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default CardSettingRow;
