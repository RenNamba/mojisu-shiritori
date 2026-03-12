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
      bg={isActive ? "blue.50" : "white"}
      shadow="sm"
      borderRadius="xl"
      borderWidth="2px"
      borderColor={isActive ? "blue.400" : "transparent"}
      p={4}
      flex={1}
      textAlign="center"
    >
      <Text fontWeight="bold">{name}</Text>
      <Text fontSize="2xl">{formatTime(time)}</Text>
    </Box>
  );
};

export default PlayerTimer;
