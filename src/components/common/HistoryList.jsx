import { Box, IconButton, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { Collapsible } from "@chakra-ui/react";

const HistoryList = ({ history, settings }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Stack direction="row" align="center" justify="space-between">
          <Text fontWeight="bold">履歴</Text>
          <Collapsible.Trigger asChild>
            <IconButton variant="ghost" size="sm">
              {open ? <LuChevronUp /> : <LuChevronDown />}
            </IconButton>
          </Collapsible.Trigger>
        </Stack>
        <Collapsible.Content>
          <Box maxH="200px" overflowY="auto" mt={2}>
            {history.length === 0 ? (
              <Text color="gray.500" fontSize="sm">
                履歴はありません
              </Text>
            ) : (
              [...history].reverse().map((item) => (
                <Stack
                  key={item.id}
                  direction="row"
                  justify="space-between"
                  py={1}
                >
                  <Text fontSize="sm" color="gray.500">
                    {settings.players[item.player].name}
                  </Text>
                  <Text fontSize="sm">{item.word}</Text>
                </Stack>
              ))
            )}
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

export default HistoryList;
