import { Box, Text } from "@chakra-ui/react";
import { formatTime } from "../../utils/formatTime";

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
