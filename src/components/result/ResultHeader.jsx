import { Heading } from "@chakra-ui/react";

const ResultHeader = ({ winnerName }) => (
  <Heading size="xl" textAlign="center" color="gray.700">
    {winnerName}の勝利！
  </Heading>
);

export default ResultHeader;
