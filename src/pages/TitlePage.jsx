import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const TitlePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/settings");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <VStack spacing={8}>
        <Heading size="2xl">文字数しりとり</Heading>
        <Button size="lg" onClick={handleStart}>
          ゲームスタート
        </Button>
      </VStack>
    </Box>
  );
};

export default TitlePage;
