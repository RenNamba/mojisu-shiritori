import { Box, Stack, Text } from "@chakra-ui/react";
import { CARD_DISPLAY_NAMES } from "../../constants/cards";
import { CONDITION_TYPE } from "../../constants/gameConstants";
import { getHeadChar } from "../../utils/wordUtils";

// カードの文字数条件を表示用の文字列にフォーマットする
const formatCondition = (cardConfig) => {
  if (cardConfig.conditionType === CONDITION_TYPE.EXACT) {
    return `${cardConfig.value}文字`;
  } else if (cardConfig.conditionType === CONDITION_TYPE.RANGE) {
    return `${cardConfig.min}〜${cardConfig.max}文字`;
  } else if (cardConfig.conditionType === CONDITION_TYPE.MIN) {
    return `${cardConfig.value}文字以上`;
  }
};

const PlayAreaInfo = ({ gameState, settings }) => {
  const { currentCard, history } = gameState;
  const headChar = getHeadChar(history);
  const cardConfig = currentCard ? settings.cards[currentCard] : null;

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <Stack direction="row" justify="space-around">
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.500">
            カード
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {currentCard ? CARD_DISPLAY_NAMES[currentCard] : "-"}
          </Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.500">
            頭文字
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {headChar}
          </Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.500">
            文字数条件
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {cardConfig ? formatCondition(cardConfig) : "-"}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default PlayAreaInfo;
