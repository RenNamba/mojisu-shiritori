import { Box, Text } from "@chakra-ui/react";

// 秒数を MM:SS 形式の文字列に変換する
const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const PlayerTimer = ({ name, time, isActive }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      flex={1}
      textAlign="center"
      borderColor={isActive ? "blue.500" : "gray.200"}
      bg={isActive ? "blue.50" : "white"}
    >
      <Text fontWeight="bold">{name}</Text>
      <Text fontSize="2xl">{formatTime(time)}</Text>
    </Box>
  );
};

export default PlayerTimer;
