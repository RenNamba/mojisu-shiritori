import { Box, Stack, Text } from "@chakra-ui/react";

// 秒数を MM:SS 形式の文字列に変換する
const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const ResultTimer = ({ timers, settings }) => (
  <Stack direction="row" gap={4}>
    {["A", "B"].map((player) => (
      <Box
        key={player}
        bg="white"
        shadow="sm"
        borderRadius="xl"
        p={4}
        flex={1}
        textAlign="center"
      >
        <Text fontWeight="bold">{settings.players[player].name}</Text>
        <Text fontSize="2xl">{formatTime(timers[player])}</Text>
      </Box>
    ))}
  </Stack>
);

export default ResultTimer;
