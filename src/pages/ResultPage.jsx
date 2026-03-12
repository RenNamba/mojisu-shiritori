import { Navigate, useLocation } from "react-router-dom";
import { Box, VStack } from "@chakra-ui/react";

import ResultHeader from "../components/result/ResultHeader";
import ResultTimer from "../components/result/ResultTimer";
import HistoryList from "../components/common/HistoryList";
import GameActions from "../components/common/GameActions";

const ResultPage = () => {
  const { state } = useLocation();

  // stateがない場合（直接アクセスなど）はタイトルへリダイレクト
  if (!state) return <Navigate to="/" replace />;

  const { winnerName, timers, history, settings } = state;

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <VStack gap={6} align="stretch">
        <ResultHeader winnerName={winnerName} />
        <ResultTimer timers={timers} settings={settings} />
        <HistoryList history={history} settings={settings} />
        <GameActions />
      </VStack>
    </Box>
  );
};

export default ResultPage;
