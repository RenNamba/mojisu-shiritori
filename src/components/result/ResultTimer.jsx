import { Box, Stack, Text } from "@chakra-ui/react";
import { formatTime } from "../../utils/formatTime";

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
